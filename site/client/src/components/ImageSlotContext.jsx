import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ImageSlotContext = createContext(null);

// Empty means same-origin (local dev via the Vite proxy). Set VITE_API_BASE
// to the upload server's origin when the two are deployed separately — e.g.
// a static host like Netlify for this app and Render/Railway/Fly for
// site/server. The server returns root-relative image paths, so they get the
// same prefix.
const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');
const absolute = (url) => (url && url.startsWith('/') ? API_BASE + url : url);

// Loads the id → uploaded-image-url map once from the backend (site/server)
// and shares it across every <ImageSlot> on the page, so a photo dropped in
// one place shows immediately anywhere else that reuses the same slot id.
export function ImageSlotProvider({ children }) {
  const [images, setImages] = useState({});

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/images`)
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        if (cancelled) return;
        const next = {};
        for (const id of Object.keys(data || {})) next[id] = absolute(data[id]);
        setImages(next);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const upload = useCallback(async (id, file) => {
    const body = new FormData();
    body.append('file', file);
    const res = await fetch(`${API_BASE}/api/images/${encodeURIComponent(id)}`, { method: 'POST', body });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Upload failed.');
    const url = absolute(data.url);
    setImages((prev) => ({ ...prev, [id]: url }));
    return url;
  }, []);

  const remove = useCallback(async (id) => {
    await fetch(`${API_BASE}/api/images/${encodeURIComponent(id)}`, { method: 'DELETE' });
    setImages((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  return (
    <ImageSlotContext.Provider value={{ images, upload, remove }}>
      {children}
    </ImageSlotContext.Provider>
  );
}

export function useImageSlots() {
  const ctx = useContext(ImageSlotContext);
  if (!ctx) throw new Error('useImageSlots must be used within an ImageSlotProvider');
  return ctx;
}
