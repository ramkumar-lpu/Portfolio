import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Database, Palette, Terminal, Zap, Sparkles } from "lucide-react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);

  // Custom icons for each technology
  const getTechIcon = (techName) => {
    const icons = {
      // Frontend
      "React": "⚛️",
      "JavaScript": "🟨",
      "HTML5": "🌐",
      "CSS3": "🎨",
      "Tailwind CSS": "💨",
      "TypeScript": "🔷",
      "Next.js": "⏭️",
      "Jquery": "📜",
      "Bootstrap": "👢",
      "Redux": "🗂️",
      
      // Backend
      "Node.js": "🟢",
      "Express": "🚂",
      "PostgreSQL": "🐘",
      "MongoDB": "🍃",
      "SQL": "🗃️",
      "PHP": "🐘",
      "Axios": "📡",
      
      // Programming
      "C": "🔵",
      "C++": "➕",
      "Python": "🐍",
      "Java": "☕",
      "Go": "🐹",
      
      // Tools
      "Git": "📚",
      "Docker": "🐳",
      "Linux": "🐧",
      "AWS": "☁️",
      "Jest": "🃏",
      "GitHub": "🐙",

    };
    return icons[techName] || "💼";
  };

  const skillCategories = {
    Frontend: {
      icon: <Palette className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-500/20",
      skills: [
        { name: "React", level: 85, color: "#61DAFB" },
        { name: "JavaScript", level: 90, color: "#F7DF1E" },
        { name: "HTML5", level: 95, color: "#E34F26" },
        { name: "CSS3", level: 90, color: "#1572B6" },
        { name: "Tailwind CSS", level: 88, color: "#06B6D4" },
        { name: "TypeScript", level: 80, color: "#3178C6" },
        { name: "Jquery", level: 75, color: "#0769AD" },
        { name: "Bootstrap", level: 70, color: "#7952B3" },
        { name: "Redux", level: 75, color: "#764ABC" },
      ]
    },
    Backend: {
      icon: <Database className="w-5 h-5" />,
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-green-500/20",
      skills: [
        { name: "Node.js", level: 80, color: "#339933" },
        { name: "Express", level: 78, color: "#000000" },
        { name: "PostgreSQL", level: 82, color: "#4169E1" },
        { name: "MongoDB", level: 75, color: "#47A248" },
        { name: "SQL", level: 85, color: "#FF6B35" },
        { name: "PHP", level: 90, color: "#777BB4" },
        { name: "Axios", level: 80, color: "#5A29E4" },
      ]
    },
    Programming: {
      icon: <Code className="w-5 h-5" />,
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-500/20",
      skills: [
        { name: "C", level: 85, color: "#A8B9CC" },
        { name: "C++", level: 90, color: "#00599C" },
        { name: "Python", level: 85, color: "#3776AB" },
        { name: "Java", level: 80, color: "#007396" },
      ]
    },
    Tools: {
      icon: <Terminal className="w-5 h-5" />,
      color: "from-orange-500 to-red-400",
      bgColor: "bg-orange-500/20",
      skills: [
        { name: "Git", level: 80, color: "#F05032" },
        { name: "Docker", level: 65, color: "#2496ED" },
        { name: "Linux", level: 80, color: "#FCC624" },
        { name: "AWS", level: 65, color: "#FF9900" },
        { name: "GitHub", level: 95, color: "#181717" },
      ]
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
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const iconVariants = {
    rest: { 
      scale: 1,
      y: 0,
      rotate: 0
    },
    hover: { 
      scale: 1.2,
      y: -5,
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    bounce: {
      y: [0, -15, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 bg-gradient-to-br from-background via-background to-purple-950/20 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">Technical Arsenal</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              TECH
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              STACK
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tools and technologies I master to build amazing digital experiences
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto"
        >
          {Object.keys(skillCategories).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 backdrop-blur-sm ${
                activeCategory === category
                  ? `bg-gradient-to-r ${skillCategories[category].color} text-white border-transparent shadow-lg shadow-blue-500/25`
                  : "bg-white/5 text-gray-300 border-white/10 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {skillCategories[category].icon}
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto"
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="relative group"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <Card className="p-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl hover:border-white/20 transition-all duration-500 group-hover:bg-white/10 h-full flex flex-col">
                  
                  {/* Skill Icon with Animation */}
                  <motion.div
                    variants={iconVariants}
                    initial="rest"
                    animate={hoveredSkill === skill.name ? "bounce" : "rest"}
                    whileHover="hover"
                    className="text-center mb-3 flex-1 flex flex-col items-center justify-center"
                  >
                    <div className="relative mb-3">
                      <motion.span 
                        className="text-3xl block"
                        whileHover={{ scale: 1.3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {getTechIcon(skill.name)}
                      </motion.span>
                      
                      {/* Orbital Dots */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="absolute top-0 left-1/2 w-1 h-1 bg-current rounded-full opacity-60"></div>
                        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-current rounded-full opacity-60"></div>
                      </motion.div>
                    </div>

                    {/* Animated Progress Ring */}
                    <div className="relative w-16 h-16 mb-3">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-white/10"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          className="text-current"
                          initial={{ strokeDashoffset: 251.2 }}
                          animate={{ strokeDashoffset: 251.2 - (251.2 * skill.level) / 100 }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1.5, ease: "easeOut" }}
                          style={{ 
                            strokeDasharray: 251.2,
                            color: skill.color
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-center font-bold text-white text-sm mb-2">
                      {skill.name}
                    </h3>

                    {/* Proficiency Dots */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <motion.div
                          key={dot}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + dot * 0.1 }}
                          className={`w-1.5 h-1.5 rounded-full ${
                            dot <= Math.ceil(skill.level / 20) 
                              ? "bg-current" 
                              : "bg-white/20"
                          }`}
                          style={{ color: skill.color }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Hover Effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${skill.color}15 0%, transparent 70%)`
                    }}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Skill Level Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center items-center gap-6 mt-12 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span>Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span>Learning</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;
