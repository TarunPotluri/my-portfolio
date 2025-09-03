// src/components/Skills.jsx
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code2,
  Database,
  Cloud,
  BarChart4,
  Brain,
  Cpu,
  PenTool,
  Terminal,
  GitBranch,
  Monitor,
  LineChart,
  Container,
  Sparkles,
} from "lucide-react";
import { Mic } from "lucide-react";

/* ----- 3D tilt + shimmer card wrapper (no extra libs) ----- */
function TiltCard({ children, delay = 0 }) {
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-60, 60], [8, -8]), {
    stiffness: 150,
    damping: 16,
  });
  const ry = useSpring(useTransform(x, [-60, 60], [-8, 8]), {
    stiffness: 150,
    damping: 16,
  });
  const shine = useSpring(useTransform(x, [-100, 100], [0, 1]), {
    stiffness: 80,
    damping: 20,
  });

  function onMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent"
    >
      {/* animated inner shimmer */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)",
          opacity: shine,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ----- pill chip ----- */
const Chip = ({ icon, label, i = 0 }) => (
  <motion.div
    initial={{ y: 8, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.05 * i, duration: 0.35 }}
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:border-white/20 transition"
  >
    <span className="opacity-80">{icon}</span>
    <span className="text-sm">{label}</span>
  </motion.div>
);

export const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const skills = [
    {
      category: "Programming",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      items: [
        { name: "Python", icon: <Terminal className="w-4 h-4" /> },
        { name: "SQL", icon: <Database className="w-4 h-4" /> },
        { name: "Java", icon: <Cpu className="w-4 h-4" /> },
        { name: "PL/SQL", icon: <Database className="w-4 h-4" /> },
      ],
    },
    {
      category: "Data Science",
      icon: <Brain className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      items: [
        { name: "TensorFlow", icon: <Code2 className="w-4 h-4" /> },
        { name: "PyTorch", icon: <Terminal className="w-4 h-4" /> },
        { name: "scikit-learn", icon: <Terminal className="w-4 h-4" /> },
        { name: "Pandas", icon: <Database className="w-4 h-4" /> },
        { name: "NumPy", icon: <LineChart className="w-4 h-4" /> },
      ],
    },
    {
      category: "Agentic AI",
      icon: <Brain className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      items: [
        { name: "NLP / NLG", icon: <Brain className="w-4 h-4" /> },
        { name: "Intent Detection", icon: <Brain className="w-4 h-4" /> },
        { name: "Entity Extraction", icon: <Brain className="w-4 h-4" /> },
        { name: "Rule-based Systems", icon: <Code2 className="w-4 h-4" /> },
        { name: "SpeechRecognition", icon: <Mic className="w-4 h-4" /> },
      ],
    },
    {
      category: "Backend & APIs",
      icon: <Terminal className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      items: [
        { name: "FastAPI", icon: <Terminal className="w-4 h-4" /> },
        { name: "REST APIs", icon: <Code2 className="w-4 h-4" /> },
        { name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
        { name: "MongoDB", icon: <Database className="w-4 h-4" /> },
        { name: "Google BigQuery", icon: <Cloud className="w-4 h-4" /> },
      ],
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      items: [
        { name: "AWS", icon: <Cloud className="w-4 h-4" /> },
        { name: "Docker", icon: <Container className="w-4 h-4" /> },
        { name: "Jenkins", icon: <Monitor className="w-4 h-4" /> },
        { name: "Git", icon: <GitBranch className="w-4 h-4" /> },
      ],
    },
    {
      category: "Visualization",
      icon: <BarChart4 className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      items: [
        { name: "Tableau", icon: <BarChart4 className="w-4 h-4" /> },
        { name: "Matplotlib", icon: <LineChart className="w-4 h-4" /> },
        { name: "Seaborn", icon: <PenTool className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      {/* sparkles bg accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: true }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(30% 30% at 10% 10%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(30% 30% at 90% 30%, rgba(236,72,153,0.25), transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-white/70 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs tracking-wider uppercase">What I work with</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-4xl font-bold mb-2 gradient-text">Technical Skills</h2>
          <p className="text-lg text-gray-400">Expertise across multiple domains</p>
        </motion.div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {skills.map((skill, idx) => (
            <TiltCard key={skill.category} delay={idx * 0.05}>
              <div className="relative rounded-2xl p-6 h-full bg-black/30 backdrop-blur-[2px] border border-white/10">
                {/* gradient ring on hover */}
                <div
                  className={`pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition`}
                  style={{
                    background:
                      "linear-gradient(140deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02))",
                    mask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  }}
                />
                {/* header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`bg-gradient-to-r ${skill.color} p-2 rounded-lg`}>
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{skill.category}</h3>
                  </div>
                  <div className="text-white/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                {/* chips */}
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((i, j) => (
                    <Chip key={i.name} icon={i.icon} label={i.name} i={j} />
                  ))}
                </div>

                {/* tiny animated progress pulse under each card */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
                  className={`mt-6 h-[3px] origin-left rounded-full bg-gradient-to-r ${skill.color}`}
                />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
