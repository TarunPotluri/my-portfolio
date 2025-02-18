// src/components/Certifications.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Trophy } from 'lucide-react'; // Changed icons

export const Certifications = () => {
  const certifications = [
    {
      title: "IEEE AIIOT 2023 Conference",
      type: "Publication",
      icon: <Trophy className="w-6 h-6" />, // Changed icon
      description: "Published research paper: 'Secure Software Development in Google Colab' (Best Paper)",
      highlight: "Best Paper Award"
    },
    {
      title: "IACIT 2022",
      type: "Publication",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Published research paper: 'Design and Development of News App for Android'"
    },
    {
      title: "Technical Certifications",
      type: "Certifications",
      icon: <GraduationCap className="w-6 h-6" />, // Changed icon
      items: ["Azure", "IoT", "AI", "Raspberry Pi", "Android Studio", "SQL"]
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Certifications & Publications</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mr-4">
                  {cert.icon}
                </div>
                <h3 className="text-xl font-semibold">{cert.title}</h3>
              </div>
              
              {cert.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {cert.description}
                </p>
              )}

              {cert.highlight && (
                <div className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {cert.highlight}
                </div>
              )}

              {cert.items && (
                <div className="flex flex-wrap gap-2">
                  {cert.items.map((item) => (
                    <span
                      key={item}
                      className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};