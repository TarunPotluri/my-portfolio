// src/components/Hero.jsx
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Linkedin } from "lucide-react";

const PROFILE_SRC = `${import.meta.env.BASE_URL}Tarun.jpg`;
const LINKEDIN_URL = "https://www.linkedin.com/in/potluri-tarun-8951a5368`";

/* -------------------- Animated Background Waves (tech) -------------------- */
const DigitalWaveform = ({ y }) => {
  const canvasRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;

    const state = {
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      w: 0,
      h: 0,
      waves: [
        { f: 0.018, a: 28, s: 0.016, off: 0, color: "rgba(99,102,241,0.12)" },
        { f: 0.024, a: 20, s: 0.024, off: 0, color: "rgba(168,85,247,0.12)" },
        { f: 0.030, a: 16, s: 0.030, off: 0, color: "rgba(236,72,153,0.09)" },
      ],
    };

    const resize = () => {
      state.w = window.innerWidth;
      state.h = window.innerHeight;
      canvas.width = Math.floor(state.w * state.dpr);
      canvas.height = Math.floor(state.h * state.dpr);
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      ctx.clearRect(0, 0, state.w, state.h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    const draw = () => {
      ctx.fillStyle = "rgba(10,10,10,0.08)";
      ctx.fillRect(0, 0, state.w, state.h);

      state.waves.forEach((w, idx) => {
        ctx.beginPath();
        const baseline = state.h * (0.6 + idx * 0.03);
        ctx.moveTo(0, baseline);
        for (let x = 0; x <= state.w; x += 2) {
          const y =
            Math.sin(x * w.f + w.off) * w.a +
            Math.sin(x * (w.f * 0.35) + w.off * 0.6) * (w.a * 0.45);
          ctx.lineTo(x, baseline + y);
        }
        ctx.strokeStyle = w.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        w.off += w.s;
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [prefersReduced]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      style={{ y }}
    />
  );
};

/* -------------------- Binary Rain (parallax & brighter) ------------------- */
const BinaryRain = ({ y }) => {
  const [drops, setDrops] = useState([]);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const count = 40;
    const W = window.innerWidth,
      H = window.innerHeight;
    setDrops(
      Array.from({ length: count }).map(() => ({
        x: Math.random() * W,
        delay: Math.random() * 2,
        dur: 3 + Math.random() * 2,
        txt: Math.random().toString(2).slice(2, 11),
        size: Math.random() < 0.4 ? "text-[10px]" : "text-[11px]",
        color: Math.random() < 0.5 ? "text-emerald-300" : "text-fuchsia-300",
        opacity: 0.18 + Math.random() * 0.1,
        start: -120,
        end: H + 120,
      }))
    );
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ y }}
    >
      {drops.map((d, i) => (
        <motion.div
          key={i}
          initial={{ y: d.start, x: d.x, opacity: 0 }}
          animate={{ y: d.end, opacity: [0, d.opacity, 0] }}
          transition={{
            duration: d.dur,
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut",
          }}
          className={`absolute font-mono ${d.size} ${d.color}`}
          style={{
            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.25))",
          }}
        >
          {d.txt}
        </motion.div>
      ))}
    </motion.div>
  );
};

