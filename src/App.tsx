/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ThreeBackground } from './components/ThreeBackground';
import { 
  ArrowUpRight, 
  Mail, 
  Linkedin, 
  MapPin, 
  Box, 
  Cpu, 
  Zap,
  TrendingUp,
  Award,
  Database,
  Layout,
  Code
} from 'lucide-react';

// --- Types ---

interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  description: string;
  metrics?: { label: string, val: string }[];
  details?: string[];
  icon: React.ReactNode;
}

// --- Data ---

const EXPERIENCE: ExperienceItem[] = [
  {
    date: 'April 2026 — Present',
    title: 'Founder',
    company: 'AnomGrid',
    icon: <Box className="text-orange-500" />,
    description: 'Developing the failure intelligence layer for embodied AI. Building the logic that deciphers reality when model training runs out.',
    details: [
      'Architecting a specialized taxonomy for edge-case identification in unstructured environments.',
      'Developing data extraction protocols for mobile platforms (trucks, rickshaws).',
      'Engineering the "Negotiation Grammar" layer to transcribe unwritten rules of chaotic roads.'
    ],
    metrics: [{ label: 'Product', val: 'Anant' }]
  },
  {
    date: 'Jan 2026 — April 2026',
    title: 'Founding Team Member - Operations',
    company: 'Human Archive (YC W26)',
    icon: <Database className="text-sky-400" />,
    description: 'Built the first-ever high-fidelity "Multimodal Data Moat" for robotic foundation models from absolute zero. Led a cross-functional elite team of 16 across 7 cities, scaling RGB-D, tactile, and body-cam capture in high-chaos field environments. Engineered the entire hardware-to-cloud synchronization layer, directly enabling the proprietary technology that drove a $50 million valuation conversation.',
    details: [
      'Led team of 16 across 7 cities, managing high-chaos field data collection.',
      'Scaled RGB-D and tactile capture pipelines in zero-infrastructure zones.',
      'Engineered a hardware-to-cloud sync layer enabling $50M valuation discussions.',
      'Designed rugged enclosures for continuous logging in extreme field conditions.'
    ],
    metrics: [{ label: 'Valuation', val: '$50M' }, { label: 'Field Team', val: '16' }, { label: 'Cities', val: '7' }]
  },
  {
    date: 'Oct 2025 — Jan 2026',
    title: 'Founding Member Consultant',
    company: 'VentureLync',
    icon: <TrendingUp className="text-orange-400" />,
    description: 'Laid the initial operations framework for the investor–startup community. Coordinated early introductions and scaled SOP development.',
    details: [
      'Standardized the investor onboarding process for early cohorts.',
      'Built community engagement logic scaling to 1.0 release.',
      'Established operational KPIs for startup matching metrics.'
    ],
    metrics: [{ label: 'Hub', val: 'V1.0' }]
  },
  {
    date: 'Apr 2024 — Dec 2024',
    title: 'Operations Specialist',
    company: 'Springworks',
    icon: <Zap className="text-sky-400" />,
    description: 'Optimized operation excellence at scale. Managed 2,000+ verifications with near-perfect accuracy and high throughput.',
    details: [
      'Managed a verification funnel processing 2k+ records with 99% data integrity.',
      'Automated manual checks using structured operations logic.',
      'Maintained momentum during high-volume hiring seasons.'
    ],
    metrics: [{ label: 'Accuracy', val: '99%' }]
  }
];

const SKILLS = [
  { 
    category: "Operational Execution", 
    items: ["0→1 Deployment", "Hardware Logistics", "Human Capital Management", "High-Chaos Strategy"] 
  },
  { 
    category: "Technical Thinking", 
    items: ["Problem Decomposition", "Systems Architecture", "Crisis Management", "Operations Protocol"] 
  },
  { 
    category: "Deep Tech Ops", 
    items: ["Embodied AI Workflows", "Failure Data Mapping", "Technical Negotiation", "Infrastructure Resilience"] 
  },
  { 
    category: "Leadership", 
    items: ["Team Orchestration", "Stakeholder Relations", "Project Directorship", "Resource Optimization"] 
  }
];

const ACCOMPLISHMENTS = [
  { title: "Director, Hult Prize", subtitle: "Organized Global Chapter", icon: <TrendingUp className="text-indigo-500" /> },
  { title: "State Bronze Medal", subtitle: "IndiaSkills · Print Media", icon: <Award className="text-sky-400" /> },
  { title: "Winner, Dean's List", subtitle: "LPU Pitching Competition", icon: <Layout className="text-amber-500" /> }
];

