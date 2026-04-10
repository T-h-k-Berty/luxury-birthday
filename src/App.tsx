import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LuxuryCard from './components/LuxuryCard';
import MouseStars from './components/MouseStars';
import Balloons from './components/Balloons';
import BirthdayCake from './components/BirthdayCake';
import GalleryAndForm from './components/GalleryAndForm';

function App() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const titleText = "Happy 22nd Birthday!".split("");

  return (
    // Background color එක පැහැදිලිව කළු පැහැයට හුරු වීමට bg-neutral-950 යොදා ඇත
    <div className="min-h-screen font-sans selection:bg-gold-500 selection:text-black bg-neutral-950">
      <AnimatePresence>
        {!isCardOpen && <LuxuryCard onOpen={() => setIsCardOpen(true)} />}
      </AnimatePresence>

      {isCardOpen && (
        <main className="relative min-h-screen pt-16 pb-6 flex flex-col items-center gap-12">
          <MouseStars />
          <Balloons />
          
          {/* --- HEADER AREA --- */}
          <div className="text-center w-full relative z-20 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gold-500 font-serif tracking-wider drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] flex justify-center flex-wrap">
              {titleText.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05, type: "spring" }}
                  className={char === " " ? "w-4" : ""}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-gray-300 italic text-xl mt-4 font-light tracking-wide"
            >
              A masterpiece of a life, waiting for its next brilliant stroke.
            </motion.p>
          </div>

          {/* Cake and Interactive features */}
          <div className="w-full">
            <BirthdayCake />
          </div>
          
          <div className="w-full">
            <GalleryAndForm />
          </div>

          {/* ========================================================= */}
          {/* --- FOOTER / COPYRIGHT AREA --- */}
          {/* ========================================================= */}
          <footer className="w-full mt-auto pt-10 pb-4 flex justify-center relative z-20">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-center"
            >
              {/* Decorative Line */}
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto mb-4"></div>
              
              {/* Copyright Text */}
              <p className="text-[#D4AF37]/70 text-xs md:text-sm font-serif tracking-[0.2em] uppercase">
                &copy; {new Date().getFullYear()} NextGen Invites
              </p>
              <p className="text-gray-500/50 text-[10px] mt-1.5 tracking-widest uppercase">
                All Rights Reserved
              </p>
            </motion.div>
          </footer>
          
          {/* Background effect */}
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none z-0"></div>
        </main>
      )}
    </div>
  );
}

export default App;