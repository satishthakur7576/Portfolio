import { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Phone, MapPin, Linkedin, Github, Instagram, 
  User, FileText, Briefcase, BookOpen, Send,
  Layout, Code, Smartphone, Camera,
  Download, ExternalLink, ChevronRight, X, Sparkles
} from 'lucide-react';
import { Tab, Service, TimelineItem, Skill, Project, BlogPost } from './types';
import { CursorGlow, Magnetic, SectionWrapper, Parallax } from './components/Effects';

// --- Constants ---

const PROJECTS: Project[] = [
  { 
    id: 'cad-modeling',
    title: '3D CAD Modeling \u2013 Mechanical Components', 
    category: '3D CAD Modeling', 
    image: 'https://picsum.photos/seed/cad/800/600',
    description: 'Designed 3D part models and multi-component assemblies using SolidWorks, applying GD&T principles and generating production-ready engineering drawings with proper tolerances and annotations.',
    technologies: ['SolidWorks', '3D Modeling', 'GD&T', 'Assemblies'],
    gallery: ['https://picsum.photos/seed/cad1/800/600', 'https://picsum.photos/seed/cad2/800/600']
  },
  { 
    id: '2d-drafting',
    title: '2D Engineering Drafting', 
    category: '2D Drafting', 
    image: 'https://picsum.photos/seed/draft/800/600',
    description: 'Created detailed 2D mechanical drawings including cross-sections, exploded views, and bill of materials (BOM) for machine components using AutoCAD Mechanical.',
    technologies: ['AutoCAD Mechanical', '2D Drafting', 'BOM', 'Cross-sections'],
    gallery: ['https://picsum.photos/seed/draft1/800/600', 'https://picsum.photos/seed/draft2/800/600']
  },
  { 
    id: 'python-automation',
    title: 'Python Automation Scripts', 
    category: 'Automation Scripts', 
    image: 'https://picsum.photos/seed/python/800/600',
    description: 'Developed Python scripts for logical problem-solving and basic task automation, building a foundation for data-driven engineering workflows and process optimization.',
    technologies: ['Python', 'Scripting', 'Automation', 'Data Processing'],
    gallery: ['https://picsum.photos/seed/python1/800/600', 'https://picsum.photos/seed/python2/800/600']
  }
];

// --- Components ---

const Typewriter = ({ texts, speed = 50, delayBetween = 2000 }: { texts: string[]; speed?: number; delayBetween?: number }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const fullText = texts[textIndex];
    const updatedText = isDeleting 
      ? fullText.substring(0, displayedText.length - 1)
      : fullText.substring(0, displayedText.length + 1);

    setDisplayedText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }
  }, [displayedText, isDeleting, textIndex, texts, delayBetween]);

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, speed]);

  return (
    <span className="primary-text font-bold">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-1 h-5 ml-1 bg-primary-start align-middle"
      />
    </span>
  );
};

