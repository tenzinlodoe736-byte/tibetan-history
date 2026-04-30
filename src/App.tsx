/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Map, 
  Palette, 
  Info, 
  ChevronRight, 
  Keyboard,
  Mountain,
  Waves,
  History,
  Languages,
  Menu,
  X,
  Plus
} from 'lucide-react';

function EndlessKnot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 10 L65 25 L50 40 L35 25 Z" />
      <path d="M35 25 L20 40 L35 55 L50 40" />
      <path d="M65 25 L80 40 L65 55 L50 40" />
      <path d="M35 55 L20 70 L35 85 L50 70 Z" />
      <path d="M65 55 L80 70 L65 85 L50 70 Z" />
      <path d="M50 40 L65 55 L50 70 L35 55 Z" />
    </svg>
  );
}

// Components (defined inline for simplicity or imported if needed)
// I will split them into sections for easier management.

type Section = 'home' | 'language' | 'culture' | 'geography' | 'arts';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Info },
    { id: 'language', label: 'Language', icon: TextIcon },
    { id: 'culture', label: 'Culture', icon: History },
    { id: 'geography', label: 'Geography', icon: Mountain },
    { id: 'arts', label: 'Arts', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-background text-text font-serif selection:bg-accent/30 pattern-endless-knot">
      {/* Decorative Side Accents */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center opacity-20 pointer-events-none">
        <div className="[writing-mode:vertical-rl] text-[10px] font-sans font-bold tracking-[0.5em] uppercase text-primary">བཀྲ་ཤིས་བདེ་ལེགས།</div>
        <EndlessKnot className="w-8 h-8 text-primary" />
        <div className="[writing-mode:vertical-rl] text-[10px] font-sans font-bold tracking-[0.5em] uppercase text-primary">ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ།</div>
      </div>
      <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center opacity-20 pointer-events-none">
        <div className="[writing-mode:vertical-rl] text-[10px] font-sans font-bold tracking-[0.5em] uppercase text-primary">ཤེས་རབ་དང་སྙིང་རྗེ།</div>
        <EndlessKnot className="w-8 h-8 text-primary" />
        <div className="[writing-mode:vertical-rl] text-[10px] font-sans font-bold tracking-[0.5em] uppercase text-primary">ཞི་བདེ།</div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b-2 border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                བོད
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-text leading-none uppercase">KHA-TAK</span>
                <span className="text-[10px] font-sans text-muted uppercase tracking-widest italic">Wisdom Portal</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-sans font-semibold uppercase tracking-wider">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as Section)}
                  className={`flex items-center gap-2 transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary border-b-2 border-primary pb-1' : 'text-muted'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Nav Toggle */}
            <button className="md:hidden p-2 text-[#6D5C54]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#FDFBF7] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as Section);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 text-xl font-medium ${
                    activeSection === item.id ? 'text-[#800000]' : 'text-[#6D5C54]'
                  }`}
                >
                  <item.icon size={24} />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'home' && <HomeSection onNavigate={setActiveSection} />}
            {activeSection === 'language' && <LanguageSection />}
            {activeSection === 'culture' && <CultureSection />}
            {activeSection === 'geography' && <GeographySection />}
            {activeSection === 'arts' && <ArtsSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-text text-background/60 px-10 py-12 text-[10px] font-sans uppercase tracking-[0.2em]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-lg font-bold">
                བོད
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white uppercase">KHA-TAK</span>
            </div>
            <p className="text-sm opacity-70 text-center md:text-left max-w-xs lowercase">
              Dedicated to preserving and sharing the profound wisdom and beauty of Tibetan culture.
            </p>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#" className="hover:text-white transition-colors">Resources</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Community</a>
            <span className="text-accent ml-4 hidden sm:inline">བོད་སྐད། Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TextIcon({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
    </svg>
  );
}

// --- SECTIONS ---

function HomeSection({ onNavigate }: { onNavigate: (section: Section) => void }) {
  const cards = [
    {
      id: 'language',
      title: 'Tibetan Script',
      desc: 'Master the Uchen script through interactive typing lessons.',
      icon: Keyboard,
      color: 'bg-primary/10 text-primary',
    },
    {
      id: 'culture',
      title: 'Heritage & History',
      desc: 'Explore the vast timeline of the Tubo Empire and traditional festivals.',
      icon: History,
      color: 'bg-accent/10 text-accent',
    },
    {
      id: 'geography',
      title: 'Roof of the World',
      desc: 'Discover the mighty peaks of Chomolungma and the sacred rivers.',
      icon: Mountain,
      color: 'bg-muted/10 text-muted',
    },
    {
      id: 'arts',
      title: 'Sacred Arts',
      desc: 'From Thangka painting to intricate sand mandalas.',
      icon: Palette,
      color: 'bg-primary/20 text-text',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <div className="grid md:grid-template-columns-[1.2fr_1fr] gap-12 items-center mb-24">
        <div>
          <div className="flex items-center gap-4 mb-6">
             <div className="h-px w-12 bg-primary"></div>
             <span className="text-[10px] font-sans font-bold text-primary uppercase tracking-[0.4em]">Wisdom of the Ages</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-text mb-6 uppercase tracking-tight">
            Discover the <span className="text-primary italic">Wisdom</span> of the Plateau.
          </h1>
          <p className="text-lg font-sans text-muted mb-8 leading-relaxed max-w-xl italic">
            Tibet is more than a place; it is a profound heritage of language, art, and spirituality. Start your journey into the heart of Central Asia.
          </p>
          <div className="flex flex-wrap gap-4 uppercase font-sans font-bold text-xs tracking-widest">
            <button 
              onClick={() => onNavigate('language')}
              className="px-8 py-4 bg-primary text-white rounded-full hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              Start Learning <ChevronRight size={16} />
            </button>
            <button 
              onClick={() => onNavigate('geography')}
              className="px-8 py-4 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Explore Geography
            </button>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-accent rounded-[32px] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative aspect-square rounded-[32px] overflow-hidden shadow-sm border border-border bg-white p-4">
            <div className="absolute inset-0 m-4 rounded-[24px] overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1544391682-171ef07f7f8f?auto=format&fit=crop&q=80&w=800" 
                 alt="Potala Palace" 
                 className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-text/40 flex items-center justify-center p-12 text-center text-white">
                 <div>
                   <div className="text-7xl mb-4 font-bold opacity-20">བཀྲ་ཤིས་བདེ་ལེགས།</div>
                   <h2 className="text-3xl font-serif font-bold italic mb-2 tracking-tight">Tashi Delek</h2>
                   <p className="text-xs font-sans uppercase tracking-[0.3em] opacity-80 italic">Auspicious Blessings</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id as Section)}
            className="bg-white p-8 rounded-[32px] border border-border text-left shadow-sm hover:shadow-md transition-all group"
          >
            <div className={`w-14 h-14 ${card.color} rounded-full flex items-center justify-center mb-6 border border-border/50 group-hover:scale-110 transition-transform`}>
              <card.icon size={24} />
            </div>
            <h3 className="text-lg font-bold mb-3 uppercase border-l-4 border-accent pl-3">{card.title}</h3>
            <p className="text-sm font-sans text-muted mb-4 line-clamp-2">{card.desc}</p>
            <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
              Discover <span>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function LanguageSection() {
  const [typedChars, setTypedChars] = useState('');
  const [practicedChars, setPracticedChars] = useState<Set<string>>(new Set());
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizState, setQuizState] = useState<{
    currentQuestion: number;
    score: number;
    options: string[];
    answer: string;
    showResult: boolean;
    isCorrect: boolean | null;
  } | null>(null);

  const alphabet = [
    { char: 'ཀ', roma: 'ka', meaning: 'Standard K sound' },
    { char: 'ཁ', roma: 'kha', meaning: 'Aspirated K sound' },
    { char: 'ག', roma: 'ga', meaning: 'Voiced G/K sound' },
    { char: 'ང', roma: 'nga', meaning: 'Nasal NG sound' },
    { char: 'ཅ', roma: 'ca', meaning: 'Standard CH sound' },
    { char: 'ཆ', roma: 'cha', meaning: 'Aspirated CH sound' },
    { char: 'ཇ', roma: 'ja', meaning: 'Voiced J sound' },
    { char: 'ཉ', roma: 'nya', meaning: 'Nasal NY sound' },
  ];

  const startQuiz = () => {
    const randomIdx = Math.floor(Math.random() * alphabet.length);
    const correct = alphabet[randomIdx];
    
    // Generate distractors
    const others = alphabet.filter(a => a.char !== correct.char);
    const distractors = others.sort(() => 0.5 - Math.random()).slice(0, 3).map(a => a.roma);
    const options = [...distractors, correct.roma].sort(() => 0.5 - Math.random());

    setQuizState({
      currentQuestion: 1,
      score: 0,
      options,
      answer: correct.roma,
      showResult: false,
      isCorrect: null
    });
    setIsQuizMode(true);
  };

  const handleQuizAnswer = (selected: string) => {
    if (!quizState || quizState.showResult) return;

    const isCorrect = selected === quizState.answer;
    setQuizState(prev => prev ? {
      ...prev,
      isCorrect,
      showResult: true,
      score: isCorrect ? prev.score + 1 : prev.score
    } : null);
  };

  const nextQuestion = () => {
    const randomIdx = Math.floor(Math.random() * alphabet.length);
    const correct = alphabet[randomIdx];
    const others = alphabet.filter(a => a.char !== correct.char);
    const distractors = others.sort(() => 0.5 - Math.random()).slice(0, 3).map(a => a.roma);
    const options = [...distractors, correct.roma].sort(() => 0.5 - Math.random());

    setQuizState(prev => prev ? {
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      options,
      answer: correct.roma,
      showResult: false,
      isCorrect: null
    } : null);
  };

  const handleCharClick = (char: string) => {
    setTypedChars(prev => prev + char);
    setPracticedChars(prev => {
      const next = new Set(prev);
      next.add(char);
      return next;
    });
  };

  const progress = Math.round((practicedChars.size / alphabet.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-background border border-border text-muted rounded-full text-[10px] font-sans font-bold tracking-widest uppercase mb-6">
          <Languages size={14} /> LANGUAGE LAB
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 uppercase tracking-tight">Tibetan Script</h2>
        <p className="text-lg font-sans text-muted italic">Learn the foundation of the sacred language through practice.</p>
      </div>

      {!isQuizMode ? (
        <>
          <div className="bg-white rounded-[32px] p-10 shadow-sm border border-border mb-12">
            <div className="mb-12 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1 w-full sm:w-auto">
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[10px] font-sans font-bold text-muted uppercase tracking-[0.2em]">Learning Progress</label>
                  <span className="text-xs font-bold text-primary">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border/30">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary"
                  />
                </div>
                <p className="text-[9px] font-sans text-muted mt-2 uppercase tracking-widest">
                  {practicedChars.size} of {alphabet.length} basic consonants mastered
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-4 py-3 bg-accent/10 rounded-2xl border border-accent/20">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
                    ★
                  </div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-tight leading-tight">
                    Daily Goal<br/><span className="text-muted">4 Characters</span>
                  </div>
                </div>
                <button 
                  onClick={startQuiz}
                  className="px-6 py-3 bg-text text-white rounded-full text-xs font-sans font-bold uppercase tracking-widest hover:bg-primary transition-colors"
                >
                  Take Quiz
                </button>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[10px] font-sans font-bold text-muted uppercase tracking-widest block mb-4">Practice Workspace</label>
              <div className="min-h-[140px] bg-background border-2 border-dashed border-accent/30 rounded-[24px] flex items-center justify-center text-7xl text-primary font-bold shadow-inner relative">
                <AnimatePresence>
                  {typedChars ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-wrap items-center justify-center gap-1"
                    >
                      {typedChars.split('').map((c, i) => (
                        <motion.span 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {c}
                        </motion.span>
                      ))}
                    </motion.div>
                  ) : (
                    <span className="opacity-20">...</span>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <div className="w-2 h-2 rounded-full bg-border"></div>
                  <div className="w-2 h-2 rounded-full bg-border"></div>
                </div>
                <button 
                  onClick={() => setTypedChars('')}
                  className="text-[10px] font-sans font-bold text-primary uppercase tracking-widest hover:underline"
                >
                  Reset Session
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {alphabet.map((item) => (
                <button
                  key={item.char}
                  onClick={() => handleCharClick(item.char)}
                  className={`aspect-square border rounded-xl flex flex-col items-center justify-center transition-all group cursor-pointer ${
                    practicedChars.has(item.char) 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                      : 'bg-background border-border hover:bg-primary/5 hover:border-primary'
                  }`}
                >
                  <span className="text-3xl font-bold">{item.char}</span>
                  <span className={`text-[9px] font-sans mt-1 uppercase tracking-tighter opacity-50 ${practicedChars.has(item.char) ? 'text-white' : ''}`}>
                    {item.roma}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-border mb-12">
          <div className="flex justify-between items-center mb-12">
            <button 
              onClick={() => setIsQuizMode(false)}
              className="text-[10px] font-sans font-bold text-muted uppercase tracking-widest hover:text-primary"
            >
              ← Back to Practice
            </button>
            <div className="px-4 py-1 bg-primary text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
              Score: {quizState?.score}
            </div>
          </div>

          <div className="text-center py-12">
            <span className="text-[10px] font-sans text-muted uppercase tracking-[0.3em] font-bold block mb-4">Question {quizState?.currentQuestion}</span>
            <div className="text-9xl font-bold text-text mb-12">
              {alphabet.find(a => a.roma === quizState?.answer)?.char}
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              {quizState?.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleQuizAnswer(opt)}
                  disabled={quizState.showResult}
                  className={`py-6 rounded-2xl border-2 font-bold text-xl transition-all ${
                    quizState.showResult
                      ? opt === quizState.answer
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg scale-105'
                        : opt === quizState.isCorrect ? '' : 'opacity-40 border-border grayscale'
                      : 'bg-background border-border hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizState?.showResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12"
              >
                <p className={`text-sm font-bold mb-6 ${quizState.isCorrect ? 'text-emerald-600' : 'text-primary'}`}>
                  {quizState.isCorrect ? 'Excellent! བཀྲ་ཤིས་བདེ་ལེགས།' : `Not quite. The correct answer was ${quizState.answer}.`}
                </p>
                <button 
                  onClick={nextQuestion}
                  className="px-10 py-4 bg-primary text-white rounded-full text-xs font-sans font-bold uppercase tracking-widest hover:shadow-xl transition-all"
                >
                  Next Question
                </button>
              </motion.div>
            )}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-border p-8 rounded-[32px]">
          <h4 className="text-sm font-sans font-bold mb-6 flex items-center gap-2 uppercase tracking-widest border-l-4 border-accent pl-3">
             Typing Guide
          </h4>
          <ul className="space-y-4 text-xs font-sans text-muted">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Tibetan is written from left to right, maintaining horizontal flow.
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Consonants are the core, with vowels as diacritics above or below.
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Modern digital keyboards often utilize Wylie transliteration.
            </li>
          </ul>
        </div>
        <div className="bg-text text-background p-8 rounded-[32px] shadow-xl">
          <h4 className="text-sm font-sans font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-accent border-l-4 border-accent pl-3">
            Heritage Fact
          </h4>
          <p className="text-sm font-serif italic leading-relaxed opacity-90 mb-4">
            "The Tibetan script was created during the 7th century under King Songtsen Gampo, modeled after ancient Brahmi scripts to facilitate the translation of Buddhist texts."
          </p>
          <div className="text-[10px] font-sans uppercase tracking-widest flex justify-between">
            <span>Historical Archive</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CultureSection() {
  const events = [
    { year: '7th Century', title: 'The Tubo Empire', desc: 'Songtsen Gampo unified the plateau and introduced the first script.' },
    { year: '8th Century', title: 'Samye Monastery', desc: 'Inaugurated the first grand Buddhist academy on the high plains.' },
    { year: '17th Century', title: 'Potala Palace', desc: 'The architectural crown of Lhasa began its current grand construction.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12">
      <div className="flex flex-col md:flex-row gap-16 mb-24 items-center">
        <div className="flex-1">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-background border border-border text-primary rounded-full text-[10px] font-sans font-bold tracking-widest uppercase mb-6">
            <History size={14} /> CULTURAL HERITAGE
          </div>
          <h2 className="text-5xl font-serif font-bold mb-6 leading-tight uppercase tracking-tight">Ancient <span className="text-primary">Traditions.</span></h2>
          <p className="text-lg font-sans text-muted mb-12 leading-relaxed italic border-l-4 border-border pl-6">
            Tibetan culture is an enduring tapestry of resilience, spirituality, and harmony with the elements. Every ritual is a bridge to the past.
          </p>
          
          <div className="space-y-10">
            {events.map((e, idx) => (
              <div key={idx} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  {idx !== events.length - 1 && <div className="w-px h-full bg-border my-2"></div>}
                </div>
                <div>
                  <div className="text-[9px] font-sans font-bold text-accent uppercase tracking-[0.2em] mb-1">{e.year}</div>
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">{e.title}</h4>
                  <p className="text-sm font-sans text-muted leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-6">
          <div className="bg-white rounded-[32px] border border-border p-8 flex flex-col justify-between aspect-[4/5] shadow-sm transform hover:-rotate-1 transition-transform overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&q=80&w=400" 
              alt="Prayer Flags" 
              className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <div className="text-3xl font-serif font-bold text-primary uppercase tracking-tighter">Losar</div>
              <p className="text-xs font-sans text-muted uppercase tracking-widest mt-4">Tibetan New Year</p>
            </div>
            <p className="relative z-10 text-sm font-serif italic mt-auto opacity-70">A grand celebration of rebirth, involving family feasts and monastic dances.</p>
          </div>
          <div className="bg-accent rounded-[32px] p-8 flex flex-col justify-between aspect-[4/5] text-text shadow-sm transform hover:rotate-1 transition-transform overflow-hidden relative group">
             <div className="absolute inset-0 bg-[#A52A2A]/20"></div>
             <div className="relative z-10">
              <div className="text-3xl font-serif font-bold uppercase tracking-tighter">Butter Tea</div>
              <p className="text-xs font-sans text-text/50 uppercase tracking-widest mt-4">Po Cha</p>
            </div>
            <p className="relative z-10 text-sm font-serif italic mt-auto opacity-80 font-bold">The life-blood of the plateau, providing heat and sustenance in thin air.</p>
          </div>
          <div className="col-span-2 bg-text rounded-[32px] p-10 text-background flex flex-col gap-4 relative overflow-hidden shadow-xl group">
            <img 
              src="https://images.unsplash.com/photo-1596464522924-4db23984524c?auto=format&fit=crop&q=80&w=800"
              alt="Plateau Landscape"
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <h4 className="text-2xl font-serif font-bold uppercase tracking-tight text-accent">Drokpa Wisdom</h4>
              <p className="text-sm font-serif italic opacity-80 leading-relaxed max-w-lg">
                Nomadic shepherds have navigated these star-lit plains for millennia. Their relationship with the Yak is the cornerstone of high-altitude survival.
              </p>
              <div className="flex items-center gap-2 text-[9px] font-sans uppercase tracking-[0.3em] text-accent mt-4">
                <span>View Nomad Gallery</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeographySection() {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('utsang');

  const regionsData: Record<string, { 
    name: string, 
    tibetan: string,
    cities: string[], 
    features: string[], 
    significance: string,
    color: string 
  }> = {
    utsang: {
      name: 'U-Tsang',
      tibetan: 'དབུས་གཙང་',
      cities: ['Lhasa', 'Shigatse', 'Gyantse'],
      features: ['Potala Palace', 'Jokhang Temple', 'Yamdrok Lake'],
      significance: 'The cultural and religious heart of Tibet. Historically the administrative center, home to the most sacred monasteries and the seat of several Dalai Lamas.',
      color: '#A52A2A'
    },
    amdo: {
      name: 'Amdo',
      tibetan: 'ཨ་མདོ་',
      cities: ['Xining (Ziling)', 'Labrang', 'Rebkong'],
      features: ['Qinghai Lake (Koko Nor)', 'Birthplace of the 14th Dalai Lama', 'Vast Northern Grasslands'],
      significance: 'Renowned for its vast grasslands and nomadic lifestyle. It is a major center for Buddhist learning and the birthplace of many great scholars.',
      color: '#D4AF37'
    },
    kham: {
      name: 'Kham',
      tibetan: 'ཁམས་',
      cities: ['Chamdo', 'Kandze', 'Derge'],
      features: ['Hengduan Mountain Gorges', 'Derge Printing House', 'Rugged Alpine Valleys'],
      significance: 'Known for its rugged geography and the fierce, independent spirit of its warriors. It is a region of immense biological and cultural diversity.',
      color: '#2D241E'
    }
  };

  const currentRegion = regionsData[selectedRegionId];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-background border border-border text-muted rounded-full text-[10px] font-sans font-bold tracking-widest uppercase mb-6">
          <Map size={14} /> GEOGRAPHIC ARCHIVE
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 uppercase tracking-tight">The Three Regions</h2>
        <p className="text-lg font-sans text-muted max-w-2xl mx-auto italic">Tibet is traditionally divided into three main provinces: U-Tsang, Kham, and Amdo.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 mb-16">
        <div className="lg:col-span-3 bg-white rounded-[40px] p-10 border border-border shadow-sm flex items-center justify-center relative min-h-[500px] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1524225576761-4606992ce589?auto=format&fit=crop&q=80&w=800" 
            alt="Tibetan Landscape Map Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-4 rounded-[32px] border border-dashed border-border pointer-events-none"></div>
          
          <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 500 300" className="w-full max-w-lg drop-shadow-2xl">
              {/* U-Tsang (West/Center) */}
              <motion.path
                d="M50 150 L100 100 L250 100 L280 200 L200 250 L100 220 Z"
                fill={selectedRegionId === 'utsang' ? '#A52A2A' : '#F5F2ED'}
                stroke="#E6E0D4"
                strokeWidth="2"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedRegionId('utsang')}
                className="cursor-pointer transition-colors duration-300"
              />
              {/* Amdo (North East) */}
              <motion.path
                d="M250 100 L400 40 L450 120 L300 150 L280 100 Z"
                fill={selectedRegionId === 'amdo' ? '#D4AF37' : '#F5F2ED'}
                stroke="#E6E0D4"
                strokeWidth="2"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedRegionId('amdo')}
                className="cursor-pointer transition-colors duration-300"
              />
              {/* Kham (South East) */}
              <motion.path
                d="M280 200 L300 150 L450 120 L480 250 L350 280 Z"
                fill={selectedRegionId === 'kham' ? '#2D241E' : '#F5F2ED'}
                stroke="#E6E0D4"
                strokeWidth="2"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedRegionId('kham')}
                className="cursor-pointer transition-colors duration-300"
              />

              {/* Labels */}
              <text x="120" y="170" className={`text-xs font-bold pointer-events-none ${selectedRegionId === 'utsang' ? 'fill-white' : 'fill-muted'}`}>U-Tsang</text>
              <text x="320" y="90" className={`text-xs font-bold pointer-events-none ${selectedRegionId === 'amdo' ? 'fill-text' : 'fill-muted'}`}>Amdo</text>
              <text x="360" y="210" className={`text-xs font-bold pointer-events-none ${selectedRegionId === 'kham' ? 'fill-white' : 'fill-muted'}`}>Kham</text>
            </svg>
          </div>

          <div className="absolute top-8 left-8 flex flex-col gap-2">
            <span className="text-[10px] font-sans font-bold text-primary uppercase tracking-widest">Interactive Map</span>
            <span className="text-[9px] font-sans text-muted italic">Click on a province to explore</span>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedRegionId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-10 rounded-[32px] border border-border shadow-md h-full flex flex-col"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-text uppercase tracking-tight mb-1">{currentRegion.name}</h3>
                  <div className="text-primary text-xl font-bold">{currentRegion.tibetan}</div>
                </div>
                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: currentRegion.color }}></div>
              </div>

              <section className="mb-8">
                <h4 className="text-[10px] font-sans font-bold text-muted uppercase tracking-[0.2rem] mb-4 flex items-center gap-2">
                   Significance <div className="h-px flex-1 bg-border" />
                </h4>
                <p className="text-sm font-serif italic text-text leading-relaxed">
                  {currentRegion.significance}
                </p>
              </section>

              <div className="grid grid-cols-2 gap-6 mt-auto">
                <div>
                  <h4 className="text-[9px] font-sans font-bold text-primary uppercase tracking-widest mb-3">Major Cities</h4>
                  <ul className="space-y-1">
                    {currentRegion.cities.map(city => (
                      <li key={city} className="text-xs font-sans text-muted flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-accent"></div> {city}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[9px] font-sans font-bold text-primary uppercase tracking-widest mb-3">Landmarks</h4>
                  <ul className="space-y-1">
                    {currentRegion.features.map(f => (
                      <li key={f} className="text-xs font-sans text-muted flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-accent"></div> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Rivers Section */}
      <div className="mt-16 mb-24">
        <div className="flex items-center gap-4 mb-8">
           <Waves size={24} className="text-primary" />
           <h3 className="text-3xl font-serif font-bold uppercase tracking-tight">The Veins of Asia</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              name: 'Drichu', 
              modern: 'Yangtze', 
              length: '6,300 km', 
              desc: 'Asia\'s longest river, originating in the Tanggula Mountains. Known as the "River of the Female Yak".' 
            },
            { 
              name: 'Machu', 
              modern: 'Yellow River', 
              length: '5,464 km', 
              desc: 'The "Peacock River" originates in the Bayan Har Mountains of Amdo, sacred to northern communities.' 
            },
            { 
              name: 'Yarlung Tsangpo', 
              modern: 'Brahmaputra', 
              length: '2,840 km', 
              desc: 'Flowing from the Kailash region, it carves the world\'s deepest canyon before reaching India.' 
            },
            { 
              name: 'Gyalmo Ngulchu', 
              modern: 'Salween', 
              length: '2,815 km', 
              desc: 'The "Queen of Rivers" flows through the deep gorges of Kham, one of the world\'s most pristine routes.' 
            },
            { 
              name: 'Senge Zangbu', 
              modern: 'Indus', 
              length: '3,180 km', 
              desc: 'Originating from the "Lion\'s Mouth" spring near Mt. Kailash, it is the lifeline of Western Tibet.' 
            },
            { 
              name: 'Zap Chu', 
              modern: 'Mekong', 
              length: '4,350 km', 
              desc: 'The turbulent river of the East, known for its steep valleys and vital fishing grounds downstream.' 
            }
          ].map((river, idx) => (
            <div key={idx} className="bg-white border border-border p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-sans font-bold text-primary uppercase tracking-[0.2em]">{river.length}</span>
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              </div>
              <h4 className="text-xl font-bold uppercase mb-1">{river.name}</h4>
              <p className="text-[10px] font-sans text-muted uppercase tracking-widest mb-4">Modern Name: {river.modern}</p>
              <p className="text-sm font-sans text-muted leading-relaxed italic">{river.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch pt-12 border-t border-border">
        <div className="bg-text text-background p-10 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <h4 className="text-2xl font-serif font-bold text-accent uppercase tracking-tight mb-4 lowercase italic">The Water Tower</h4>
          <p className="text-sm font-sans opacity-80 leading-relaxed italic">
            Tibet is ecologically the most important region of the continent. Over 2 billion people rely on the waters that begin their journey on this plateau. Protecting these sources is protecting the future of Asia.
          </p>
        </div>

        <div className="bg-white border border-border p-10 rounded-[40px] flex items-center gap-8 shadow-sm">
           <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-lg">
              <Mountain size={40} className="text-primary" />
           </div>
           <div>
              <h4 className="text-xl font-serif font-bold uppercase tracking-tight mb-2">Himalayan Giants</h4>
              <p className="text-sm font-sans text-muted leading-relaxed">
                Home to all 14 of the world's 8,000-meter peaks. These mountains are considered the abodes of deities and guardians of the plateau.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

function ArtsSection() {
  const [selectedArt, setSelectedArt] = useState<{
    title: string;
    icon: any;
    desc: string;
    longDesc: string;
    history: string;
    symbolism: string;
    facts: string[];
  } | null>(null);

  const artForms = [
    { 
      title: 'Thangka Painting', 
      icon: Palette, 
      desc: 'Scroll icons on silk, following sacred geometric proportions.',
      longDesc: 'Thangka paintings are complex spiritual maps. They are not merely pictures but visual representations of a spiritual reality. Each line, color, and figure follows strict canonical proportions defined in the "Iconographic Sutras".',
      history: 'Originating around the 7th century, Thangkas evolved as portable teaching tools for nomadic communities and practitioners. They were easily rolled up and transported during seasonal migrations.',
      symbolism: 'Every pigment is natural: crushed lapis lazuli for blue, malachite for green, and pure gold for highlights. Gold represents the unchangeable nature of enlightened mind.',
      facts: [
        "Traditional Thangka painters often undergo years of training and must live a morally upright life to paint sacred subjects.",
        "Some Thangkas are so large (Giant Applique Thangkas) that they are only displayed once a year on huge monastery walls.",
        "The 'opening of the eyes' is the final ritual step where the artist paints the pupils, bringing the deity to life."
      ]
    },
    { 
      title: 'Calligraphy', 
      icon: BookOpen, 
      desc: 'Mastering the stroke and rhythm of the Uchen script.',
      longDesc: 'Tibetan calligraphy is considered a high art form, where the ink, the nib (ghu-nyu), and the paper (often handmade from Daphne bark) create a meditative workflow. The Uchen script is the formal, blocky version used in scripture.',
      history: 'Developed during the era of King Songtsen Gampo, the script was modeled after Indic prototypes to allow the accurate translation of Sanskrit Buddhist texts into the Tibetan tongue.',
      symbolism: 'A single syllable like "Om" or "Hum" is often written as an object of focus, representing the union of sound and void.',
      facts: [
        "The reed pens (ghu-nyu) are traditionally cut from bamboo or reeds found in Southern Tibet.",
        "Calligraphy was once a mandatory skill for government officials, with their rank often influenced by the beauty of their handwriting.",
        "There are over 50 different styles of Tibetan script, ranging from formal Uchen to the fluid, cursive Umé."
      ]
    },
    { 
      title: 'Sacred Architecture', 
      icon: Mountain, 
      desc: 'Architecture designed for spiritual ascent and endurance.',
      longDesc: 'Tibetan architecture is characterized by inward-sloping walls (to resist seismic activity) and massive white-washed facades punctuated by dark wood-carved windows.',
      history: 'The Jokhang Temple and the Potala Palace represent the peak of this style, blending indigenous Tibetan construction techniques with influences from India and Nepal.',
      symbolism: 'The verticality of temples symbolizes the stages of spiritual realization, with the highest point (the golden roof) representing total enlightenment.',
      facts: [
        "Windows are often framed by 'dhago'—black trapezoidal frames that help regulate interior temperatures and provide structural strength.",
        "The Potala Palace contains over 1,000 rooms and has walls that are up to 5 meters thick at the base.",
        "Buildings are traditionally oriented towards the south to maximize sunlight and heat during the freezing plateau winters."
      ]
    },
    { 
      title: 'Metal Crafts', 
      icon: Info, 
      desc: 'Traditional gilding and casting of ritual silver and gold.',
      longDesc: 'Crafting ritual objects is a meticulous process involving lost-wax casting, repoussé (hammering from the reverse), and fire-gilding with real gold.',
      history: 'Tibetan metalworkers became world-renowned for their skills, often traveling to the courts of neighboring empires to create monumental statues and intricate reliquary stupas.',
      symbolism: 'Ritual items like the Vajra (Thunderbolt) represent the indestructible nature of wisdom, while the Bell (Ghanta) represents the feminine quality of compassion.',
      facts: [
        "Fire-gilding involves mixing gold with mercury, which is then evaporated to leave a thick, permanent layer of gold.",
        "The Derge region in Kham is historically famous for producing the highest quality steel and ritual metalwares.",
        "Many statues are 'consecrated' by filling their hollow interiors with sacred scrolls, incense, and medicinal herbs."
      ]
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12">
       <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-background border border-border text-muted rounded-full text-[10px] font-sans font-bold tracking-widest uppercase mb-6">
          <Palette size={14} /> SPIRITUAL ARTISTRY
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 uppercase tracking-tight">The Sacred Arts</h2>
        <p className="text-lg font-sans text-muted max-w-2xl mx-auto italic">Every brushstroke is a mantra; every color a devotion.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {artForms.map((art, i) => (
          <motion.div 
            key={i} 
            initial="initial"
            whileHover="hover"
            onClick={() => setSelectedArt(art)}
            className="group relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded-[32px] transition-all"></div>
            <div className="relative bg-white border-y-4 border-primary/20 p-8 rounded-[32px] h-full flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-4 left-4 opacity-5">
                 <EndlessKnot className="w-12 h-12 text-primary" />
              </div>
              <motion.div 
                variants={{
                  hover: { 
                    scale: 1.1, 
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 10 }
                  }
                }}
                className="w-20 h-20 bg-background border-8 border-white rounded-full shadow-lg flex items-center justify-center mb-8 shrink-0"
              >
                <art.icon size={28} className="text-primary" />
              </motion.div>
              <h4 className="text-lg font-bold mb-3 uppercase tracking-tight border-b-2 border-accent pb-2 px-4 whitespace-nowrap">{art.title}</h4>
              <p className="text-xs font-sans text-muted leading-relaxed italic">{art.desc}</p>
              <div className="mt-4 text-[10px] font-sans font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Learn More →</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedArt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArt(null)}
              className="absolute inset-0 bg-text/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-background w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl border border-border max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedArt(null)}
                className="absolute top-6 right-6 p-2 bg-white rounded-full border border-border hover:bg-primary hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-12">
                <div className="flex items-center gap-6 mb-8 uppercase tracking-tighter">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white">
                    <selectedArt.icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-text mb-1">{selectedArt.title}</h3>
                    <p className="text-xs font-sans text-primary font-bold tracking-[0.2em]">Divine Expression</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-[10px] font-sans font-bold text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                       The Craft <div className="h-px flex-1 bg-border" />
                    </h4>
                    <p className="text-base font-serif italic leading-relaxed text-text">
                      {selectedArt.longDesc}
                    </p>
                  </section>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <section className="bg-white border border-border p-6 rounded-3xl">
                      <h4 className="text-[9px] font-sans font-bold text-primary uppercase tracking-widest mb-3">Origin & History</h4>
                      <p className="text-xs font-sans text-muted leading-relaxed">
                        {selectedArt.history}
                      </p>
                    </section>
                    <section className="bg-text text-background p-6 rounded-3xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 opacity-10 blur-xl">
                        <selectedArt.icon size={100} />
                      </div>
                      <h4 className="text-[9px] font-sans font-bold text-accent uppercase tracking-widest mb-3 relative z-10">Meaning & Symbolism</h4>
                      <p className="text-xs font-serif italic leading-relaxed opacity-80 relative z-10">
                        {selectedArt.symbolism}
                      </p>
                    </section>
                  </div>

                  <section className="bg-accent/10 p-8 rounded-[32px] border border-accent/20">
                    <h4 className="text-[10px] font-sans font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                       Related Facts <div className="h-px flex-1 bg-accent/20" />
                    </h4>
                    <div className="space-y-4">
                      {selectedArt.facts.map((fact, idx) => (
                        <div key={idx} className="flex gap-4 group">
                          <Plus size={12} className="text-accent mt-1 shrink-0" />
                          <p className="text-xs font-sans text-muted leading-relaxed italic group-hover:text-text transition-colors">
                            {fact}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
                
                <div className="mt-12 pt-8 border-t border-border flex justify-between items-center text-[10px] font-sans font-bold text-muted uppercase tracking-widest">
                  <span>Part of Tibetan Cultural Archive</span>
                  <button className="text-primary hover:underline">Download Guide</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-24 p-12 bg-white border border-border rounded-[40px] shadow-sm overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1528642463366-83ca649a037b?auto=format&fit=crop&q=80&w=1200" 
          alt="Tibetan Art Detail" 
          className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-background rounded-full blur-[100px] opacity-100 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="w-72 h-72 bg-background rounded-full flex items-center justify-center p-8 border-8 border-white shadow-inner relative">
               <svg viewBox="0 0 100 100" className="w-full h-full text-primary opacity-30 animate-spin-slow">
                 <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
                 <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
               </svg>
               <motion.div 
                 animate={{ 
                   scale: [1, 1.05, 1],
                   opacity: [0.4, 0.6, 0.4]
                 }}
                 transition={{
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
                 className="absolute inset-0 flex items-center justify-center text-5xl"
               >
                 ☸️
               </motion.div>
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-serif font-bold mb-8 uppercase tracking-tight border-l-4 border-accent pl-6">The Sand Mandala</h3>
            <p className="text-sm font-sans text-muted leading-relaxed mb-10 italic">
              A profound spiritual exercise where monks painstakingly place millions of grains of colored sand into complex geometric maps of the universe.
              <br/><br/>
              Its ultimate purpose? To be swept away in a ritual of <span className="text-primary font-bold">impermanence</span>, teaching that nothing in the physical world is permanent.
            </p>
            <div className="flex gap-4 font-sans font-bold text-[10px] uppercase tracking-[0.2em]">
              <button className="px-6 py-3 bg-primary text-white rounded-full hover:shadow-lg transition-all">View Gallery</button>
              <button className="px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all">Techniques</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