const EDUCATION = [
  { name: "Lovely Professional University", degree: "B.Tech · Computer Science & Engineering", cgpa: "8.5 / 10", icon: <Code className="text-sky-500" /> },
  { name: "Amrita Vishwa Vidyapeetham", degree: "BBA · Business Administration", cgpa: "8.7 / 10", icon: <Layout className="text-orange-500" /> }
];

const ANANT_LAYERS = [
  { id: 'L1', title: 'Physical Signals', desc: 'Observable kinematics — position, velocity, gap acceptance, and deceleration profiles. The "what is happening" layer.' },
  { id: 'L2', title: 'Acoustic Signals', desc: 'Horn typology, sequence, and intensity envelopes synchronized to the visual track. The vocabulary of negotiation.' },
  { id: 'L3', title: 'Kinematic Intent', desc: 'Pre-movement micro-signals — sub-50cm creeps and lateral angles that signal claim or deference 1.5–3s before action.' },
  { id: 'L4', title: 'Social Hierarchy', desc: 'Implicit precedence structures — vehicle class, role, and locality. A graph of right-of-way priors.' },
  { id: 'L5', title: 'Contextual Modifiers', desc: 'Temporal and environmental states — weather, time-of-day, and local events that transform the meaning of every other layer.' }
];

// --- Sub-components ---

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = ['About', 'Story', 'Experience', 'AnomGrid', 'Competence', 'Contact'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'nav-blur py-3 md:py-4' : 'py-6 md:py-10 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 md:w-8 md:h-8 bg-[#8B5CF6] rounded-full flex items-center justify-center font-bold text-[10px] md:text-sm text-white shadow-[0_0_20px_#8B5CF6]/30 cursor-pointer"
          >
            DY
          </motion.div>
          <div className="font-bold text-[11px] xs:text-base md:text-lg tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-white uppercase font-mono">Deepak_Yadav</div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 z-[60] relative"
          aria-label="Toggle Menu"
        >
          <motion.div 
            animate={{ 
              rotate: mobileMenuOpen ? 45 : 0,
              y: mobileMenuOpen ? 8 : 0
            }}
            className="w-6 h-[2px] bg-white transition-all origin-center" 
          />
          <motion.div 
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
            className="w-6 h-[2px] bg-white transition-all" 
          />
          <motion.div 
            animate={{ 
              rotate: mobileMenuOpen ? -45 : 0,
              y: mobileMenuOpen ? -8 : 0
            }}
            className="w-6 h-[2px] bg-white transition-all origin-center" 
          />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {items.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold text-stone-500 hover:text-white transition-all uppercase tracking-[0.25em] md:tracking-[0.3em] font-mono relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8B5CF6] transition-all group-hover:w-full" />
            </a>
          ))}
          <div className="ml-2 lg:ml-4 pl-4 border-l border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-pulse shadow-[0_0_10px_#8B5CF6]" />
            <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">Live_State</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ opacity: 0, y: -20, clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#080112]/95 backdrop-blur-2xl z-50 flex flex-col justify-center items-center p-8 gap-10"
          >
            {items.map((item, i) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter hover:text-[#8B5CF6] transition-colors"
              >
                {item}
              </motion.a>
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              <div className="text-[10px] font-mono tracking-[0.5em] uppercase text-[#8B5CF6]">DEEPAK_YADAV // OPS</div>
              <div className="flex gap-6">
                <a href="mailto:deepak@anomgrid.com"><Mail size={20} className="text-white" /></a>
                <a href="https://linkedin.com"><Linkedin size={20} className="text-white" /></a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ label, title }: { label: string, title: string }) => (
  <div className="mb-10 md:mb-20">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      className="inline-block px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] text-[9px] font-bold rounded-sm mb-6 uppercase tracking-[0.3em] border border-[#8B5CF6]/20"
    >
      {label}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay: 0.1 }}
      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.95]"
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="relative min-h-screen bg-[#080112] text-white selection:bg-[#FF9933]">
      <ThreeBackground />
      <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent z-[100]" />
      
      <Nav />

      {/* 1. HERO */}
      <section id="about" className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-20 px-4 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 w-full mb-12 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 rounded-full border border-white/10 mb-6 md:mb-10 backdrop-blur-xl">
               <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_15px_#8B5CF6]" />
               <span className="text-[8px] md:text-[10px] font-mono text-[#8B5CF6] font-bold uppercase tracking-widest leading-none">FOUNDER & OPERATOR // DEEP_TECH_OPS</span>
            </div>
            
            <h1 className="text-4xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-bold leading-[0.85] tracking-tighter mb-10 md:mb-16 perspective-1000">
              <motion.span 
                className="block text-white"
                initial={{ opacity: 0, rotateX: 30 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                The <span className="text-[#8B5CF6]">0→1 Operator</span>
              </motion.span>
              <motion.span 
                className="block text-white/40"
                initial={{ opacity: 0, rotateX: 30 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                for Embodied AI.
              </motion.span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
              <div className="md:col-span-7">
                <p className="text-lg sm:text-2xl md:text-3xl font-light text-stone-300 leading-snug">
                  I am a hands-on operator who orchestrates <span className="text-white font-bold decoration-[#8B5CF6] underline underline-offset-8">human capital and hardware</span> within some of the most chaotic environments on earth.
                </p>
              </div>
              <div className="md:col-span-5 flex flex-wrap gap-4 md:justify-end">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="group relative w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-[#8B5CF6] blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  <span className="relative px-6 py-4 md:px-8 md:py-4 bg-white/5 border border-white/10 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#8B5CF6] rounded-lg backdrop-blur-xl flex items-center justify-center gap-2">
                    <Zap size={14} /> Founder & Operator
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#8B5CF6] to-transparent animate-pulse" />
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-stone-500">Navigation Protocol</span>
        </motion.div>
      </section>
      {/* 2. STORY */}
      <section id="story" className="section-padding relative overflow-hidden scroll-mt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#8B5CF6]/5 blur-[200px] pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto relative z-10 px-4 md:px-0">
          <SectionHeader label="Origins" title="Building for Resilience." />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8 md:space-y-10 text-lg sm:text-xl md:text-2xl text-stone-300 leading-relaxed font-light"
          >
            <p>
              I am Deepak Yadav, from Nangtihari, a small village in Haryana. Growing up in an agricultural family, I learned that the soil only respects persistence. This foundation stayed with me when I dropped out of mechanical engineering and started a food cart with friends, only to see it wiped out by COVID.
            </p>
            <p>
              While the world stopped, I doubled down and finished two degrees simultaneously. I moved into operations at Springworks, but was suddenly grounded by a life-threatening diagnosis of <span className="text-[#8B5CF6] font-bold">polycythemia</span>. My hemoglobin reached critical levels, and for three months, I fought just to survive.
            </p>
            <p>
              Bedridden, I prepared for the RBI Grade B exam and missed the final cut-off by 1.25 marks. That failure became my operational DNA: you don't stop when you're hurt; you stop when you're done.
            </p>
            <p>
              Life today is a recursion of documenting raw human experience in a digital archive and mapping the failure intelligence of embodied AI through AnomGrid. I build systems that thrive where others break.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. EXPERIENCE */}
      <section id="experience" className="section-padding scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <SectionHeader label="System_Logs" title="Execution_History." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            {EXPERIENCE.map((exp, idx) => {
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="tech-card p-8 md:p-14 group transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-10 md:mb-14">
                    <div className="p-4 md:p-5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-500 shadow-2xl">
                      {React.cloneElement(exp.icon as React.ReactElement, { className: 'w-6 h-6 md:w-7 md:h-7' })}
                    </div>
                    <span className="text-[9px] md:text-[10px] font-mono font-bold text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-3 py-1 md:px-4 md:py-1.5 rounded-full tracking-[0.15em] md:tracking-[0.2em] uppercase">{exp.date}</span>
                  </div>
 
                  <div className="space-y-3 mb-8 md:mb-10">
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-none group-hover:text-[#8B5CF6] transition-colors">{exp.company}</h3>
                    <div className="text-sky-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] font-mono">{exp.title}</div>
                  </div>
 
                  <p className="text-stone-400 text-base md:text-xl leading-relaxed mb-10 md:mb-12 font-light line-clamp-4 md:line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                    {exp.description}
                  </p>
 
                  <div className="grid grid-cols-2 gap-6 md:gap-8 pt-8 md:pt-10 border-t border-white/5 items-center">
                    {exp.metrics && exp.metrics.map(m => (
                      <div key={m.label} className="space-y-1">
                        <div className="text-[8px] md:text-[9px] uppercase font-black text-stone-600 tracking-[0.2em] md:tracking-[0.3em] font-mono">{m.label}</div>
                        <div className="text-xl md:text-2xl font-black text-white italic leading-none">{m.val}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ANOMGRID */}
      <section id="anomgrid" className="section-padding relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 w-full px-4 md:px-0">
          <SectionHeader label="System Intelligence" title="AnomGrid." />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-16">
                  <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 md:mb-10 leading-tight text-white tracking-tighter uppercase italic">
                    The <span className="text-[#8B5CF6]">Intelligence Layer</span>.
                  </h3>
                  <p className="text-lg md:text-2xl font-light text-stone-300 leading-relaxed max-w-2xl">
                    AnomGrid is the intelligence layer for when AI meets reality. Models break where reality refuses to behave. We work in that gap — the layer beneath every embodied AI for the moments their training never saw.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B5CF6] via-[#8B5CF6]/50 to-transparent" />
                  <div className="pl-8">
                    <div className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#8B5CF6] mb-8">CASE_STUDY // ANANT</div>
                    <h4 className="text-2xl md:text-4xl font-black mb-6 text-white italic tracking-tight uppercase">Anant: Unstructured Road Protocol</h4>
                    <p className="text-stone-400 text-base md:text-lg leading-relaxed mb-10 font-light max-w-xl">
                      Anant is our entry into the largest unmapped territory in autonomous mobility — the unstructured road. We map the implicit grammar that decides who proceeds at every uncontrolled intersection on Earth.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <div className="p-5 md:p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#8B5CF6]/30 transition-colors tech-card">
                        <div className="text-3xl md:text-4xl font-black text-white italic leading-none mb-2">200hr+</div>
                        <div className="text-[9px] uppercase font-bold text-stone-500 tracking-[0.15em]">Validated_Field_Data</div>
                      </div>
                      <div className="p-5 md:p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#8B5CF6]/30 transition-colors tech-card">
                        <div className="text-3xl md:text-4xl font-black text-white italic leading-none mb-2">Dual</div>
                        <div className="text-[9px] uppercase font-bold text-stone-500 tracking-[0.15em]">Audio_Visual_Stream</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4 md:space-y-4"
              >
                <div className="text-[10px] font-mono tracking-[0.3em] text-stone-600 mb-6 uppercase">// The_Five_Layers</div>
                {ANANT_LAYERS.map((fact, i) => (
                  <motion.div 
                    key={fact.id} 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: -5 }}
                    className="p-6 md:p-8 tech-card group flex gap-5 md:gap-8 items-center bg-white/[0.02]"
                  >
                    <span className="text-3xl md:text-4xl font-black text-[#8B5CF6]/10 italic font-mono group-hover:text-[#8B5CF6]/40 transition-colors">{fact.id}</span>
                    <div>
                      <h5 className="font-bold text-lg md:text-xl mb-1 text-white tracking-tight uppercase group-hover:text-[#8B5CF6] transition-colors">{fact.title}</h5>
                      <p className="text-xs md:text-sm text-stone-500 font-light leading-snug">{fact.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPETENCE */}
      <section id="competence" className="section-padding scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <SectionHeader label="Competence" title="Skillset & Recognition." />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-12 md:mb-24">
            <div className="p-6 md:p-14 bg-black/40 border-b lg:border-b-0 lg:border-r border-[#8B5CF6]/10">
              <h3 className="text-xl font-bold text-white mb-8 md:mb-12 border-l-4 border-[#8B5CF6] pl-5 md:pl-6 uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none">Key Accomplishments</h3>
              <div className="space-y-4 md:space-y-6">
                {ACCOMPLISHMENTS.map(a => (
                  <motion.div 
                    key={a.title} 
                    whileHover={{ x: 8 }}
                    className="flex gap-4 md:gap-8 items-center p-5 md:p-8 tech-card bg-white/[0.02]"
                  >
                     <div className="p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl text-[#8B5CF6] shadow-lg shrink-0">{a.icon}</div>
                     <div>
                       <div className="font-bold text-white text-base md:text-xl italic tracking-tight">{a.title}</div>
                       <div className="text-[10px] md:text-sm text-stone-500 font-mono uppercase tracking-[0.15em] md:tracking-widest mt-1">{a.subtitle}</div>
                     </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-14 bg-black/40">
              <h3 className="text-xl font-bold text-white mb-8 md:mb-12 border-l-4 border-sky-400 pl-5 md:pl-6 uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none">Academic Foundation</h3>
              <div className="space-y-4 md:space-y-6">
                {EDUCATION.map(e => (
                  <motion.div 
                    key={e.name} 
                    whileHover={{ x: 8 }}
                    className="flex gap-4 md:gap-8 items-center p-4 md:p-8 tech-card bg-white/[0.02]"
                  >
                     <div className="p-2.5 md:p-4 bg-white/5 rounded-lg md:rounded-2xl text-sky-400 shadow-lg shrink-0">{e.icon}</div>
                     <div className="min-w-0 flex-1">
                       <div className="font-bold text-white text-sm md:text-xl italic tracking-tight leading-tight mb-1">{e.name}</div>
                       <div className="text-[10px] md:text-sm text-stone-500 mb-1.5 md:mb-2">{e.degree}</div>
                       <div className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-widest rounded-sm">Score: {e.cgpa}</div>
                     </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-3xl">
            {SKILLS.map((group, idx) => (
              <motion.div 
                key={group.category} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(139,92,246,0.05)' }}
                className="p-8 md:p-12 bg-black/20 group relative overflow-hidden"
              >
                <div className="text-[10px] font-mono font-bold text-stone-700 mb-8 md:mb-10 uppercase tracking-[0.3em] md:tracking-[0.4em]">
                  STACK_0{idx + 1}
                </div>
                <h4 className="text-xl md:text-2xl font-black text-white mb-8 md:mb-10 transition-colors leading-none group-hover:text-[#8B5CF6] italic uppercase">{group.category}</h4>
                <div className="space-y-4">
                   {group.items.map(s => (
                     <div key={s} className="text-stone-400 text-xs md:text-sm font-light flex items-center justify-between group/item py-1">
                       <span className="group-hover/item:text-white transition-colors tracking-tight pr-2">{s}</span>
                       <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-[#8B5CF6] rounded-full opacity-0 group-hover/item:opacity-100 transition-all scale-0 group-hover/item:scale-100 shadow-[0_0_10px_#8B5CF6]" />
                     </div>
                   ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT */}
      <section id="contact" className="section-padding bg-[#080112] scroll-mt-20">
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-7xl mx-auto rounded-[2rem] md:rounded-[3rem] p-8 sm:p-20 md:p-32 bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#8B5CF6]/5 to-sky-500/5 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8B5CF6]/10 blur-[120px] rounded-full animate-pulse" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
               <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 md:mb-10 tracking-tighter text-white leading-[0.9]">Let's map the <br/> <span className="text-[#8B5CF6] italic">Future Layer</span>.</h2>
               <p className="text-lg md:text-2xl text-stone-400 font-light leading-relaxed max-w-xl mb-12 md:mb-16">
                 Exploring the intersections of embodied AI, human archiving, and operational excellence. Reach out for collaborations or deep-dives.
               </p>
               <div className="space-y-4 md:space-y-8">
                  <a href="mailto:deepak@anomgrid.com" className="group flex items-center gap-4 md:gap-6 text-base sm:text-2xl md:text-3xl font-bold hover:text-[#8B5CF6] transition-all overflow-hidden">
                    <div className="p-2.5 md:p-4 bg-white/5 rounded-lg md:rounded-2xl border border-white/10 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all shadow-xl shrink-0">
                      <Mail size={18} className="md:w-8 md:h-8" />
                    </div>
                    <span className="truncate">deepak@anomgrid.com</span>
                  </a>
                  <a href="mailto:deepakdsy25@gmail.com" className="group flex items-center gap-4 md:gap-6 text-base sm:text-2xl md:text-3xl font-bold hover:text-[#8B5CF6] transition-all overflow-hidden">
                    <div className="p-2.5 md:p-4 bg-white/5 rounded-lg md:rounded-2xl border border-white/10 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all shadow-xl shrink-0">
                      <Mail size={18} className="md:w-8 md:h-8" />
                    </div>
                    <span className="truncate">deepakdsy25@gmail.com</span>
                  </a>
               </div>
            </div>

            <div className="flex flex-col gap-8 md:gap-10 items-center lg:items-end">
              <a href="https://linkedin.com" target="_blank" className="p-8 md:p-10 tech-card hover:bg-[#8B5CF6] hover:text-white transition-all group rounded-full shadow-[0_0_50px_rgba(139,92,246,0.2)]">
                <Linkedin size={36} className="md:w-12 md:h-12" />
              </a>
              
              <div className="mt-8 md:mt-12 text-center lg:text-right">
                 <div className="text-[10px] md:text-xs font-mono tracking-[0.3em] md:tracking-[0.5em] font-black uppercase text-[#8B5CF6] mb-3 italic">Deepak Yadav // Operations Lab</div>
                 <div className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase text-stone-500">© 2026 BUILDING_FOR_RESILIENCE</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 flex justify-center opacity-10 px-6">
        <div className="font-mono text-[7px] md:text-[8px] tracking-[0.4em] md:tracking-[1em] uppercase text-stone-500 text-center">SYSTEM.OPERATOR_v0.3_STABLE</div>
      </footer>
    </div>
  );
}
