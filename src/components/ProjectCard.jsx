// src/components/ProjectCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

export const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative group"
      data-scroll
      data-scroll-speed={index % 2 === 0 ? "1" : "-1"}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-xl opacity-0 
                    group-hover:opacity-75 transition-opacity duration-300" />
      
      <div className="relative glass-effect rounded-xl p-6 hover:scale-[1.02] transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="text-2xl font-bold gradient-text">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white mt-4"
            >
              View Project
            </motion.button>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-full md:w-1/2 relative rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 mix-blend-overlay" />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover rounded-xl"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};