const Sidebar = () => (
  <aside className="w-full lg:w-72 bg-bg-card/40 backdrop-blur-xl border border-border-dark rounded-3xl p-8 flex flex-col items-center lg:sticky lg:top-8 h-fit shadow-2xl">
    <Parallax offset={20}>
      <div className="relative mb-6 group">
        <div className="w-32 h-32 rounded-3xl overflow-hidden bg-border-dark flex items-center justify-center relative">
          <img 
            src="https://picsum.photos/seed/richard/200/200" 
            alt="Richard Hanrick" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-start/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 primary-gradient rounded-full flex items-center justify-center border-4 border-bg-card shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </Parallax>

    <h1 className="text-2xl font-bold mb-2 text-center">Satish Thakur</h1>
    <span className="px-4 py-1.5 bg-border-dark/50 rounded-lg text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-8 text-center border border-white/5">
      Mechanical Engineer
    </span>

    <div className="w-full space-y-6 pt-6 border-t border-border-dark">
      {[
        { icon: Mail, label: 'Email', value: 'satishthakur7576@gmail.com', href: 'mailto:satishthakur7576@gmail.com' },
        { icon: MapPin, label: 'Location', value: 'Jorhat, Assam, India' }
      ].map((item, i) => {
        const innerContent = (
          <>
            <div className="w-10 h-10 rounded-xl bg-border-dark flex items-center justify-center text-primary-start transition-all group-hover:primary-gradient group-hover:text-bg-dark shadow-inner">
              <item.icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{item.label}</p>
              <p className="text-sm truncate text-gray-300 group-hover:text-white transition-colors">{item.value}</p>
            </div>
          </>
        );
        return item.href ? (
          <a key={i} href={item.href} target={item.href.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer w-full">
            {innerContent}
          </a>
        ) : (
          <div key={i} className="flex items-center gap-4 group cursor-default">
            {innerContent}
          </div>
        )
      })}
    </div>

    <div className="flex gap-4 mt-8">
      {[
        { Icon: Linkedin, href: "https://www.linkedin.com/in/thakursatish" },
        { Icon: Github, href: "https://github.com/satishthakur7576" }
      ].map(({ Icon, href }, i) => (
        <div key={i}>
          <Magnetic strength={0.5}>
            <motion.a 
              href={href} 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-border-dark flex items-center justify-center text-gray-500 hover:text-primary-start transition-colors hover:bg-white/5 border border-transparent hover:border-white/10 shadow-lg cursor-pointer"
            >
              <Icon size={20} />
            </motion.a>
          </Magnetic>
        </div>
      ))}
    </div>
  </aside>
);

const Nav = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (t: Tab) => void }) => {
  const tabs: Tab[] = ['About', 'Resume', 'Portfolio', 'Blog', 'Contact'];
  const navigate = useNavigate();
  
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    navigate('/');
  };

  const location = useLocation();
  const isProjectModal = location.pathname.startsWith('/project/');

  return (
    <nav className={`bg-bg-card/80 backdrop-blur-xl border border-border-dark rounded-t-3xl lg:rounded-tr-3xl lg:rounded-bl-3xl px-8 py-4 flex justify-between lg:justify-end gap-2 lg:gap-8 overflow-x-auto no-scrollbar transition-opacity duration-300 ${isProjectModal ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === tab ? 'text-primary-start' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute -bottom-4 left-0 right-0 h-1 primary-gradient rounded-full"
            />
          )}
        </button>
      ))}
    </nav>
  );
};

const ProjectModal = ({ projects }: { projects: Project[] }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
      onClick={() => navigate('/')}
    >
      <button 
        onClick={() => navigate('/')}
        className="fixed top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl flex items-center justify-center text-white transition-all z-[110] border border-white/10 shadow-2xl group hover:scale-110 active:scale-95"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-bg-card border border-border-dark w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 sm:p-12">
          <div className="aspect-video rounded-[2rem] overflow-hidden mb-10 bg-border-dark shadow-2xl border border-white/5 relative group">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold">{project.title}</h2>
              <p className="text-gray-400 leading-relaxed">{project.description}</p>
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <Sparkles size={20} className="text-primary-start" />
                  Project Gallery
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="aspect-video rounded-2xl overflow-hidden bg-border-dark border border-white/5 shadow-xl group cursor-zoom-in">
                      <img src={img} alt={`${project.title} ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-4">Category</h4>
                <p className="text-primary-start font-medium">{project.category}</p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-border-dark/50 border border-white/5 rounded-xl text-xs font-medium text-gray-300 hover:text-primary-start hover:border-primary-start/30 transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Magnetic strength={0.2}>
                <button className="w-full py-4 primary-gradient text-bg-dark font-bold rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-primary-start/20 active:scale-95">
                  <ExternalLink size={18} />
                  Live Preview
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Sections ---

const AboutSection = () => {
  const services: Service[] = [
    { icon: <Layout size={32} />, title: 'Web Design', description: 'The most modern and high-quality design made at a professional level.' },
    { icon: <Code size={32} />, title: 'Web Development', description: 'High-quality development of sites at the professional level.' },
    { icon: <Smartphone size={32} />, title: 'Mobile Apps', description: 'Professional development of applications for iOS and Android.' },
    { icon: <Camera size={32} />, title: 'Photography', description: 'I make high-quality photos of any category at a professional level.' },
  ];

  return (
    <SectionWrapper>
      <div className="space-y-10">
        <section>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 relative inline-block"
          >
            About Me
            <div className="absolute -bottom-2 left-0 w-12 h-1.5 primary-gradient rounded-full" />
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4 text-gray-400 leading-relaxed"
          >
            <div className="text-2xl font-light text-white mb-6 flex items-center gap-3">
              <Sparkles className="text-primary-start animate-pulse" size={24} />
              <span>Hello! I'm a <Typewriter texts={['Mechanical Engineer', 'CAD Designer', 'Python Developer', 'Automation Enthusiast']} /></span>
            </div>
            <p>
              Final-year B.Tech Mechanical Engineering student with hands-on CAD experience in SolidWorks and AutoCAD for 3D modeling, assemblies, and engineering drawings. Proven ability to apply mechanical fundamentals in industrial and academic settings, including refinery operations at IOCL and material testing labs.
            </p>
            <p>
              Complementary Python skills for automation and data-driven problem-solving. Seeking engineering roles in mechanical design, manufacturing, or technical operations.
            </p>
          </motion.div>
        </section>

        <section>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8"
          >
            What I'm Doing
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-linear-to-br from-white/5 to-transparent border border-border-dark rounded-2xl flex gap-5 card-glow-hover group"
              >
                <div className="text-primary-start shrink-0 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
                <div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary-start transition-colors">{service.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
};

const ResumeSection = () => {
  const education: TimelineItem[] = [
    { title: 'Golaghat Engineering College', period: 'July 2022 — July 2026 (Expected)', description: 'Bachelor of Technology – Mechanical Engineering. Golaghat, Assam, India.' },
    { title: 'Crescent Academy', period: 'July 2020 — March 2022', description: 'Higher Secondary Certificate – Physics, Chemistry, Mathematics (PCM). Assam, India.' },
  ];

  const experience: TimelineItem[] = [
    { title: 'Indian Oil Corporation Limited (IOCL)', period: 'June 2025', description: 'Industrial Intern – Mechanical / Refinery Operations. Observed and analyzed real-world operations of critical mechanical systems including centrifugal pumps, compressors, and heat exchangers. Supported preventive maintenance tasks and applied safety protocols.' },
    { title: 'Jorhat Engineering College', period: 'June 2024', description: 'Academic Intern – Metrology & Material Testing Laboratory. Executed precision measurement experiments using micrometers and Vernier calipers. Conducted tensile strength and hardness tests on metal specimens. Authored detailed lab reports.' },
    { title: 'Prerona Pratibandhi Sishu Bikash Kendra', period: 'July 2023', description: 'Social Intern – Community Engagement. Coordinated educational and therapy support activities for differently-abled children, developing empathy-driven communication and inclusive teamwork skills.' },
  ];

  const skills: Skill[] = [
    { name: 'SolidWorks (3D CAD)', percentage: 85 },
    { name: 'AutoCAD Mechanical', percentage: 80 },
    { name: 'Python Automation', percentage: 75 },
    { name: 'Refinery Operations', percentage: 65 },
  ];

  return (
    <SectionWrapper>
      <div className="space-y-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold relative inline-block">
            Resume
            <div className="absolute -bottom-2 left-0 w-12 h-1.5 primary-gradient rounded-full" />
          </h2>
          <Magnetic strength={0.2}>
            <motion.button 
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-6 py-2.5 bg-bg-card border border-border-dark rounded-xl text-sm font-medium hover:text-primary-start transition-all group hover:border-primary-start/30"
            >
              <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
              Download CV
            </motion.button>
          </Magnetic>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-border-dark flex items-center justify-center text-primary-start shadow-inner">
                <BookOpen size={20} />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border-dark">
              {education.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="pl-12 relative group"
                >
                  <div className="absolute left-0 top-1.5 w-[40px] h-[40px] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-start ring-8 ring-bg-dark group-hover:scale-150 transition-transform duration-500" />
                  </div>
                  <h4 className="text-lg font-bold mb-1 group-hover:text-primary-start transition-colors">{item.title}</h4>
                  <span className="text-primary-start text-sm font-medium mb-3 block">{item.period}</span>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-border-dark flex items-center justify-center text-primary-start shadow-inner">
                <Briefcase size={20} />
              </div>
              <h3 className="text-2xl font-bold">Experience</h3>
            </div>
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border-dark">
              {experience.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="pl-12 relative group"
                >
                  <div className="absolute left-0 top-1.5 w-[40px] h-[40px] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-start ring-8 ring-bg-dark group-hover:scale-150 transition-transform duration-500" />
                  </div>
                  <h4 className="text-lg font-bold mb-1 group-hover:text-primary-start transition-colors">{item.title}</h4>
                  <span className="text-primary-start text-sm font-medium mb-3 block">{item.period}</span>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        <section className="pt-8">
          <h3 className="text-2xl font-bold mb-8">My Skills</h3>
          <div className="p-8 bg-bg-card border border-border-dark rounded-3xl space-y-6 shadow-2xl">
            {skills.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.percentage}%</span>
                </div>
                <div className="h-2 bg-border-dark rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className="h-full primary-gradient shadow-[0_0_10px_rgba(245,197,66,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
};

const PortfolioSection = () => {
  const categories = ['All', '3D CAD Modeling', '2D Drafting', 'Automation Scripts'];
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <SectionWrapper>
      <div className="relative">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-start/5 rounded-full blur-[100px] pointer-events-none" />
        <h2 className="text-3xl font-bold mb-8 relative inline-block">
          Portfolio
          <div className="absolute -bottom-2 left-0 w-12 h-1.5 primary-gradient rounded-full" />
        </h2>
      </div>

      <div className="flex gap-4 mb-12 overflow-x-auto no-scrollbar pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap px-6 py-3 rounded-2xl border ${
              activeCategory === cat 
                ? 'text-primary-start bg-primary-start/10 border-primary-start/20 shadow-[0_0_20px_rgba(245,197,66,0.1)]' 
                : 'text-gray-500 bg-white/5 border-white/5 hover:text-gray-300 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                layout: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              whileHover={{ 
                y: -12,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="group cursor-pointer card-glow-hover p-5 bg-bg-card/20 border border-border-dark rounded-[2.5rem]"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-border-dark shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-xl bg-bg-card flex items-center justify-center text-primary-start shadow-2xl"
                  >
                    <ExternalLink size={20} />
                  </motion.div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">View Project</span>
                </div>
              </div>
              <div className="px-2">
                <h4 className="text-lg font-bold mb-1 group-hover:text-primary-start transition-colors">{project.title}</h4>
                <p className="text-sm text-gray-500">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
};

const BlogSection = () => {
  const posts: BlogPost[] = [
    { 
      title: 'Design Conferences In 2022', 
      category: 'Design', 
      date: 'Feb 23, 2022', 
      description: 'Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
      image: 'https://picsum.photos/seed/conf/600/400'
    },
    { 
      title: 'Best Fonts Every Designer', 
      category: 'Design', 
      date: 'Feb 23, 2022', 
      description: 'Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.',
      image: 'https://picsum.photos/seed/fonts/600/400'
    },
    { 
      title: 'Design Digest #80', 
      category: 'Design', 
      date: 'Feb 23, 2022', 
      description: 'Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam.',
      image: 'https://picsum.photos/seed/digest/600/400'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-3xl font-bold mb-10 relative inline-block">
        Blog
        <div className="absolute -bottom-2 left-0 w-12 h-1.5 primary-gradient rounded-full" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-bg-card border border-border-dark rounded-3xl overflow-hidden group cursor-pointer"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span>{post.category}</span>
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <span>{post.date}</span>
              </div>
              <h4 className="text-xl font-bold mb-3 group-hover:text-primary-start transition-colors">{post.title}</h4>
              <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{post.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

const ContactSection = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/satishthakur7576@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-10"
    >
      <h2 className="text-3xl font-bold mb-8 relative inline-block">
        Contact
        <div className="absolute -bottom-2 left-0 w-12 h-1.5 primary-gradient rounded-full" />
      </h2>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl overflow-hidden h-80 border border-border-dark grayscale brightness-50 contrast-125"
      >
        <iframe 
          src="https://maps.google.com/maps?q=Jorhat,%20Assam&t=&z=13&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-8">Contact Form</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {status === 'success' && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl font-sm font-medium">
              Message sent! Check your email inbox to verify FormSubmit if this is the first ever send.
            </div>
          )}
          {status === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-sm font-medium">
              Something went wrong. Please email directly!
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              name="name"
              required
              placeholder="Full name" 
              className="w-full px-6 py-4 bg-transparent border border-border-dark rounded-2xl focus:outline-none focus:border-primary-start transition-colors"
            />
            <input 
              type="email" 
              name="email"
              required
              placeholder="Email address" 
              className="w-full px-6 py-4 bg-transparent border border-border-dark rounded-2xl focus:outline-none focus:border-primary-start transition-colors"
            />
          </div>
          <textarea 
            name="message"
            required
            placeholder="Your Message" 
            rows={5}
            className="w-full px-6 py-4 bg-transparent border border-border-dark rounded-2xl focus:outline-none focus:border-primary-start transition-colors resize-none"
          />
          <div className="flex justify-end">
            <motion.button 
              type="submit"
              disabled={status === 'submitting'}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center gap-2 px-8 py-4 primary-gradient text-bg-dark font-bold rounded-2xl hover:brightness-110 transition-all group shadow-lg active:shadow-none disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.section>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('About');

  const renderContent = () => {
    switch (activeTab) {
      case 'About': return <AboutSection />;
      case 'Resume': return <ResumeSection />;
      case 'Portfolio': return <PortfolioSection />;
      case 'Blog': return <BlogSection />;
      case 'Contact': return <ContactSection />;
    }
  };

  return (
    <HashRouter>
      <CursorGlow />
      <div className="min-h-screen py-8 lg:py-16 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start relative z-10 animate-gradient-slow">
        <Sidebar />
        
        <main className="flex-1 w-full bg-bg-card/40 backdrop-blur-xl border border-border-dark rounded-3xl flex flex-col min-h-[800px] relative shadow-2xl">
          <div className="lg:absolute lg:top-0 lg:right-0 z-10 w-full lg:w-auto">
            <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          <div className="p-8 lg:p-12 pt-12 lg:pt-24 flex-1">
            <AnimatePresence mode="wait">
              <div key={activeTab}>
                {renderContent()}
              </div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <Parallax offset={-100}>
          <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary-start/5 rounded-full blur-[120px]" />
        </Parallax>
        <Parallax offset={150}>
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-primary-end/5 rounded-full blur-[150px]" />
        </Parallax>
      </div>

      <AnimatePresence>
        <Routes>
          <Route path="/project/:projectId" element={<ProjectModal projects={PROJECTS} />} />
        </Routes>
      </AnimatePresence>
    </HashRouter>
  );
}
