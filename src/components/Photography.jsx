// src/components/Photography.jsx
import React from "react";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const base = import.meta.env.BASE_URL;

const PHOTOS = [
  { src: `${base}/photos/photo1.jpg`, w: 800, h: 1000, cat: "Architecture", caption: "BAPS Temple — Geometry & Grace" },
  { src: `${base}/photos/photo2.jpg`, w: 900, h: 700,  cat: "Nature",       caption: "Winter Quiet — Suburban Snow" },
  { src: `${base}/photos/photo3.jpg`, w: 900, h: 900,  cat: "Music",        caption: "Console — Night Session" },
  { src: `${base}/photos/photo4.jpg`, w: 800, h: 1000, cat: "Architecture", caption: "BAPS Temple — Skyward Lines" },
  { src: `${base}/photos/photo5.jpg`, w: 900, h: 1100, cat: "Nature",       caption: "Jellyfish — Electric Drift" },
  { src: `${base}/photos/photo6.jpg`, w: 900, h: 1400, cat: "Sea",          caption: "Dusk — Low Tide Light" },
  { src: `${base}/photos/photo7.jpg`, w: 900, h: 1200, cat: "Architecture", caption: "Golden Elephants — Guardians of the Temple" },
];

const breakpointColumnsObj = { default: 4, 1280: 3, 1024: 3, 820: 2, 640: 1 };

export default function Photography() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(null); // {src, caption}

  // ESC to close
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    // optional: lock scroll while open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* subtle background auras */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full blur-3xl opacity-30"
             style={{background: "radial-gradient(40% 40% at 50% 50%, #3b82f6 0%, transparent 70%)"}}/>
        <div className="absolute top-20 right-0 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25"
             style={{background: "radial-gradient(40% 40% at 50% 50%, #22d3ee 0%, transparent 70%)"}}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-24">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">📷 Photography Showcase</h1>
        <p className="text-center text-gray-300 mt-2">Little slices of time—arranged with care.</p>

        {/* Masonry styles */}
        <style>{`
          .my-masonry-grid { display: flex; margin-left: -1rem; width: auto; }
          .my-masonry-grid_column { padding-left: 1rem; background-clip: padding-box; }
          .my-masonry-grid_column > * { margin-bottom: 1rem; }
        `}</style>

        {/* GRID */}
        <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid mt-10" columnClassName="my-masonry-grid_column">
          {PHOTOS.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{opacity:0, y:24}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.6, delay:i*0.06}}
              className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10"
            >
              <img
                src={p.src}
                alt={p.caption}
                className="w-full h-auto block select-none transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                onClick={() => { setActive({ src: p.src, caption: p.caption }); setOpen(true); }}
              />
              <figcaption className="absolute bottom-0 inset-x-0 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="m-3 rounded-xl bg-black/60 backdrop-blur px-3 py-2 border border-white/10">
                  <div className="text-sm font-medium">{p.caption}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </Masonry>

        <div className="mt-12 text-center">
          <Link to="/" className="rounded-full px-4 py-2 border border-white/20 text-white/90 hover:bg-white hover:text-black transition">
            ← Back to Portfolio
          </Link>
        </div>
      </div>

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {open && active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)} // click outside closes
          >
            {/* stop bubbling so clicking the image doesn't close */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.src}
                alt={active.caption}
                className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />

              {/* Close button */}
              <button
                className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-white text-black font-bold shadow hover:scale-105 transition"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ×
              </button>

              {/* Caption */}
              {active.caption && (
                <div className="mt-3 text-center text-white/90 text-sm">{active.caption}</div>
              )}
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
