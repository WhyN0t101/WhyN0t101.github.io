import React, { useEffect, useRef, useState } from 'react';
import { Github, Mail, Twitter, Globe, Terminal, Code2, Cpu, Linkedin } from 'lucide-react';

/* 
  Custom hook: useInView 
  Observes when an element scrolls into view and sets state accordingly.
*/
function useInView(options) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      options
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
  
  return [ref, inView];
}

/* 
  FadeInSection Component: Wraps its children and applies a fade-in animation
  when the section scrolls into view.
*/
function FadeInSection({ children, className = "", style = {}, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <section
      ref={ref}
      className={`fade-in-section ${className} ${inView ? 'visible' : ''}`}
      style={style}
      {...rest}
    >
      {children}
    </section>
  );
}

/* 
  MatrixRain Component: Draws a “Matrix rain” effect with falling purple symbols.
  The canvas uses a smooth opacity transition.
*/
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
      // Draw a semi-transparent black rectangle for a trailing effect.
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Draw falling symbols in a vibrant purple.
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

/* 
  Sticky Header Component with Navigation (without a "Skills" link)
*/
function Header() {
  return (
    <header className="sticky top-0 z-20 bg-black bg-opacity-80 backdrop-blur-md py-4 px-6 flex justify-between items-center">
      <nav>
        <ul className="flex gap-6 text-lg">
          <li><a href="#hero" className="hover:text-purple-300 transition">Home</a></li>
          <li><a href="#about" className="hover:text-purple-300 transition">About</a></li>
          <li><a href="#projects" className="hover:text-purple-300 transition">Projects</a></li>
          <li><a href="#resources" className="hover:text-purple-300 transition">Resources</a></li>
          <li><a href="#hax" className="hover:text-purple-300 transition">Hax</a></li>
        </ul>
      </nav>
    </header>
  );
}

/* 
  Projects Data Array - includes the new Kubernetes project.
*/
const projects = [
  {
    title: "Gesture Translation and Recognition",
    description:
      "Developed an AI-powered gesture recognition system for real-time sign language translation. Created a scalable architecture for handling multiple users, implemented machine learning models using TensorFlow for gesture detection, and built a streaming pipeline for real-time processing. The system facilitates communication between sign language users and non-users.",
    skills: ["Client-Server", "Software Development", "Machine Learning", "Python"]
  },
  {
    title: "Implementation of Virtualisation Systems",
    description:
      "Designed and deployed a virtualization environment using Hyper-V and VMware. Implemented failover clustering, configured iSCSI storage networks, and developed PowerShell scripts for resource optimization. Created automated deployment workflows for virtual machines and established comprehensive monitoring systems.",
    skills: ["Virtualization", "Network Administration"]
  },
  {
    title: "SDN Controller for MikroTik Devices",
    description:
      "Spearheaded the development of a centralized SDN management platform for MikroTik devices using C# and ASP.NET Core. Engineered automated network configuration workflows reducing setup time, implemented real-time monitoring of network metrics, and integrated WireGuard VPN management.",
    skills: ["C#", "API REST", "Software Development", "Network Administration", "ASP.NET"]
  },
  {
    title: "SOMIOD: Service Oriented Middleware for Interoperability and Open Data",
    description:
      "Architected a middleware platform enabling seamless IoT device integration and data interchange. Implemented a RESTful API for device management, developed a real-time event notification system using MQTT, and created data transformation pipelines. The system facilitates interoperability between diverse IoT devices and platforms.",
    skills: ["Internet of Things (IoT)", "Middleware", "Web Services", "API REST"]
  },
  {
    title: "Space-Time WikiMaps",
    description:
      "Architected and deployed a high-performance Java REST service leveraging Apache Jena and Spring Boot for executing complex SPARQL queries against Wikidata. Engineered an efficient query processing pipeline with automated result caching, reducing response times. Implemented comprehensive API documentation and integrated automated testing with 90% code coverage.",
    skills: ["SPARQL", "Spring Boot", "Java", "Software Development", "Maven"]
  },
  {
    title: "Voting Application on Blockchain",
    description:
      "Engineered a decentralized voting platform utilizing Ethereum smart contracts and Solidity, ensuring complete vote immutability and transparency. Implemented zero-knowledge proofs for voter privacy, developed a Vue-based frontend for an intuitive voting experience, and integrated MetaMask for secure wallet authentication.",
    skills: ["Blockchain", "Web Design", "Software Development", "Web Services", "Solidity"]
  },
  {
    title: "Development of a Kubernetes Management Application",
    description:
      "Created a comprehensive Kubernetes orchestration dashboard for streamlined cluster management. Implemented monitoring of cluster health metrics, automated deployment workflows, and resource optimization features. Developed intuitive interfaces for managing containers, pods, and services, supporting multi-cluster operations with role-based access control.",
    skills: ["Kubernetes", "Container Orchestration"]
  }
];

