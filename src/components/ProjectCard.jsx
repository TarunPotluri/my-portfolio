// src/components/ProjectCard.jsx
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

export const ProjectCard = ({ project, index }) => {
  // 3D tilt
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-70, 70], [8, -8]), {
    stiffness: 150,
    damping: 16,
  });
  const ry = useSpring(useTransform(x, [-70, 70], [-8, 8]), {
    stiffness: 150,
    damping: 16,
  });

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - (r.left + r.width / 2));
    y.set(e.clientY - (r.top + r.height / 2));
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
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: "easeOut" }}
      className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent"
    >
      {/* shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)",
          opacity: 0.35,
        }}
      />

      <div className="relative rounded-2xl bg-black/30 border border-white/10 backdrop-blur-[2px] overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* Text column */}
          <div className="w-full md:w-6/12 space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold gradient-text">
              {project.title}
            </h3>

            <p className="text-gray-300">{project.description}</p>

            {/* tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* actions (only if provided) */}
            {(project.demoUrl || project.codeUrl) && (
              <div className="flex flex-wrap gap-2 pt-1">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow hover:opacity-95 transition"
                  >
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-white/15 text-white/90 hover:bg-white hover:text-black transition"
                  >
                    View Code <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Image column */}
          <motion.div
            className="w-full md:w-6/12 relative rounded-xl overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 140, damping: 14 }}
          >
            {/* Ken Burns effect */}
            <motion.img
              src={project.image}
              alt={project.title}
              initial={{ scale: 1.04 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-64 md:h-80 object-cover"
            />

            {/* gradient overlay for punch */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-500/15 via-transparent to-purple-500/20" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
