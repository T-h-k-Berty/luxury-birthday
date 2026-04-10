import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

interface UserWish {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

export default function GalleryAndForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const photos = [
    '/images/photo1.png', '/images/photo2.png', '/images/photo3.png', 
    '/images/photo4.png', '/images/photo5.jpg', '/images/photo6.png', 
    '/images/photo7.png', '/images/photo8.png', '/images/photo9.png', 
    '/images/photo10.png'
  ];

  // පින්තූර පේළිය දිගට පෙනීමට දෙගුණයක් කිරීම
  const doublePhotos = [...photos, ...photos];

  const existingWishes: UserWish[] = [
    { id: 1, name: "Ishara", message: "Happy 22nd Birthday! May this beautiful chapter bring you endless joy and success. ❤️", timestamp: "Just now" },
    { id: 2, name: "Sahan Perera", message: "Happy Birthday machan! Chapter 22 is going to be epic! ✨", timestamp: "2 hours ago" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sectionVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="max-w-full overflow-hidden py-20 z-20 relative flex flex-col gap-32 bg-transparent">
      
      {/* ========================================= */}
      {/* 1. WOW INFINITE MOVING GALLERY SECTION */}
      {/* ========================================= */}
      <div className="relative w-full flex flex-col gap-8">
        <div className="text-center mb-4 px-4">
          <h2 className="text-sm tracking-[0.4em] text-gold-500/80 uppercase mb-3 font-semibold font-serif">A Lifetime of Memories</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-white drop-shadow-lg">Captured Brilliance</h3>
        </div>

        {/* First Row: Moving Left to Right */}
        <div className="flex w-full overflow-hidden group">
          <motion.div 
            className="flex gap-6 whitespace-nowrap py-4"
            animate={{ x: [0, -1920] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {doublePhotos.slice(0, 10).map((src, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.1, rotateZ: 2, zIndex: 10 }}
                className="w-64 h-80 flex-shrink-0 rounded-2xl border-2 border-gold-500/20 overflow-hidden shadow-2xl relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src={src} className="w-full h-full object-cover" alt="Memory" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second Row: Moving Right to Left */}
        <div className="flex w-full overflow-hidden group">
          <motion.div 
            className="flex gap-6 whitespace-nowrap py-4"
            animate={{ x: [-1920, 0] }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          >
            {doublePhotos.slice(10, 20).map((src, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.1, rotateZ: -2, zIndex: 10 }}
                className="w-64 h-80 flex-shrink-0 rounded-2xl border-2 border-gold-500/20 overflow-hidden shadow-2xl relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src={src} className="w-full h-full object-cover" alt="Memory" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. WISHES DISPLAY & FORM SECTION */}
      {/* ========================================= */}
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start w-full px-6"
      >
        {/* --- Left Column: Luxury Wish Form --- */}
        <div className="relative order-2 lg:order-1">
          <motion.div 
            animate={{ opacity: [0.1, 0.2, 0.1], scale: [0.99, 1.01, 0.99] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -inset-4 bg-gold-600/20 rounded-[3rem] blur-3xl pointer-events-none"
          />
          <div className="relative w-full bg-black/40 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-gold-500/30 shadow-2xl flex flex-col">
            <h3 className="text-3xl text-gold-500 font-serif mb-2 tracking-wide">Leave Your Mark</h3>
            <p className="text-gray-400 text-sm mb-10 italic tracking-wider">Your blessing will be cherished forever.</p>
            
            {submitted ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-20 text-center">
                <div className="text-5xl mb-4">✨</div>
                <p className="text-gold-400 font-serif text-xl tracking-widest">Blessing Received With Love</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="group relative">
                  <input 
                    type="text" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-neutral-800 py-3 text-white focus:outline-none focus:border-gold-500 transition-all font-serif placeholder:text-neutral-600" 
                  />
                </div>
                <div className="group relative">
                  <textarea 
                    placeholder="Your Heartfelt Message..." rows={3} required value={message} onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-neutral-800 py-3 text-white focus:outline-none focus:border-gold-500 transition-all font-serif placeholder:text-neutral-600 resize-none"
                  ></textarea>
                </div>
                <motion.button 
                  type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-gold-600 to-gold-400 text-black font-extrabold py-5 rounded-full text-lg tracking-[0.2em] font-serif uppercase transition-all flex items-center justify-center gap-4 shadow-lg shadow-gold-500/20"
                >
                  Send Blessing
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </motion.button>
              </form>
            )}
          </div>
        </div>

        {/* --- Right Column: Elegant Wishes Feed --- */}
        <div className="flex flex-col gap-10 order-1 lg:order-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-gold-500 text-sm tracking-widest uppercase font-bold">Blessings</h2>
            <h3 className="text-4xl font-serif text-white tracking-wide">From the Heart</h3>
          </div>
          
          <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
            {existingWishes.map((w, index) => (
              <motion.div 
                key={w.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.2 }}
                className="bg-neutral-900/40 p-8 rounded-3xl border border-neutral-800 hover:border-gold-500/40 transition-all relative group"
              >
                <span className="text-gold-500/20 text-6xl absolute top-4 right-8 font-serif pointer-events-none">”</span>
                <p className="text-neutral-300 italic text-lg leading-relaxed mb-4 relative z-10">"{w.message}"</p>
                <div className="flex items-center gap-4 border-t border-neutral-800 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gold-600 flex items-center justify-center text-black font-bold">
                    {w.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gold-400 font-bold text-sm tracking-widest uppercase">{w.name}</p>
                    <p className="text-neutral-600 text-[10px]">{w.timestamp}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}