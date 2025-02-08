import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Twitter, Globe, Terminal, Code2, Cpu } from 'lucide-react';

// MatrixRain Component: Draws a “Matrix rain” effect with falling purple symbols.
function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const fontSize = 20;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      // Draw a semi‑transparent black rectangle for trailing effect.
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Use a vibrant purple for the symbols.
      ctx.fillStyle = '#8A2BE2';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let animationFrameId;
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ transition: 'opacity 1s ease-in-out' }}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
}



// Variants for fade-in animations with Framer Motion
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function App() {
  return (
    <div
      className="min-h-screen relative bg-black text-white overflow-hidden"
      style={{ fontFamily: "'VT323', monospace" }} // Headings use VT323; body paragraphs use Roboto via a helper class.
    >
      {/* Gradient overlay for subtle color transitions */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(138,43,226,0.2), rgba(0,0,0,0.8))' }}
      />

      {/* SVG Decorative Elements in corners */}
      <svg className="absolute top-0 left-0 w-32 h-32 opacity-30" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="purple" strokeWidth="2" fill="none" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-30" viewBox="0 0 100 100">
        <rect x="10" y="10" width="80" height="80" stroke="purple" strokeWidth="2" fill="none" />
      </svg>

      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Sticky Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          id="hero"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-16"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-purple-700 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1
              className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-800 text-transparent bg-clip-text"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
            >
              Tiago Pereira
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed font-roboto">
              Computer Engineer | Cybersecurity and Digital Forensics 
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <a href="https://github.com/WhyN0t101" className="p-2 rounded-lg bg-purple-900 hover:bg-purple-800 transition-colors glow">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/tiago-pereira-4763ab252/" className="p-2 rounded-lg bg-purple-900 hover:bg-purple-800 transition-colors glow">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://gist.github.com/WhyN0t101" className="p-2 rounded-lg bg-purple-900 hover:bg-purple-800 transition-colors glow">
                <Globe className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container mx-auto px-6 mb-12"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <div className="bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10">
            <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-purple-400" />
              About Me
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-roboto">
            An recent computer engineer graduate and current Cybersecurity student, driven by a passion for staying at the forefront of the rapidly evolving IT landscape. With a solid foundation in programming languages and software development principles, excited to apply my skills and knowledge to make a meaningful impact in the industry.
            Currently expanding my expertise in Cybersecurity, with a focus on malware analysis, network security, and threat mitigation strategies. I'm eager to leverage my hands-on approach to learning and problem-solving to contribute to the success of a dynamic organization in the IT industry.
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="container mx-auto px-6 mb-12"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10">
              <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-purple-400" />
                Frontend
              </h2>
              <div className="grid grid-cols-2 gap-4 text-xl font-roboto">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Vue.js
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Tailwind
                </div>
              </div>
            </div>
            <div className="bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10">
              <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-purple-400" />
                Backend
              </h2>
              <div className="grid grid-cols-2 gap-4 text-xl font-roboto">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  C#
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Python
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Java
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Rust
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="container mx-auto px-6 mb-12"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.a
                key={project}
                href="#"
                whileHover={{ scale: 1.05 }}
                className="block bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10 hover:bg-purple-800/80 transition-colors"
              >
                <h3 className="text-3xl font-semibold mb-2">Gesture Translation and Recognition                </h3>
                <p className="text-xl text-gray-400 mb-4 font-roboto">
                Developed an AI-powered gesture recognition system for real-time sign language translation. Created a scalable architecture for handling multiple users, implemented machine learning models using TensorFlow for gesture detection, and built a streaming pipeline for real-time processing. The system facilitates communication between sign language users and non-users.
                </p>
                <div className="flex gap-2 text-xl font-roboto">
                  <span className="px-2 py-1 bg-purple-400/20 text-purple-300 rounded">React</span>
                  <span className="px-2 py-1 bg-purple-400/20 text-purple-300 rounded">Node.js</span>
                </div>
              </motion.a>
              <motion.a
                key={project}
                href="#"
                whileHover={{ scale: 1.05 }}
                className="block bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10 hover:bg-purple-800/80 transition-colors"
              >
                <h3 className="text-3xl font-semibold mb-2">Gesture Translation and Recognition                </h3>
                <p className="text-xl text-gray-400 mb-4 font-roboto">
                Developed an AI-powered gesture recognition system for real-time sign language translation. Created a scalable architecture for handling multiple users, implemented machine learning models using TensorFlow for gesture detection, and built a streaming pipeline for real-time processing. The system facilitates communication between sign language users and non-users.
                </p>
                <div className="flex gap-2 text-xl font-roboto">
                  <span className="px-2 py-1 bg-purple-400/20 text-purple-300 rounded">React</span>
                  <span className="px-2 py-1 bg-purple-400/20 text-purple-300 rounded">Node.js</span>
                </div>
              </motion.a>
          </div>
        </motion.section>

        {/* Tools & Resources Section */}
        <motion.section
          id="resources"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="container mx-auto px-6 mb-12"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <div className="bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10">
            <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-purple-400" />
              Tools &amp; Resources
            </h2>
            <ul className="space-y-3 text-xl font-roboto">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <a href="https://gchq.github.io/CyberChef/" className="hover:text-purple-300 transition-colors">
                  CyberChef
                </a>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <a href="https://regexr.com/" className="hover:text-purple-300 transition-colors">
                  Regexr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <a href="https://crontab.guru" className="hover:text-purple-300 transition-colors">
                  Crontab Guru
                </a>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Hax & Exploits Section */}
        <motion.section
          id="hax"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="container mx-auto px-6 mb-12"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <div className="bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10">
            <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-purple-400" />
              Hax &amp; Exploits
            </h2>
            <ul className="space-y-3 text-xl font-roboto">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <a href="https://sploitus.com" className="hover:text-purple-300 transition-colors">
                  Sploitus
                </a>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <a href="https://exploit-db.com" className="hover:text-purple-300 transition-colors">
                  Exploit DB
                </a>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <a href="https://0day.today" className="hover:text-purple-300 transition-colors">
                  0day.today
                </a>
              </li>
            </ul>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default App;
