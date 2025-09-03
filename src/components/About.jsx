// src/components/About.jsx
import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Code2, Rocket, Cloud, ServerCog, Trophy, Users, Music, Camera, Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

/* Tilted, shimmering card */
function TiltCard({ icon, title, children, delay = 0 }) {
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 150, damping: 15 });
  const shine = useSpring(useTransform(x, [-80, 80], [0, 1]), { stiffness: 80, damping: 20 });

  function onMouseMove(e) {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    x.set(e.clientX - (r.left + r.width / 2)); y.set(e.clientY - (r.top + r.height / 2));
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="relative p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-[2px] hover:bg-white/10 transition-colors"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
          opacity: shine,
        }}
      />
      <div className="flex items-center mb-4">
        <motion.div
          className="bg-blue-500/20 p-3 rounded-full mr-4"
          animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: delay + 0.1 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </motion.div>
  );
}

export const About = () => {
  const cards = [
    { title: "AI/ML & Data", icon: <Code2 className="w-6 h-6" />, desc: "I turn messy data into usable intelligence and build models that support real decisions." },
    { title: "Real-World Impact", icon: <Rocket className="w-6 h-6" />, desc: "Shipped end-to-end features from idea to production with a bias for outcomes." },
    { title: "Cloud & Reliability", icon: <Cloud className="w-6 h-6" />, desc: "Comfortable running apps in the cloud with attention to security, monitoring, and uptime." },
    { title: "Delivery & Ops", icon: <ServerCog className="w-6 h-6" />, desc: "Care about CI/CD, testing, and clean release cycles so work ships smoothly." },
    { title: "Recognition", icon: <Trophy className="w-6 h-6" />, desc: "Academic & industry acknowledgments for practical, secure, and thoughtful builds." },
    { title: "Leadership", icon: <Users className="w-6 h-6" />, desc: "Lead by clarity and momentum—facilitating sprints, unblocking, and sharing context." },
    { title: "DJ & Music", icon: <Music className="w-6 h-6" />, desc: "Rhythm and pacing from DJing shape how I design flows and user experiences." },
    {
      title: "Photography", icon: <Camera className="w-6 h-6" />,
      desc: (
        <>
          Composition guides my UI and data-viz aesthetics.
          <div className="flex justify-center">
            <Link to="/photography">
              <button className="mt-4 px-4 py-2 rounded border border-white/20 text-white/90 hover:bg-white hover:text-black transition">
                View Some Works
              </button>
            </Link>
          </div>
        </>
      ),
    },
  ];

  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden">
      {/* ambient glows */}
      <motion.div
        className="pointer-events-none absolute -top-20 -left-24 w-80 h-80 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(40% 40% at 50% 50%, #60a5fa 0%, transparent 70%)" }}
        initial={{ y: -10 }} animate={{ y: 10 }} transition={{ repeat: Infinity, duration: 6, repeatType: "mirror" }}
      />
      <motion.div
        className="pointer-events-none absolute top-10 right-0 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(40% 40% at 50% 50%, #22d3ee 0%, transparent 70%)" }}
        initial={{ y: 10 }} animate={{ y: -10 }} transition={{ repeat: Infinity, duration: 7, repeatType: "mirror" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 text-white/70 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-[11px] tracking-wider uppercase">Who I Am</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="text-4xl font-bold mb-2 gradient-text">
            About Me
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            A unique mix of <span className="text-white">AI/ML engineering</span>,
            <span className="text-white"> data science</span>, and 
            <span className="text-white"> creative arts</span> — I balance the technical with the human side,
            keeping experiences elegant, systems reliable, and outcomes impactful.
          </p>
        </motion.div>


        {/* cards grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {cards.map((c, i) => (
            <TiltCard key={c.title} icon={c.icon} title={c.title} delay={i * 0.05}>
              {c.desc}
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
