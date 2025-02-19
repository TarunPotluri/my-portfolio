// src/components/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';

export const Projects = () => {
  const projects = [
    {
      title: "Voice Assistant",
      description: "Developed a voice assistant using Python with libraries like SpeechRecognition and PyTorch for NLP.",
      image: "voice.jpg",
      tags: ["Python", "NLP", "Speech Recognition"]
    },
    {
      title: "SLAM Algorithm",
      description: "Advanced Simultaneous Localization and Mapping algorithm for autonomous robot navigation, achieving over 90% accuracy.",
      image: "slam.png",
      tags: ["Robotics", "Computer Vision", "Path Planning"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 gradient-text"
        >
          Featured Projects
        </motion.h2>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                <p className="text-gray-400 text-lg">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-64 md:h-80 rounded-2xl overflow-hidden glass-effect"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};