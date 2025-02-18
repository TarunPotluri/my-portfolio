import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Music, Camera, Brain } from 'lucide-react';

export const About = () => {
  const aboutData = [
    {
      title: "Data Scientist & ML Engineer",
      icon: <Code2 className="w-6 h-6" />,
      description: "Results-driven data scientist specializing in predictive modeling, statistical analysis, and implementation of deep learning solutions across multiple industry sectors."
    },
    {
      title: "Technical Expertise",
      icon: <Brain className="w-6 h-6" />,
      description: "Advanced proficiency in Python ecosystem (Pandas, NumPy, scikit-learn, TensorFlow) with focus on scalable and secure cloud implementations. Experienced in developing and deploying machine learning models for real-world applications."
    },
    {
      title: "DJ & Music Producer",
      icon: <Music className="w-6 h-6" />,
      description: "Beyond coding, I'm an enthusiastic DJ creating captivating mixes that energize dance floors. My love for music brings rhythm and harmony to both my creative and technical work."
    },
    {
      title: "Photography",
      icon: <Camera className="w-6 h-6" />,
      description: "My eye for composition allows me to capture moments through the lens, telling stories with each click of the shutter. This visual perspective enhances my approach to data visualization and UI design."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A unique blend of technical expertise and creative pursuits allows me to approach problem-solving from diverse perspectives, bringing fresh and innovative solutions to every project I undertake.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {aboutData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mr-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto italic">
            "Drawing inspiration from both technology and art, I create solutions that are not just functional, but elegant and user-centric."
          </p>
        </motion.div>
      </div>
    </section>
  );
};