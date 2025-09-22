import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Mail, Linkedin, Code, Brain, Database, Globe, Calendar, ArrowRight } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 'therapai',
      title: 'TherapAI - AI Therapy Support Platform',
      description: 'A comprehensive AI-powered therapy support application that provides mental health assistance through intelligent conversations. Built with modern web technologies and deployed on Azure.',
      technologies: ['React', 'Python', 'Flask/FastAPI', 'Azure Static Web Apps', 'AI/ML', 'GitHub Actions'],
      liveUrl: 'https://salmon-pebble-0aa0dd103.1.azurestaticapps.net',
      githubUrl: '#',
      image: '🧠',
      status: 'Live',
      category: 'AI/Healthcare',
      highlights: [
        'Intelligent conversation flow with AI responses',
        'Secure user data handling and privacy protection',
        'Responsive design for mobile and desktop',
        'Automated CI/CD deployment pipeline',
        'Azure cloud infrastructure'
      ]
    },
    {
      id: 'project2',
      title: 'Data Analytics Dashboard',
      description: 'Interactive dashboard for business intelligence and data visualization with real-time updates and advanced filtering capabilities.',
      technologies: ['Python', 'Plotly', 'Pandas', 'PostgreSQL', 'Docker'],
      liveUrl: '#',
      githubUrl: '#',
      image: '📊',
      status: 'In Development',
      category: 'Data Science',
      highlights: [
        'Real-time data processing and visualization',
        'Advanced filtering and drill-down capabilities',
        'Export functionality for reports',
        'Responsive charts and graphs'
      ]
    },
    {
      id: 'project3',
      title: 'E-Commerce API Platform',
      description: 'RESTful API platform for e-commerce operations with comprehensive authentication, payment processing, and inventory management.',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      image: '🛒',
      status: 'Completed',
      category: 'Backend/API',
      highlights: [
        'JWT authentication and authorization',
        'Payment gateway integration',
        'Inventory management system',
        'Comprehensive API documentation'
      ]
    }
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'JavaScript/TypeScript', 'HTML5/CSS3', 'Tailwind CSS', 'Vue.js'] },
    { category: 'Backend', items: ['Python', 'Flask/FastAPI', 'Node.js', 'Django', 'REST APIs'] },
    { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'] },
    { category: 'Cloud/DevOps', items: ['Azure', 'AWS', 'Docker', 'GitHub Actions', 'CI/CD'] },
    { category: 'AI/ML', items: ['Machine Learning', 'Natural Language Processing', 'Data Analysis', 'TensorFlow'] }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors hover:text-blue-400 ${
                    activeSection === section ? 'text-blue-400' : 'text-white/80'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
          isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl">
              👨‍💻
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Software Engineer
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Building innovative solutions with AI, modern web technologies, and cloud platforms. 
              Passionate about creating impactful applications that solve real-world problems.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              View My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <a
              href="mailto:your.email@example.com"
              className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/5"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://github.com/yourusername" className="text-white/60 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/yourprofile" className="text-white/60 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:your.email@example.com" className="text-white/60 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Here are some of my recent projects that showcase my skills in full-stack development, AI integration, and cloud deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4">{project.image}</div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-white/70 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-4">
                  <div className="text-xs text-white/50 mb-2">Key Features:</div>
                  <ul className="text-xs text-white/70 space-y-1">
                    {project.highlights.slice(0, 3).map((highlight, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm bg-white/10 hover:bg-white/20 text-white/80 px-3 py-2 rounded-lg transition-colors"
                  >
                    <Github size={14} className="mr-1" />
                    Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications across the full technology stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {skills.map((skillGroup, index) => (
              <div
                key={skillGroup.category}
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-500 ${
                  isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-lg font-semibold mb-4 text-purple-400">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-white/80 text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <a
                href="mailto:your.email@example.com"
                className="group bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <Mail className="mr-2" size={20} />
                Send Email
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/5 flex items-center justify-center"
              >
                <Linkedin className="mr-2" size={20} />
                LinkedIn
              </a>
            </div>

            <p className="text-white/60">
              Based in Milan, Lombardy, IT • Available for remote work worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-white/60">
          <p>&copy; 2024 Your Name. Built with React and passion for great software.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;