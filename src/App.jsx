import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Linkedin, ArrowDown } from 'lucide-react';
import gcpBadge from './assets/professionaldataengineercertification.png'
import logo from './assets/logo.png'
import polimi_logo from './assets/polimi logo.png'
import unimi_logo from './assets/unimi_logo.png'

const DataBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Network nodes
    const nodes = [];
    
    // Create nodes
    for (let i = 0; i < 100; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    // Data streams
    const dataStreams = [];
    for (let i = 0; i < 25; i++) {
      dataStreams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        length: Math.random() * 100 + 50,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between close nodes
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.globalAlpha = (1 - distance / 150) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.globalAlpha = node.opacity;
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
      
      // Draw data streams
      ctx.globalAlpha = 0.6;
      dataStreams.forEach(stream => {
        const gradient = ctx.createLinearGradient(stream.x, stream.y, stream.x + stream.length, stream.y);
        gradient.addColorStop(0, `rgba(59, 130, 246, 0)`);
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${stream.opacity})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(stream.x, stream.y);
        ctx.lineTo(stream.x + stream.length, stream.y);
        ctx.stroke();
        
        // Move stream
        stream.x += stream.speed;
        if (stream.x > canvas.width + stream.length) {
          stream.x = -stream.length;
          stream.y = Math.random() * canvas.height;
        }
      });
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const App = () => {
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

  const credentials = [
    {
      id: 'BSc',
      title: 'BSc Engineering Physics',
      description: '',
      field: ['Engineering', 'Physics'],
      liveUrl: '',
      image: polimi_logo,
      image_type: 'image',
      status: 'Completed',
      category: 'Bachelor Degree',
      entities: ['Politecnico di Milano'],
      showButtons : {live: false, github: false},
      liveButtonText: ''
    },
    {
      id: 'MSc1',
      title: 'MSc Nuclear Engineering',
      description: '',
      field: ['Engineering', 'Physics'],
      liveUrl: '',
      image: polimi_logo,
      image_type: 'image',
      status: 'Completed',
      category: 'Master Degree',
      entities: ['Politecnico di Milano'],
      showButtons : {live: false, github: false},
      liveButtonText: ''
    },
    {
      id: 'MSc2',
      title: 'MSc Applied Physics',
      description: '',
      field: ['Physics'],
      liveUrl: '',
      image: unimi_logo,
      image_type: 'image',
      status: 'Completed',
      category: 'Master Degree',
      entities: ['Università degli Studi di Milano'],
      showButtons : {live: false, github: false},
      liveButtonText: ''
    },
    {
      id: 'CloudCert1',
      title: 'Google Cloud Certified Professional Data Engineer',
      description: '',
      field: ['Cloud'],
      liveUrl: 'https://www.credly.com/badges/eec123e7-6364-47e2-9d2f-351497aefa58/public_url',
      image: gcpBadge,
      image_type: 'image',
      status: 'Completed',
      category: 'Certification',
      entities: ['Google Cloud Platform'],
      showButtons : {live: true, github: false},
      liveButtonText: 'credential'
    },
    {
      id: 'CorsoSpecializzazione1',
      title: 'Specialization: AI, Big Data and Platforms',
      description: '',
      field: ['Legal', 'Cloud'],
      liveUrl: '',
      image: unimi_logo,
      image_type: 'image',
      status: 'Completed',
      category: 'Advanced Professional Certificate',
      entities: ['Univeristà degli Studi di Milano'],
      showButtons : {live: false, github: false},
      liveButtonText: ''
    }
  ]

  const projects = [
    {
      id: 'therapai',
      title: 'TherapAI - AI Therapy Support Platform',
      description: 'A comprehensive AI-powered therapy support application that provides mental health assistance through intelligent conversations. Built with modern web technologies and deployed on Azure.',
      technologies: ['React', 'Python', 'Flask/FastAPI', 'Azure Static Web Site', 'AI/ML', 'GitHub Actions', 'Azure SQL', 'REST API', 'Key Vault', 'Web App', 'App Plan', 'Azure Functions'],
      liveUrl: 'https://salmon-pebble-0aa0dd103.1.azurestaticapps.net',
      image: '🧠',
      image_type: 'str',
      status: 'Demo',
      category: 'AI/Healthcare',
      highlights: [
        'Intelligent conversation flow with AI responses',
        'Cloud Infrastructure',
        'Prompting',
        'Text processing'
      ],
      showButtons : {live: true, github: true},
      liveButtonText: 'try demo'
    },
    {
      id: 'EA',
      title: 'Energy Analytics',
      description: 'Automation and forecasting projects for energy and finacial energy applications.',
      technologies: ['Python', 'Pandas', 'PostgreSQL', 'PySpark', 'Databricks'],
      image: '📊',
      image_type: 'str',
      status: 'Completed',
      category: 'Data Science',
      highlights: [
        'IaC',
        'Cloud Infrastructure',
        'Energy production forecasting for renewable power plants',
        'PPA evaluations',
        'Energy companies churn rate modeling',
        'Pricing forecasting',
        'Commodity swap and options pricing',
        'Scenario Analysis',
        'Hedge Accounting',
        'Power market trading'
      ],
      showButtons : {live: false, github: false},
      liveButtonText: ''
    },
    {
      id: 'IA',
      title: 'Insurance Analytics',
      description: 'End-to-end app development for Planning',
      technologies: ['Python', 'Flask', 'Pandas', 'Numpy','PostgreSQL'],
      image: '📊',
      image_type: 'str',
      status: 'Completed',
      category: 'Data Science',
      highlights: [
        'IaC',
        'Cloud Infrastructure',
        'Planning',
        'Scenario Analysis',
        'Financial reporting',
      ],
      showButtons : {live: false, github: false},
      liveButtonText: ''
    },
    {
      id: 'PA',
      title: 'Physical Analysis',
      description: 'Analize Multi-spectral measurements on physical samples to unvail composition in art works and industry. Check out my article on MDPI.',
      technologies: ['Python', 'MatLab'],
      liveUrl: 'https://www.mdpi.com/2071-1050/16/6/2467',
      image: '🔬',
      image_type: 'str',
      status: 'Completed',
      category: 'Data Science',
      highlights: [
        'Multi-spectral data processing',
        'Cultural Heritage applications',
        'Advanced analytical algorithms',
        'Research publication quality',
        'Industry application ready'
      ],
      showButtons : {live: true, github: false},
      liveButtonText: 'Article'
    },
    {
      id: 'versioninglibrarysystem',
      title: 'Versioning library',
      description: 'A versioning library to enable versioning and version tracking of data and elaboration through processes, compatible with most common relational database',
      technologies: ['Python', 'PostgreSQL', 'Azure SQL', 'MySQL', 'SQLite'],
      liveUrl: '',
      image: '',
      image_type: 'str',
      status: 'Development',
      category: 'SW development',
      highlights: [
        'Library development',
        'Architecture',
        'Coding',
        'Relational databases'
      ],
      showButtons : {live: false, github: true},
      liveButtonText: '',
      githubUrl: 'https://github.com/RicZit/relational_versioning.git'
    }, 
    {
      id: 'weddingsite',
      title: 'Wedding Site',
      description: 'My personal wedding website',
      technologies: ['Python','Azure Static Web Site', 'GitHub Actions', 'Azure SQL', 'REST API'],
      liveUrl: '',
      image: '',
      image_type: 'str',
      status: 'Development',
      category: 'Events planning',
      highlights: [
      ],
      showButtons : {live: false, github: false},
      liveButtonText: 'try demo'
    },
  ];

  const skills = [
    { category: 'Backend', items: ['Python', 'Flask/FastAPI', 'REST APIs', 'Spark'] },
    { category: 'Database', items: ['PostgreSQL', 'MySQL', 'SQLite', 'BigTable', 'BigQuery', 'SQL Spanner', 'Google Cloud SQL'] },
    { category: 'Cloud/DevOps', items: ['Azure', 'AWS', 'GCP', 'Databricks', 'Data Warehouse', 'Data Lake', 'GitHub Actions', 'CI/CD', 'Architecture', 'FinOps'] },
    { category: 'AI/ML', items: ['Machine Learning', 'Natural Language Processing', 'Data Analysis', 'TensorFlow'] },
    { category: 'Frontend', items: ['React'] }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
      {/* Data-themed background */}
      <DataBackground />
      
      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: 2
        }}
      />
      
      {/* Main content with higher z-index */}
      <div className="relative" style={{ zIndex: 3 }}>
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-blue-500/20 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Riccardo Maria Zito
              </div>
              <div className="hidden md:flex space-x-8">
                {['home', 'credentials', 'projects', 'skills', 'contact'].map((section) => (
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
              <img src={logo} alt='logo' className='h-32 w-32 mx-auto mb-6 object-contain'/>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Value Creator
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Data - AI - Cloud and Analytics
              </h2>
              <p className="text-xl md:text-2xl text-blue-100/80 mb-8 max-w-3xl mx-auto">
                Don't look for an answer, look for the question. Then, the answer will shape itself.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg shadow-blue-500/25"
              >
                View My Work
                <ArrowDown className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>

            </div>

            <div className="flex justify-center space-x-6">
              <a href="https://github.com/RicZit" className="text-blue-300/60 hover:text-blue-300 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/riccardo-maria-zito" className="text-blue-300/60 hover:text-blue-300 transition-colors">
                <Linkedin size={24} />
              </a>

            </div>
          </div>
        </section>

        {/* Formal Credentials Section */}
        <section id="credentials" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.credentials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Formal Credentials
              </h2>
              <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
                Instruction and life-long learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {credentials.map((credential, index) => (
                <div
                  key={credential.id}
                  className={`group bg-slate-900/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:bg-slate-900/60 hover:border-blue-400/40 transition-all duration-500 transform hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 ${
                    isVisible.credentials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {credential.image_type ==='str' ? <div className="text-4xl mb-4">{credential.image}</div>  :
                  <div className="mb-8">
                    <img src={credential.image} alt='logo' className='h-24 w-24 mx-auto mb-6 object-contain'/>
                  </div>}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                      {credential.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      credential.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      credential.status === 'Ongoing' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {credential.status}
                    </span>
                  </div>
                  
                  <p className="text-blue-100/70 mb-4 text-sm leading-relaxed">
                    {credential.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-xs text-blue-200/50 mb-2">Certifying body:</div>
                    <ul className="text-xs text-blue-100/70 space-y-1">
                      {credential.entities.map((entity, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                          {entity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {credential.field.map((f) => (
                      <span
                        key={f}
                        className="text-xs bg-blue-500/20 text-blue-200/80 px-2 py-1 rounded-full border border-blue-500/20"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    {credential.showButtons?.live && (<a
                      href={credential.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm bg-blue-600/30 hover:bg-blue-600/40 text-blue-300 px-3 py-2 rounded-lg transition-colors border border-blue-500/30"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      {credential.liveButtonText || 'Live Demo'}
                    </a>
                  )}
                    {credential.showButtons?.github && (<a
                      href={credential.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm bg-slate-800/50 hover:bg-slate-700/50 text-blue-200/80 px-3 py-2 rounded-lg transition-colors border border-slate-600/30"
                    >
                      <Github size={14} className="mr-1" />
                      Code
                    </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
                Here are some of my recent projects that showcase my skills in full-stack development, AI integration, and cloud deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group bg-slate-900/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:bg-slate-900/60 hover:border-blue-400/40 transition-all duration-500 transform hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 ${
                    isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {
                    project.image_type === 'str'? <div className="text-4xl mb-4">{project.image}</div> :
                  <div className="mb-8">
                    <img src={project.image} alt='logo' className='h-24 w-24 mx-auto mb-6 object-contain'/>
                  </div>                  
                  }
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
                  
                  <p className="text-blue-100/70 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-xs text-blue-200/50 mb-2">Key Features:</div>
                    <ul className="text-xs text-blue-100/70 space-y-1">
                      {project.highlights.slice(0, 5).map((highlight, i) => (
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
                        className="text-xs bg-blue-500/20 text-blue-200/80 px-2 py-1 rounded-full border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    {project.showButtons?.live && (<a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm bg-blue-600/30 hover:bg-blue-600/40 text-blue-300 px-3 py-2 rounded-lg transition-colors border border-blue-500/30"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      {project.liveButtonText || 'Live Demo'}
                    </a>
                  )}
                    {project.showButtons?.github && (<a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm bg-slate-800/50 hover:bg-slate-700/50 text-blue-200/80 px-3 py-2 rounded-lg transition-colors border border-slate-600/30"
                    >
                      <Github size={14} className="mr-1" />
                      Code
                    </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 bg-slate-950/20">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Technical Skills
              </h2>
              <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
                A comprehensive toolkit for building modern, scalable applications across the full technology stack.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {skills.map((skillGroup, index) => (
                <div
                  key={skillGroup.category}
                  className={`bg-slate-900/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:bg-slate-900/60 hover:border-blue-400/40 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 ${
                    isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="text-blue-100/80 text-sm">
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
                Let's Connect!
              </h2>
              <p className="text-xl text-blue-100/80 mb-8 max-w-2xl mx-auto">
                I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas to life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <a
                  href="https://www.linkedin.com/in/riccardo-maria-zito"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-blue-400/30 hover:border-blue-400/60 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <Linkedin className="mr-2" size={20} />
                  Visit
                </a>
              </div>

              <p className="text-blue-200/60">
                Based in Milan, Lombardy, IT
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-blue-500/20 py-8 px-6 bg-slate-950/30">
          <div className="max-w-7xl mx-auto text-center text-blue-200/60">
            <p>&copy; 2024 Riccardo Maria Zito</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;