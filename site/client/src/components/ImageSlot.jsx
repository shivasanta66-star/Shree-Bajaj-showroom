import { useCallback, useRef, useState } from 'react';
import { useImageSlots } from './ImageSlotContext';

const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

function PhotoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

// Upload-capable photo placeholder — the production replacement for the
// prototype's <image-slot> web component. Same drop/click-to-browse UX;
// images persist through the site/server upload API instead of a local
// sidecar file, so they survive reload for every visitor, not just the
// browser that dropped them.
export default function ImageSlot({ id, placeholder = 'Drop an image', alt = '' }) {
  const { images, upload, remove } = useImageSlots();
  const url = images[id];
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const flashError = (msg) => {
    setError(msg);
    setTimeout(() => setError((cur) => (cur === msg ? '' : cur)), 3000);
  };

  const handleFile = useCallback(
    async (file) => {
      if (!file) return;
      if (!ACCEPT.includes(file.type)) {
        flashError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      setBusy(true);
      setError('');
      try {
        await upload(id, file);
      } catch (e) {
        flashError(e.message || 'Could not upload that image.');
      } finally {
        setBusy(false);
      }
    },
    [id, upload]
  );

  return (
    <div
      className={`image-slot${dragOver ? ' is-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files && e.dataTransfer.files[0]);
      }}
      onClick={() => {
        if (!url) inputRef.current?.click();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !url) inputRef.current?.click();
      }}
    >
      {url ? (
        <img src={url} alt={alt} />
      ) : (
        <div className="image-slot-empty">
          <PhotoIcon />
          <div className="image-slot-cap">{placeholder}</div>
          <div className="image-slot-sub">
            or <u>browse files</u>
          </div>
        </div>
      )}
      <div className="image-slot-ring" />
      {url && (
        <div className="image-slot-ctl" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => inputRef.current?.click()}>Replace</button>
          <button type="button" onClick={() => remove(id)}>Remove</button>
        </div>
      )}
      {busy && (
        <div className="image-slot-loading">
          <div className="image-slot-spin" />
        </div>
      )}
      {error && <div className="image-slot-err">{error}</div>}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(',')}
        hidden
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
