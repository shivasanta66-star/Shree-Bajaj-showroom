import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ImageSlotContext = createContext(null);

// Loads the id → uploaded-image-url map once from the backend (site/server)
// and shares it across every <ImageSlot> on the page, so a photo dropped in
// one place shows immediately anywhere else that reuses the same slot id.
export function ImageSlotProvider({ children }) {
  const [images, setImages] = useState({});

  useEffect(() => {
    let cancelled = false;
    fetch('/api/images')
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        if (!cancelled) setImages(data || {});
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const upload = useCallback(async (id, file) => {
    const body = new FormData();
    body.append('file', file);
    const res = await fetch(`/api/images/${encodeURIComponent(id)}`, { method: 'POST', body });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Upload failed.');
    setImages((prev) => ({ ...prev, [id]: data.url }));
    return data.url;
  }, []);

  const remove = useCallback(async (id) => {
    await fetch(`/api/images/${encodeURIComponent(id)}`, { method: 'DELETE' });
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
