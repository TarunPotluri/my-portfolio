// src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  Container
} from 'lucide-react';

export const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const skills = [
    {
      category: "Programming",
      icon: <Code2 className="w-6 h-6" />,
      items: [
        { name: "Python", icon: <Terminal className="w-4 h-4" /> },
        { name: "SQL", icon: <Database className="w-4 h-4" /> },
        { name: "Java", icon: <Cpu className="w-4 h-4" /> },
        { name: "PL/SQL", icon: <Database className="w-4 h-4" /> }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Data Science",
      icon: <Brain className="w-6 h-6" />,
      items: [
        { name: "TensorFlow", icon: <Brain className="w-4 h-4" /> },
        { name: "PyTorch", icon: <Brain className="w-4 h-4" /> },
        { name: "scikit-learn", icon: <Brain className="w-4 h-4" /> },
        { name: "Pandas", icon: <Database className="w-4 h-4" /> },
        { name: "NumPy", icon: <LineChart className="w-4 h-4" /> }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      items: [
        { name: "AWS", icon: <Cloud className="w-4 h-4" /> },
        { name: "Docker", icon: <Container className="w-4 h-4" /> },
        { name: "Jenkins", icon: <Monitor className="w-4 h-4" /> },
        { name: "Git", icon: <GitBranch className="w-4 h-4" /> }
      ],
      color: "from-green-500 to-teal-500"
    },
    {
      category: "Visualization",
      icon: <BarChart4 className="w-6 h-6" />,
      items: [
        { name: "Tableau", icon: <BarChart4 className="w-4 h-4" /> },
        { name: "Matplotlib", icon: <LineChart className="w-4 h-4" /> },
        { name: "Seaborn", icon: <PenTool className="w-4 h-4" /> }
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Technical Skills</h2>
          <p className="text-xl text-gray-400">Expertise across multiple domains</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              variants={itemVariants}
              className="relative group"
              data-scroll
              data-scroll-speed={index % 2 === 0 ? "1" : "-1"}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl blur-xl opacity-0 
                            group-hover:opacity-20 transition-opacity duration-300`} />
              
              <div className="relative glass-effect rounded-xl p-6 h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`bg-gradient-to-r ${skill.color} p-2 rounded-lg`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold gradient-text">{skill.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {skill.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : {}}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;