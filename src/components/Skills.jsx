import React from 'react';
import { motion } from 'framer-motion';

const skillsData = {
  "Programming": ["Python", "SQL", "Java", "PL/SQL"],
  "Data Science": ["TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy"],
  "Cloud & DevOps": ["AWS", "Docker", "Jenkins", "Git"],
  "Visualization": ["Tableau", "Matplotlib", "Seaborn"]
};

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Technical Skills
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skillsData).map(([category, skills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
                {category}
              </h3>
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <motion.li
                    key={skill}
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};