import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const DATA_FILE = path.join(__dirname, 'data', 'images.json');
const PORT = process.env.PORT || 4000;

// Slot ids come from our own page data (see client/src/data), never from
// the request body verbatim into a path — still validated defensively
// since they end up as part of a filename on disk.
const SLOT_ID_RE = /^[a-z0-9][a-z0-9-]{0,63}$/i;

const EXT_BY_MIME = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/avif': '.avif',
};

fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });

function readMap() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeMap(map) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(map, null, 2));
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (!EXT_BY_MIME[file.mimetype]) {
      cb(new Error('Unsupported file type. Use PNG, JPEG, WebP, or AVIF.'));
      return;
    }
    cb(null, true);
  },
});

const app = express();
app.use(cors());
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d' }));

app.get('/api/images', (_req, res) => {
  const map = readMap();
  const urls = {};
  for (const id of Object.keys(map)) urls[id] = `/uploads/${map[id]}`;
  res.json(urls);
});

app.post('/api/images/:id', upload.single('file'), (req, res) => {
  const { id } = req.params;
  if (!SLOT_ID_RE.test(id)) {
    return res.status(400).json({ error: 'Invalid image slot id.' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const ext = EXT_BY_MIME[req.file.mimetype];
  const map = readMap();
  const prev = map[id];
  const filename = `${id}-${crypto.randomBytes(6).toString('hex')}${ext}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), req.file.buffer);
  map[id] = filename;
  writeMap(map);
  if (prev) {
    fs.rm(path.join(UPLOAD_DIR, prev), () => {});
  }
  res.json({ id, url: `/uploads/${filename}` });
});

app.delete('/api/images/:id', (req, res) => {
  const { id } = req.params;
  const map = readMap();
  const prev = map[id];
  if (prev) {
    fs.rm(path.join(UPLOAD_DIR, prev), () => {});
    delete map[id];
    writeMap(map);
  }
  res.json({ id, ok: true });
});

app.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message || 'Upload failed.' });
});

app.listen(PORT, () => {
  console.log(`Image upload API listening on http://localhost:${PORT}`);
});
