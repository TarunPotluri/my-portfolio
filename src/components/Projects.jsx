// src/components/Projects.jsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const projects = [
    {
      title: "Voice Assistant",
      description:
        "Hands-free assistant in Python: real-time speech capture, intent parsing (NLP), and task execution. Built with SpeechRecognition, PyTorch, and custom NLU.",
      image: "voice.jpg", // put in /public
      tags: ["Python", "NLP", "SpeechRecognition"],
      // demoUrl: "https://...", codeUrl: "https://..."
    },
    {
      title: "SLAM Algorithm",
      description:
        "Simultaneous Localization and Mapping pipeline for autonomous navigation. Robust feature extraction + loop closure; strong accuracy in noisy indoor maps.",
      image: "slam.png", // put in /public
      tags: ["Robotics", "Computer Vision", "Path Planning"],
      // demoUrl: "https://...", codeUrl: "https://..."
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      {/* subtle ambient tint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: true }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(30% 30% at 15% 20%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(25% 25% at 85% 30%, rgba(236,72,153,0.25), transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section heading (matches Skills/About style) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-white/70 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-[11px] tracking-wider uppercase">
              Selected Work
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="text-4xl font-bold mb-2 gradient-text">Featured Projects</h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            A mix of data, AI, and realtime systems—built end-to-end with a focus on
            reliability and clean UX.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
