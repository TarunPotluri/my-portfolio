// src/components/Certifications.jsx
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap, BookOpen, Trophy, Sparkles } from "lucide-react";

/* ---------- Tilt + shimmer wrapper (consistent with other sections) ---------- */
function TiltCard({ children, delay = 0 }) {
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-60, 60], [8, -8]), { stiffness: 150, damping: 16 });
  const ry = useSpring(useTransform(x, [-60, 60], [-8, 8]), { stiffness: 150, damping: 16 });

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - (r.left + r.width / 2));
    y.set(e.clientY - (r.top + r.height / 2));
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent"
    >
      {/* soft sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)",
          opacity: 0.35,
        }}
      />
      <div className="relative rounded-2xl bg-black/30 border border-white/10 backdrop-blur-[2px]">
        {children}
      </div>
    </motion.div>
  );
}

export const Certifications = () => {
  const certifications = [
    {
      title: "IEEE AIIOT 2023 Conference",
      type: "Publication",
      icon: <Trophy className="w-6 h-6" />,
      description:
        "Published research: “Secure Software Development in Google Colab”.",
      highlight: "Best Paper Award",
    },
    {
      title: "IACIT 2022",
      type: "Publication",
      icon: <BookOpen className="w-6 h-6" />,
      description:
        "Published paper: “Design and Development of News App for Android”.",
    },
    {
      title: "Technical Certifications",
      type: "Certifications",
      icon: <GraduationCap className="w-6 h-6" />,
      items: ["AWS", "IoT", "AI", "Raspberry Pi", "Android Studio", "SQL"],
    },
  ];

  return (
    <section id="certifications" className="py-20 relative">
      {/* ambient tint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: true }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(28% 28% at 12% 25%, rgba(168,85,247,0.28), transparent 60%), radial-gradient(24% 24% at 88% 20%, rgba(59,130,246,0.24), transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header (consistent with other sections) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-white/70 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-[11px] tracking-wider uppercase">
              Recognitions & Learning
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-4xl font-bold mb-2 gradient-text">
            Certifications & Publications
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            A mix of peer-reviewed research and hands-on credentials that back up how I build.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {certifications.map((cert, i) => (
            <TiltCard key={cert.title} delay={i * 0.06}>
              <div className="p-6">
                {/* top row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 p-3 rounded-lg">{cert.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold">{cert.title}</h3>
                      <div className="text-xs text-white/60">{cert.type}</div>
                    </div>
                  </div>

                  {/* ribbon if highlight */}
                  {cert.highlight && (
                    <div className="relative">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        {cert.highlight}
                      </span>
                    </div>
                  )}
                </div>

                {/* body */}
                {cert.description && (
                  <p className="text-gray-300 mb-4">{cert.description}</p>
                )}

                {cert.items && (
                  <div className="flex flex-wrap gap-2">
                    {cert.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