/* -------------------- Marquee of mini-tags (infinite loop) ---------------- */
const TagMarquee = ({ items }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 16s linear infinite" }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="mx-4 text-xs md:text-sm text-white/70"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/* -------------------- Music ring bits around avatar ----------------------- */
const VinylRing = ({ children }) => (
  <div className="relative">
    {/* conic sheen */}
    <div className="absolute -inset-[12px] rounded-full">
      <div
        className="h-full w-full rounded-full animate-[spin_12s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0.14), rgba(255,255,255,0) 20%, rgba(255,255,255,0.14) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.14) 80%, rgba(255,255,255,0))",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 0)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 0)",
          opacity: 0.32,
        }}
      />
    </div>

    {/* circular equalizer */}
    <div className="pointer-events-none absolute -inset-[22px] rounded-full">
      {Array.from({ length: 24 }).map((_, i) => {
        const delay = (i % 6) * 0.12;
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: 2,
              height: 18,
              transformOrigin: "0 72px",
              background:
                "linear-gradient(to top, rgba(96,165,250,0.0), rgba(96,165,250,0.9))",
              borderRadius: 2,
              rotate: (360 / 24) * i,
            }}
            animate={{ scaleY: [0.6, 1.2, 0.7] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </div>

    {children}
  </div>
);

/* -------------------- Main Hero -------------------- */
export const Hero = () => {
  const prefersReduced = useReducedMotion();

  // Mouse-follow glow
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(mx, { stiffness: 100, damping: 20 });
  const glowY = useSpring(my, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX - window.innerWidth / 2);
      my.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Scroll parallax for bg layers
  const { scrollY } = useScroll();
  const wavesY = useTransform(scrollY, [0, 600], [0, 60]); // slow
  const rainY = useTransform(scrollY, [0, 600], [0, 120]); // faster

  // Role cycler
  const roles = ["Data Analyst", "ML Engineer", "DJ"];
  const [ri, setRi] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setRi((i) => (i + 1) % roles.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  // Hover parallax for avatar block
  const avatarHover = !prefersReduced
    ? {
        whileHover: { y: -4, rotateX: -2, rotateY: 2, scale: 1.01 },
        transition: { type: "spring", stiffness: 160, damping: 18 },
      }
    : {};

  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
      {/* Moving radial background tint */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(99,102,241,0.15), transparent 70%)",
          x: glowX,
          y: glowY,
        }}
      />

      {/* Background layers */}
      <DigitalWaveform y={wavesY} />
      <BinaryRain y={rainY} />

      {/* Mouse-follow faint blur highlight */}
      {!prefersReduced && (
        <motion.div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full blur-3xl"
          style={{
            x: glowX,
            y: glowY,
            background:
              "radial-gradient(circle, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0) 60%)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20 h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-5xl mx-auto text-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
            {...avatarHover}
          >
            <VinylRing>
              <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full p-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <img
                  src={PROFILE_SRC}
                  alt="Portrait of Tarun Potluri"
                  className="rounded-full w-full h-full object-cover"
                  loading="eager"
                />
                {/* LinkedIn button on the ring */}
                <a
                  href="https://www.linkedin.com/in/potluri-tarun-8951a5368"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="absolute -bottom-1 -right-1 z-30 grid place-items-center w-9 h-9 rounded-full bg-white text-[#0A66C2] shadow-lg ring-1 ring-black/10 hover:scale-105 transition"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </VinylRing>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Tarun Potluri
            </motion.span>
          </motion.h1>

          {/* Roles — dynamic cycler */}
          <div className="mt-2 h-7 md:h-8 flex items-center justify-center text-base md:text-lg text-gray-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={ri}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-2"
              >
                <span className="text-white/70">I am</span>
                <span className="font-semibold">
                  {roles[ri]}
                </span>
                <span className="text-white/40">—</span>
                <span className="text-white/70">and I love it.</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-2 text-[12px] md:text-sm text-white/70 max-w-2xl mx-auto"
          >
            Tech pays the bills, music keeps me sane — I build with data by day and recharge behind the decks by night.
          </motion.p>

          {/* CTAs (compact) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2 rounded-full text-white text-sm font-medium shadow-lg hover:shadow-purple-500/25 transition-all bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              Explore My Work
            </motion.button>

            <a
              href={`${import.meta.env.BASE_URL}Tarun_Potluri_Resume.pdf`}
              download
              className="px-5 py-2 rounded-full border border-white/20 text-white/90 text-sm hover:bg-white hover:text-black transition"
            >
              Download Resume
            </a>
          </motion.div>

          {/* Marquee of tags for energy */}
          <div className="mt-5 opacity-80">
            <TagMarquee
              items={[
                "Python",
                "Pandas",
                "TensorFlow",
                "PyTorch",
                "SQL",
                "Tableau",
                "FastAPI",
                "MLOps",
                "House",
                "Techno",
                "Open Format",
                "Storytelling",
              ]}
            />
          </div>

          {/* Bottom micro scroll cue */}
          <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
            <div className="flex justify-center space-x-1 mb-1 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [10, 20, 10], opacity: [0.5, 1, 0.6] }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-purple-500"
                />
              ))}
            </div>
            <motion.div
              className="text-white/70 text-[10px] tracking-wider pointer-events-none"
              animate={{ y: [0, 4, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              SCROLL
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
