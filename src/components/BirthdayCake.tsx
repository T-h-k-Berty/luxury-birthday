import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const [isBlownOut, setIsBlownOut] = useState(false);
  
  // cardStep: 
  // 0 = hidden, 1 = envelope entering, 2 = flap opening, 
  // 3 = letter sliding out & expanding, 4 = reading mode (clickable)
  // 5 = letter sliding back, 6 = flap closing & wax seal, 7 = flying away
  const [cardStep, setCardStep] = useState(0); 

  const candles = Array(22).fill(true);

  const handleBlowOut = () => {
    if (isBlownOut) return;
    setIsBlownOut(true);
    
    // Theme Confetti (Black, Gold, White, Silver)
    confetti({
      particleCount: 250,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#D4AF37', '#FFFFFF', '#000000', '#C0C0C0'] 
    });

    // Advanced Envelope Entry Timeline
    setTimeout(() => setCardStep(1), 1500); // ලියුම් කවරය පැමිණීම
    setTimeout(() => setCardStep(2), 2500); // කවරයේ පියන විවෘත වීම
    setTimeout(() => setCardStep(3), 3200); // ලිපිය එළියට විත් විශාල වීම
    setTimeout(() => setCardStep(4), 4500); // කියවීමට සූදානම් වීම (Clickable)
  };

  const handleCloseCard = () => {
    if (cardStep !== 4) return;
    setCardStep(5); // ලිපිය නැවත ඇතුලට යාම
    
    setTimeout(() => setCardStep(6), 1000); // පියන වැසී Wax Seal එක වැදීම
    setTimeout(() => setCardStep(7), 2500); // ලියුම් කවරය ඉවත් වී යාම
  };

  const wish = "May this beautiful chapter of 22 bring endless joy, success, and brilliant memories that last a lifetime. Keep shining brighter every day! ✨";

  return (
    // min-h-screen ඉවත් කර py-10 පමණක් යොදා ඇත
    <div className="flex flex-col items-center justify-center w-full z-20 relative px-4 py-10">
      
      {/* ========================================================= */}
      {/* --- LUXURY BLACK, GOLD & WHITE CAKE --- */}
      {/* ========================================================= */}
      <div className="relative flex flex-col items-center">
        
        {/* Invisible Clickable Area exactly over the flames */}
        {!isBlownOut && (
          <div 
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-24 z-40 cursor-pointer" 
            onClick={handleBlowOut}
            title="Click flames to blow out"
          ></div>
        )}

        {/* Top Tier (Gold) */}
        <div className="w-48 h-20 bg-gradient-to-b from-[#FFDF00] via-[#D4AF37] to-[#8B6508] rounded-t-[2rem] border-t border-yellow-200 shadow-[0_0_30px_rgba(212,175,55,0.4)] relative z-30 mt-12">
          {/* Candles */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1 w-44">
            {candles.map((_, idx) => (
              <div key={idx} className="relative w-1 h-10 bg-gradient-to-b from-white to-gray-300 rounded-t-md shadow-sm pointer-events-none">
                <AnimatePresence>
                  {!isBlownOut && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.2, 1], rotate: [0, -3, 3, 0], opacity: 1 }}
                      exit={{ 
                        scale: 0.2, x: 15, y: -5, rotate: 45, opacity: 0,
                        transition: { duration: 0.3, delay: idx * 0.03, ease: "easeOut" }
                      }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: idx * 0.02 }}
                      className="absolute -top-5 -left-1 w-3 h-4 bg-gradient-to-t from-gold-400 to-white rounded-full blur-[1px] shadow-[0_0_10px_#D4AF37]"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="absolute bottom-1 left-2 right-2 h-0.5 bg-white/40 rounded-full"></div>
        </div>

        {/* Middle Tier (White/Pearl) */}
        <div className="w-64 h-24 bg-gradient-to-b from-[#ffffff] via-[#f0f0f0] to-[#cccccc] rounded-t-[2.5rem] border-t-2 border-white -mt-2 shadow-2xl relative z-20 flex items-center justify-center pointer-events-none">
          <div className="absolute top-2 left-4 right-4 h-0.5 bg-white rounded-full"></div>
          <span className="text-black text-xl font-serif font-bold tracking-[0.3em] opacity-80 drop-shadow-md">CHAPTER 22</span>
        </div>

        {/* Base Tier (Matte Black) */}
        <div className="w-80 h-28 bg-gradient-to-b from-[#333333] via-[#111111] to-[#000000] rounded-t-[3rem] rounded-b-xl border-t border-gold-500/50 -mt-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 pointer-events-none">
          <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
          <div className="absolute bottom-3 left-4 right-4 flex justify-around">
            {Array(10).fill(0).map((_,i) => <div key={i} className="w-2.5 h-2.5 bg-gradient-to-br from-yellow-300 to-[#D4AF37] rounded-full shadow-[0_0_5px_rgba(212,175,55,0.8)]"></div>)}
          </div>
        </div>

        {/* Cake Base Plate (Gold/Brass) */}
        <div className="w-[26rem] h-6 bg-gradient-to-r from-[#8a6d1c] via-[#ebd181] to-[#8a6d1c] rounded-full mt-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b-2 border-yellow-700 pointer-events-none"></div>

        {/* Blowout Smoke */}
        <AnimatePresence>
          {isBlownOut && cardStep === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: [0, 0.6, 0], y: -200, scale: [0.5, 2, 1] }}
              transition={{ duration: 2.5, ease: 'easeOut', delay: 0.5 }} 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none z-40"
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!isBlownOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3], transition: { duration: 2, repeat: Infinity } }}
            exit={{ opacity: 0 }}
            className="mt-10 text-[#D4AF37] text-sm italic tracking-widest font-serif pointer-events-none"
          >
            Tap the golden flames to blow them out...
          </motion.div>
        )}
      </AnimatePresence>


      {/* ========================================================= */}
      {/* --- LUXURY ENVELOPE & LETTER ANIMATION --- */}
      {/* ========================================================= */}
      
      <AnimatePresence>
        {cardStep > 0 && cardStep < 7 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            {/* The Envelope Wrapper */}
            <motion.div 
              className="relative w-[22rem] h-[14rem]"
              initial={{ scale: 0.5, y: '100vh', opacity: 0 }}
              animate={cardStep === 7 ? { y: '-100vh', opacity: 0, scale: 0.8 } : { scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              
              {/* Back of Envelope */}
              <div className="absolute inset-0 bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-lg shadow-2xl overflow-hidden z-0">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_100%)]"></div>
              </div>

              {/* THE LETTER */}
              <motion.div 
                className="absolute left-3 right-3 h-[13rem] bg-gradient-to-br from-[#ffffff] to-[#f4ebd0] rounded-md shadow-lg border-2 border-[#D4AF37] p-5 flex flex-col items-center justify-center text-center cursor-pointer"
                style={{ originY: 1 }}
                initial={{ bottom: "0.5rem", scale: 1, zIndex: 10 }}
                animate={
                  cardStep >= 3 && cardStep <= 4 
                    ? { y: "-40%", scale: 1.15, zIndex: 40, bottom: "0.5rem" } 
                    : { y: 0, scale: 1, zIndex: 10, bottom: "0.5rem" }
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onClick={cardStep === 4 ? handleCloseCard : undefined}
              >
                <div className="absolute inset-1.5 border border-[#D4AF37]/40 rounded-sm pointer-events-none"></div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: cardStep >= 3 && cardStep <= 4 ? 1 : 0 }}
                  transition={{ delay: cardStep === 3 ? 0.6 : 0, duration: 0.4 }}
                  className="relative z-10 w-full"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-3 font-serif border-b border-[#D4AF37] pb-2 inline-block">
                    A Special Message
                  </h3>
                  <p className="text-sm md:text-base text-gray-800 font-serif italic leading-relaxed">
                    {wish}
                  </p>
                  
                  {cardStep === 4 && (
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="mt-4 text-[#8B6508] text-xs font-bold tracking-widest uppercase"
                    >
                      Tap to Close
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* Front Bottom Flap */}
              <div className="absolute bottom-0 left-0 right-0 h-full z-20 pointer-events-none drop-shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="0,100 0,35 50,70 100,35 100,100" fill="#111111" stroke="#D4AF37" strokeWidth="0.5"/>
                  <polygon points="0,100 0,35 50,70" fill="#0d0d0d" />
                  <polygon points="100,100 100,35 50,70" fill="#141414" />
                </svg>
              </div>

              {/* Top Flap */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-[65%] origin-top pointer-events-none drop-shadow-xl"
                initial={{ rotateX: 0, zIndex: 30 }}
                animate={{ 
                  rotateX: cardStep >= 2 && cardStep <= 5 ? 180 : 0,
                  zIndex: cardStep >= 2 && cardStep <= 5 ? 5 : 30
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="0,0 100,0 50,100" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="1"/>
                </svg>
              </motion.div>

              {/* Golden Wax Seal */}
              <AnimatePresence>
                {(cardStep === 6 || cardStep === 7) && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.6, duration: 0.6 }}
                    className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#FFDF00] via-[#D4AF37] to-[#8B6508] rounded-full z-40 shadow-[0_5px_15px_rgba(0,0,0,0.8)] flex items-center justify-center border border-yellow-200"
                  >
                    <div className="w-12 h-12 rounded-full border border-yellow-600/50 flex items-center justify-center shadow-inner bg-gradient-to-br from-[#D4AF37] to-[#B8860B]">
                      <span className="text-black font-serif font-bold text-xl drop-shadow-sm">22</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}