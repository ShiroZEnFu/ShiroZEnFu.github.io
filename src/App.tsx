import { useEffect, useRef, useState } from 'react';
import { Github, MessageCircle, Instagram, TowerControl as GameController2, MessagesSquare } from 'lucide-react';

function useTypewriter(text: string, delay: number = 100) {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    
    return () => clearInterval(timer);
  }, [text, delay]);
  
  return displayText;
}

function useIntersectionObserver(options = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return [elementRef, isVisible];
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <section
      ref={ref}
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </section>
  );
}

function App() {
  const name = useTypewriter("Hi, I'm Sarah Parker");
  const role = useTypewriter("Systems Developer", 100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const skills = ['C++', 'Discord Bots', 'Telegram Bots', 'System Applications', 'Git', 'Rust'];
  const socialLinks = [
    { name: 'GitHub', icon: <Github className="w-6 h-6" />, url: 'https://github.com' },
    { name: 'Telegram', icon: <MessageCircle className="w-6 h-6" />, url: 'https://t.me' },
    { name: 'Discord', icon: <MessagesSquare className="w-6 h-6" />, url: 'https://discord.com' },
    { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, url: 'https://instagram.com' },
    { name: 'Steam', icon: <GameController2 className="w-6 h-6" />, url: 'https://steamcommunity.com' },
  ];

  const projects = [
    {
      title: "Telegram Trading Bot",
      description: "Automated cryptocurrency trading bot with real-time market analysis and custom trading strategies. Built with Rust and Telegram Bot API.",
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=500",
      tags: ["Rust", "Telegram API", "Crypto"]
    },
    {
      title: "Discord Community Manager",
      description: "Advanced Discord bot for community management with AI-powered moderation, role management, and custom commands.",
      image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=500",
      tags: ["C++", "Discord API", "AI"]
    },
    {
      title: "System Resource Monitor",
      description: "Cross-platform system monitoring tool with real-time metrics, alerts, and performance optimization suggestions.",
      image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&q=80&w=500",
      tags: ["Rust", "Systems", "GUI"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <header className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400"
                alt="Profile"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-blue-600/80 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              {name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">{role}</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-16 space-y-32">
        {/* About */}
        <Section className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">About Me</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Passionate systems developer specializing in building robust applications and automation solutions. 
            I create efficient systems, bots, and applications that solve real-world problems.
          </p>
        </Section>

        {/* Skills */}
        <Section>
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">Technical Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill}
                className="bg-[#1a1a1a] p-6 rounded-lg text-center transform transition-all duration-300 hover:-translate-y-2 hover:bg-[#252525] border border-gray-800"
              >
                {skill}
              </div>
            ))}
          </div>
        </Section>

        {/* Social */}
        <Section>
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">Let's Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#1a1a1a] px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#252525] w-full justify-center border border-gray-800 hover:border-blue-600/50"
              >
                {social.icon}
                {social.name}
              </a>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section>
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.title} className="bg-[#1a1a1a] rounded-xl overflow-hidden group border border-gray-800 hover:border-blue-600/50 transition-colors duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-600/10 text-blue-400 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <footer className="bg-[#1a1a1a] mt-32 py-8 text-center text-gray-400 border-t border-gray-800">
        <p>© 2024 Sarah Parker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;