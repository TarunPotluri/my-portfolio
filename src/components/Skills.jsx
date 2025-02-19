// src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';

export const Skills = () => {
  const skills = {
    "Programming": {
      icon: "💻",
      items: ["Python", "SQL", "Java", "PL/SQL"]
    },
    "Data Science": {
      icon: "🧮",
      items: ["TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy"]
    },
    "Cloud & DevOps": {
      icon: "☁️",
      items: ["AWS", "Docker", "Jenkins", "Git"]
    },
    "Visualization": {
      icon: "📊",
      items: ["Tableau", "Matplotlib", "Seaborn"]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Technical Skills</h2>
          <p className="text-xl text-gray-400">
            Proficient in a wide range of technologies and tools
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {Object.entries(skills).map(([category, { icon, items }]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="glass-effect p-6 rounded-2xl hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">{icon}</span>
                <h3 className="text-xl font-semibold">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};