/* 
  Main App Component
  - Uses VT323 for headings and Roboto for body text.
  - Sections fade in as they scroll into view.
  - Projects are now listed vertically.
*/
function App() {
  return (
    <div
      className="min-h-screen relative bg-black text-white overflow-hidden"
      style={{ fontFamily: "'VT323', monospace" }}
    >
      {/* Gradient overlay for subtle background transitions */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(138,43,226,0.2), rgba(0,0,0,0.8))' }}
      />

      {/* SVG Decorative Elements */}
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
        <FadeInSection
          id="hero"
          className="container mx-auto px-6 py-16 text-center"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <div className="max-w-4xl mx-auto">

            <h1
              className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-800 text-transparent bg-clip-text"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
            >
              Tiago Pereira
            </h1>
            <p
              className="text-xl text-gray-300 mb-8 leading-relaxed font-roboto"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Computer Engineer | Cybersecurity and Digital Forensics
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <a
                href="https://github.com/WhyN0t101"
                className="p-2 rounded-lg bg-purple-900 hover:bg-purple-800 transition-colors glow"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/tiago-pereira-4763ab252/"
                className="p-2 rounded-lg bg-purple-900 hover:bg-purple-800 transition-colors glow"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://gist.github.com/WhyN0t101"
                className="p-2 rounded-lg bg-purple-900 hover:bg-purple-800 transition-colors glow"
              >
                <Globe className="w-6 h-6" />
              </a>
            </div>
          </div>
        </FadeInSection>

        {/* About Section */}
        <FadeInSection
          id="about"
          className="container mx-auto px-6 mb-12"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <div className="bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10">
            <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-purple-400" />
              About Me
            </h2>
            <p
              className="text-xl text-gray-300 leading-relaxed font-roboto"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              An recent computer engineer graduate and current Cybersecurity student, driven by a passion for staying at the forefront of the rapidly evolving IT landscape. With a solid foundation in programming languages and software development principles, I’m excited to apply my skills and knowledge to make a meaningful impact in the industry. Currently expanding my expertise in Cybersecurity—with a focus on malware analysis, network security, and threat mitigation strategies—I’m eager to leverage my hands-on approach to learning and problem-solving to contribute to a dynamic organization.
            </p>
          </div>
        </FadeInSection>

        {/* Projects Section */}
        <FadeInSection
          id="projects"
          className="container mx-auto px-6 mb-12"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <h2 className="text-3xl font-semibold mb-8">Projects</h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <a
                key={index}
                href="#"
                className="block bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10 hover:bg-purple-800/80 transition-colors transform duration-300 hover:scale-105"
              >
                <h3 className="text-3xl font-semibold mb-2">{project.title}</h3>
                <p
                  className="text-xl text-gray-400 mb-4 font-roboto"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xl font-roboto" style={{ fontFamily: "'Roboto', sans-serif" }}>
                  {project.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-400/20 text-purple-300 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </FadeInSection>

        {/* Tools & Resources Section */}
        <FadeInSection
          id="resources"
          className="container mx-auto px-6 mb-12"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <div className="bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10">
            <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-purple-400" />
              Tools &amp; Resources
            </h2>
            <ul className="space-y-3 text-xl font-roboto" style={{ fontFamily: "'Roboto', sans-serif" }}>
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
        </FadeInSection>

        {/* Hax & Exploits Section */}
        <FadeInSection
          id="hax"
          className="container mx-auto px-6 mb-12"
          style={{ marginBottom: 'var(--section-gap, 4rem)' }}
        >
          <div className="bg-purple-900/80 backdrop-blur-sm rounded-2xl p-10">
            <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-purple-400" />
              Hax &amp; Exploits
            </h2>
            <ul className="space-y-3 text-xl font-roboto" style={{ fontFamily: "'Roboto', sans-serif" }}>
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
        </FadeInSection>
      </div>
    </div>
  );
}

export default App;
