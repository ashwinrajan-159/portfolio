import React, { useState} from 'react';
import { Github, Linkedin, Mail, Phone, Heart, Code, Brain, Cloud, Zap, Award, User, FolderOpen, BookOpen, ExternalLink, Download, Star, Calendar, Monitor, Database, Terminal, Globe } from 'lucide-react';
import LiquidEther from './LiquidEther';  // Adjust path if needed
// Color configuration - all white text with transparent backgrounds
const colors = {
  primary: '#ffffff',
  secondary: 'rgba(255, 255, 255, 0.8)',
  accent: 'rgba(255, 255, 255, 0.7)',
  text: '#ffffff',
  textLight: 'rgba(255, 255, 255, 0.7)',
  background: '#000000',
  card: 'rgba(255, 255, 255, 0.05)',
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  const projects = [
    {
      id: 1,
      title: "Emotion Recognition System",
      subtitle: "AI-Powered Computer Vision",
      description: "Advanced CNN-based emotion recognition system that classifies facial expressions in real-time with exceptional accuracy using TensorFlow and OpenCV.",
      tech: ["TensorFlow", "OpenCV", "Python", "CNN", "Computer Vision"],
      year: "2024",
      status: "Featured",
      metrics: { accuracy: "95%", performance: "+12%", usage: "Real-time" },
      highlights: [
        "Real-time emotion detection and classification",
        "High-accuracy deep learning model training",
        "Psychology and HCI applications",
        "Optimized for production deployment"
      ],
      category: "AI/ML"
    },
    {
      id: 2,
      title: "Automated Cloud Deployment",
      subtitle: "DevOps & Infrastructure",
      description: "Enterprise-grade automated deployment system leveraging containerization, orchestration and CI/CD pipelines for seamless cloud operations.",
      tech: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
      year: "2024",
      status: "Production",
      metrics: { efficiency: "+40%", reliability: "99.9%", deployment: "Automated" },
      highlights: [
        "Containerized microservices architecture",
        "Kubernetes orchestration and scaling",
        "Infrastructure as Code implementation",
        "Zero-downtime deployment strategy"
      ],
      category: "DevOps"
    },
    {
      id: 3,
      title: "Speech Recognition System",
      subtitle: "NLP & Machine Learning",
      description: "Optimized speech recognition system with advanced NLP capabilities, achieving significant performance improvements and industry compliance.",
      tech: ["Python", "NLP", "Machine Learning", "Speech Processing"],
      year: "2023",
      status: "Optimized",
      metrics: { improvement: "+12%", failures: "-15%", accuracy: "Industry Standard" },
      highlights: [
        "Advanced speech processing algorithms",
        "Natural language understanding",
        "Voice recognition optimization",
        "Industry standard compliance"
      ],
      category: "AI/ML"
    }
  ];

  const skills = {
    "Frontend": {
      icon: Monitor,
      items: ["React", "JavaScript", "HTML5", "CSS3", "Responsive Design"]
    },
    "Programming": {
      icon: Code,
      items: ["Python", "Java", "C++", "SQL", "Data Structures"]
    },
    "AI/ML": {
      icon: Brain,
      items: ["TensorFlow", "OpenCV", "NLP", "CNN", "Deep Learning"]
    },
    "Cloud & DevOps": {
      icon: Cloud,
      items: ["AWS", "Azure", "Docker", "Kubernetes", "Jenkins"]
    },
    "Database": {
      icon: Database,
      items: ["SQL", "NoSQL", "Database Design", "Query Optimization"]
    },
    "Tools & Others": {
      icon: Terminal,
      items: ["Git", "Terraform", "CI/CD", "Linux", "Agile"]
    }
  };

  const achievements = [
    { title: "Applied Machine Learning in Python", year: "2024", type: "Certification", icon: Award },
    { title: "Advanced SQL for Technical Interviews", year: "2024", type: "Certification", icon: Award },
    { title: "Cloud Architecture Specialization", year: "2024", type: "Coursework", icon: Cloud },
    { title: "AI/ML Fundamentals", year: "2024", type: "Coursework", icon: Brain }
  ];

  const NavItem = ({ icon: Icon, label, section, isActive }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'text-white' 
          : 'text-gray-400 hover:text-white'
      }`}
      style={{
        backgroundColor: isActive ? colors.card : 'transparent',
      }}
    >
      <Icon size={22} className="mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  const ProjectCard = ({ project, index }) => (
    <div 
      className="rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 relative overflow-hidden"
      style={{
        backgroundColor: colors.card,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: project.status === 'Featured' ? 'rgba(255, 255, 255, 0.2)' : 
                            project.status === 'Production' ? 'rgba(255, 255, 255, 0.2)' : 
                            'rgba(255, 255, 255, 0.2)',
            color: colors.primary,
          }}
        >
          {project.status}
        </span>
      </div>

      <div className="relative z-10">
        <div className="mb-5">
          <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
            {project.title}
          </h3>
          <p className="font-medium" style={{ color: colors.textLight }}>{project.subtitle}</p>
          <span className="text-sm" style={{ color: colors.textLight }}>{project.year} • {project.category}</span>
        </div>

        <p className="mb-5 leading-relaxed" style={{ color: colors.textLight }}>{project.description}</p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="rounded-lg p-3 text-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
            >
              <div className="text-lg font-bold" style={{ color: colors.primary }}>{value}</div>
              <div className="text-xs uppercase" style={{ color: colors.textLight }}>{key}</div>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: colors.textLight }}>Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full text-xs"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: colors.textLight
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 mb-5">
          {project.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm" style={{ color: colors.textLight }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: colors.primary }}></div>
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-10"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: colors.primary,
          }}
        >
          <ExternalLink size={16} />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );

  const SkillCategory = ({ category, data, index }) => {
    const Icon = data.icon;
    return (
      <div className="rounded-xl p-5 transition-all duration-300 hover:transform hover:-translate-y-1"
        style={{
          backgroundColor: colors.card,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="inline-flex items-center gap-3 mb-4 p-3 rounded-lg"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <Icon size={24} style={{ color: colors.primary }} />
          <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{category}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {data.items.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-2" style={{ color: colors.textLight }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <span className="text-sm font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AchievementCard = ({ achievement, index }) => {
    const Icon = achievement.icon;
    return (
      <div 
        className="rounded-xl p-5 transition-all duration-300 hover:transform hover:-translate-y-1"
        style={{
          backgroundColor: colors.card,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-start gap-4">
          <Icon size={24} style={{ color: colors.primary }} />
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2" style={{ color: colors.primary }}>{achievement.title}</h3>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 text-xs font-medium rounded"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: colors.textLight
                }}
              >
                {achievement.type}
              </span>
              <span className="text-sm flex items-center gap-1" style={{ color: colors.textLight }}>
                <Calendar size={14} />
                {achievement.year}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative"
      style={{ backgroundColor: colors.background, color: colors.primary }}
    >
      {/* LiquidEther Fluid Simulation Background */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}  // Lower for better performance on mobile
            isBounce={false}
            autoDemo={true}  // Enables auto-movement when idle
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
</div>

      <div className="relative z-10 min-h-screen flex flex-col pt-8">
        {/* Header with name and navigation */}
        <header className="sticky top-0 z-20 p-6 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-6">
              <h1 className="text-5xl font-bold mb-2 tracking-tight" style={{ color: colors.primary }}>
                ASHWIN RAJAN
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm mb-3 rounded-full px-4 py-1"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: colors.primary
                }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }}></div>
                <span>Available for opportunities</span>
              </div>
              <p className="text-md leading-relaxed max-w-2xl" style={{ color: colors.textLight }}>
                Cloud & AI Tech Enthusiast specializing in scalable applications and intelligent systems
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex justify-center space-x-1 mb-8">
              <NavItem icon={User} label="About" section="home" isActive={activeSection === 'home'} />
              <NavItem icon={FolderOpen} label="Projects" section="projects" isActive={activeSection === 'projects'} />
              <NavItem icon={Brain} label="Skills" section="skills" isActive={activeSection === 'skills'} />
              <NavItem icon={Award} label="Achievements" section="achievements" isActive={activeSection === 'achievements'} />
              <NavItem icon={BookOpen} label="Education" section="education" isActive={activeSection === 'education'} />
              <NavItem icon={Mail} label="Contact" section="contact" isActive={activeSection === 'contact'} />
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto w-full">
            {activeSection === 'home' && (
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="rounded-xl p-8"
                  style={{
                    backgroundColor: colors.card,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
                        Building the Future with AI & Cloud
                      </h3>
                      <p className="text-lg leading-relaxed mb-6" style={{ color: colors.textLight }}>
                        I'm a passionate Computer Science student at VIT Bhopal, specializing in AI/ML and cloud technologies. 
                        I love creating intelligent systems that solve real-world problems and building scalable applications 
                        that make a difference.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <span className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: colors.primary
                          }}
                        >
                          🎓 CS Engineering Student
                        </span>
                        <span className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: colors.primary
                          }}
                        >
                          🚀 AI/ML Enthusiast
                        </span>
                        <span className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: colors.primary
                          }}
                        >
                          ☁️ Cloud Developer
                        </span>
                      </div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="w-64 h-64 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <div className="text-6xl font-bold" style={{ 
                          color: colors.primary
                        }}>
                          AR
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What I Do */}
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Brain, title: "AI & Machine Learning", desc: "Developing intelligent systems using TensorFlow, computer vision, and NLP to solve complex real-world problems.", color: colors.primary },
                    { icon: Cloud, title: "Cloud Architecture", desc: "Building scalable cloud solutions on AWS and Azure with containerization and infrastructure as code.", color: colors.primary },
                    { icon: Zap, title: "DevOps & Automation", desc: "Implementing CI/CD pipelines and automation tools to streamline development and deployment processes.", color: colors.primary }
                  ].map((item, index) => (
                    <div key={index} className="rounded-xl p-5 transition-all duration-300 hover:transform hover:-translate-y-1"
                      style={{
                        backgroundColor: colors.card,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <item.icon size={24} className="mb-4 mx-auto" style={{ color: item.color }} />
                      <h4 className="text-lg font-bold mb-3 text-center" style={{ color: colors.primary }}>{item.title}</h4>
                      <p className="text-center" style={{ color: colors.textLight }}>{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Current Focus */}
                <div className="rounded-xl p-8"
                  style={{
                    backgroundColor: colors.card,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 justify-center" style={{ color: colors.primary }}>
                    <Star style={{ color: colors.primary }} />
                    Currently Working On
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {[
                        { color: colors.primary, text: "Advanced Computer Vision Projects" },
                        { color: colors.primary, text: "Cloud-Native Application Development" },
                        { color: colors.primary, text: "DevOps Pipeline Optimization" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3" style={{ color: item.color }}>
                          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: item.color }}></div>
                          <span className="font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ color: colors.textLight }}>
                      <p className="leading-relaxed">
                        Constantly exploring new technologies and methodologies to push the boundaries of what's possible 
                        in AI and cloud computing. Always excited to collaborate on innovative projects!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="space-y-8">
                <div className="grid gap-6">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Object.entries(skills).map(([category, data], index) => (
                    <SkillCategory key={category} category={category} data={data} index={index} />
                  ))}
                </div>
                
                {/* Languages */}
                <div className="rounded-xl p-8"
                  style={{
                    backgroundColor: colors.card,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 justify-center" style={{ color: colors.primary }}>
                    <Globe style={{ color: colors.primary }} />
                    Languages
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold mb-2" style={{ color: colors.primary }}>English</div>
                      <div className="h-2 rounded-full mb-2 mx-auto max-w-xs"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        <div className="h-full rounded-full w-full" style={{ backgroundColor: colors.primary }}></div>
                      </div>
                      <div className="text-sm" style={{ color: colors.textLight }}>Fluent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold mb-2" style={{ color: colors.primary }}>Tamil</div>
                      <div className="h-2 rounded-full mb-2 mx-auto max-w-xs"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        <div className="h-full rounded-full w-full" style={{ backgroundColor: colors.primary }}></div>
                      </div>
                      <div className="text-sm" style={{ color: colors.textLight }}>Native</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold mb-2" style={{ color: colors.primary }}>Hindi</div>
                      <div className="h-2 rounded-full mb-2 mx-auto max-w-xs"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        <div className="h-full rounded-full w-5/6" style={{ backgroundColor: colors.primary }}></div>
                      </div>
                      <div className="text-sm" style={{ color: colors.textLight }}>Conversational</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'achievements' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-5">
                  {achievements.map((achievement, index) => (
                    <AchievementCard key={index} achievement={achievement} index={index} />
                  ))}
                </div>

                {/* Key Strengths */}
                <div className="rounded-xl p-8"
                  style={{
                    backgroundColor: colors.card,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 justify-center" style={{ color: colors.primary }}>
                    <Zap style={{ color: colors.primary }} />
                    Key Strengths
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        <Brain size={24} style={{ color: colors.primary }} />
                      </div>
                      <h4 className="font-bold mb-2" style={{ color: colors.primary }}>Problem Solving</h4>
                      <p className="text-sm" style={{ color: colors.textLight }}>Strong analytical and critical thinking skills</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        <Code size={24} style={{ color: colors.primary }} />
                      </div>
                      <h4 className="font-bold mb-2" style={{ color: colors.primary }}>Technical Aptitude</h4>
                      <p className="text-sm" style={{ color: colors.textLight }}>Quick learner with diverse technical skills</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        <Cloud size={24} style={{ color: colors.primary }} />
                      </div>
                      <h4 className="font-bold mb-2" style={{ color: colors.primary }}>Adaptability</h4>
                      <p className="text-sm" style={{ color: colors.textLight }}>Thrives in fast-paced, evolving environments</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'education' && (
              <div className="space-y-8">
                {/* Education Timeline */}
                <div className="relative">
                  
                  {/* Education Items */}
                  <div className="space-y-8 relative">
                    {/* VIT Bhopal */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                          style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                        >
                          VIT
                        </div>
                      </div>
                      <div className="flex-1 rounded-xl p-6 transition-all duration-300"
                        style={{
                          backgroundColor: colors.card,
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>Vellore Institute of Technology, Bhopal</h3>
                            <p className="font-medium" style={{ color: colors.primary }}>Bachelor of Technology in Computer Science</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm rounded-full px-3 py-1"
                              style={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: colors.textLight
                              }}
                            >
                              2023 - 2027
                            </div>
                          </div>
                        </div>
                        <p className="mb-4" style={{ color: colors.textLight }}>
                          Specializing in Artificial Intelligence and Machine Learning with a focus on cloud computing 
                          and distributed systems.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm" style={{ color: colors.textLight }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                            <span>CGPA: 8.52/10</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm" style={{ color: colors.textLight }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                            <span>Relevant Coursework: Data Structures, Algorithms, Machine Learning, Cloud Computing</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm" style={{ color: colors.textLight }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                            <span>Activities: Tech Club Member, Coding Competitions</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm" style={{ color: colors.textLight }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                            <span>Specialization: AI & Machine Learning</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* High School */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                          style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                        >
                          HS
                        </div>
                      </div>
                      <div className="flex-1 rounded-xl p-6 transition-all duration-300"
                        style={{
                          backgroundColor: colors.card,
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>Higher Secondary Education</h3>
                            <p className="font-medium" style={{ color: colors.primary }}>Computer Science Stream</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm rounded-full px-3 py-1"
                              style={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: colors.textLight
                              }}
                            >
                              2019 - 2023
                            </div>
                          </div>
                        </div>
                        <p className="mb-4" style={{ color: colors.textLight }}>
                          Focused on foundational computer science concepts and mathematics, laying the groundwork 
                          for advanced studies in technology.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm" style={{ color: colors.textLight }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                            <span>Percentage: 85%</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm" style={{ color: colors.textLight }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                            <span>Subjects: Computer Science, Mathematics, Physics, Chemistry</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm" style={{ color: colors.textLight }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                            <span>Focus: Programming Fundamentals, Mathematical Reasoning</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Online Learning */}
                <div className="rounded-xl p-8"
                  style={{
                    backgroundColor: colors.card,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 justify-center" style={{ color: colors.primary }}>
                    <BookOpen style={{ color: colors.primary }} />
                    Continuous Learning
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold mb-3" style={{ color: colors.primary }}>Online Platforms</h4>
                      {[
                        { platform: "Coursera", focus: "Machine Learning & Cloud Computing" },
                        { platform: "Udemy", focus: "Full Stack Development" },
                        { platform: "edX", focus: "Computer Science Fundamentals" },
                        { platform: "YouTube", focus: "Latest Tech Trends & Tutorials" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3" style={{ color: colors.textLight }}>
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: colors.primary }}></div>
                          <div>
                            <span className="font-medium" style={{ color: colors.primary }}>{item.platform}</span>
                            <span className="text-sm block">{item.focus}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ color: colors.textLight }}>
                      <h4 className="font-bold mb-3" style={{ color: colors.primary }}>Learning Philosophy</h4>
                      <p className="leading-relaxed mb-4">
                        I believe in continuous learning and staying updated with the rapidly evolving technology landscape. 
                        My approach combines theoretical understanding with hands-on practical experience.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Self-Directed Learning", "Project-Based Practice", "Community Engagement", "Industry Trends"].map((tag, index) => (
                          <span key={index} className="px-3 py-1 text-xs rounded-full"
                            style={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              color: colors.textLight
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="space-y-8">
                {/* Contact Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Get in Touch */}
                  <div className="rounded-xl p-8"
                    style={{
                      backgroundColor: colors.card,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Get In Touch</h3>
                    <p className="mb-6 leading-relaxed" style={{ color: colors.textLight }}>
                      I'm always excited to discuss new opportunities, collaborate on interesting projects, 
                      or just chat about technology and innovation. Let's connect!
                    </p>
                    
                    <div className="space-y-4">
                      <a href="mailto:ashwinrajan@example.com" 
                        className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-10"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          <Mail size={24} style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <div className="font-medium" style={{ color: colors.primary }}>Email</div>
                          <div className="text-sm" style={{ color: colors.textLight }}>ashwinrajan123123@gmail.com</div>
                        </div>
                      </a>

                      <a href="tel:+919876543210" 
                        className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-10"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          <Phone size={24} style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <div className="font-medium" style={{ color: colors.primary }}>Phone</div>
                          <div className="text-sm" style={{ color: colors.textLight }}>+91 7010704499</div>
                        </div>
                      </a>

                      <a href="www.linkedin.com/in/ashwin-rajan-rajamanickam" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-10"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          <Linkedin size={24} style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <div className="font-medium" style={{ color: colors.primary }}>LinkedIn</div>
                          <div className="text-sm" style={{ color: colors.textLight }}>Connect professionally</div>
                        </div>
                      </a>

                      <a href="https://github.com/ashwinrajan-159" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-10"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          <Github size={24} style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <div className="font-medium" style={{ color: colors.primary }}>GitHub</div>
                          <div className="text-sm" style={{ color: colors.textLight }}>View my projects</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Quick Message */}
                  <div className="rounded-xl p-8"
                    style={{
                      backgroundColor: colors.card,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Send a Message</h3>
                    <form className="space-y-4">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          className="w-full p-4 rounded-lg bg-transparent border text-white placeholder-gray-400"
                          style={{ 
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)'
                          }}
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder="Your Email" 
                          className="w-full p-4 rounded-lg bg-transparent border text-white placeholder-gray-400"
                          style={{ 
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)'
                          }}
                        />
                      </div>
                      <div>
                        <textarea 
                          placeholder="Your Message" 
                          rows="6"
                          className="w-full p-4 rounded-lg bg-transparent border text-white placeholder-gray-400 resize-none"
                          style={{ 
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)'
                          }}
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full p-4 rounded-lg font-medium transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: colors.primary,
                        }}
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>

                {/* Resume Download */}
                <div className="rounded-xl p-8 text-center"
                  style={{
                    backgroundColor: colors.card,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
                    Interested in working together?
                  </h3>
                  <p className="mb-6" style={{ color: colors.textLight }}>
                    Download my resume for detailed information about my experience and qualifications.
                  </p>
                  <button className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:transform hover:-translate-y-1"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: colors.primary,
                    }}
                  >
                    <Download size={20} />
                    <span>Download Resume</span>
                  </button>
                </div>

                {/* Location */}
                <div className="rounded-xl p-8"
                  style={{
                    backgroundColor: colors.card,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 justify-center" style={{ color: colors.primary }}>
                    <Globe style={{ color: colors.primary }} />
                    Location & Availability
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <h4 className="font-bold mb-2" style={{ color: colors.primary }}>Current Location</h4>
                      <p style={{ color: colors.textLight }}>Bhopal, Madhya Pradesh, India</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2" style={{ color: colors.primary }}>Time Zone</h4>
                      <p style={{ color: colors.textLight }}>IST (GMT +5:30)</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2" style={{ color: colors.primary }}>Availability</h4>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span style={{ color: colors.primary }}>Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 mt-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center gap-1 text-sm" style={{ color: colors.textLight }}>
                <span>Made with</span>
                <Heart size={16} className="text-red-400 animate-pulse" />
                <span>by Ashwin Rajan</span>
              </div>
              <div className="text-xs" style={{ color: colors.textLight }}>
                © 2024 Ashwin Rajan. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
