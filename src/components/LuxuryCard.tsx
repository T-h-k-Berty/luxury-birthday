import { motion } from 'framer-motion';

interface Props {
  onOpen: () => void;
}

export default function LuxuryCard({ onOpen }: Props) {
  return (
    <motion.div 
      // මුළු පසුබිමම fade වෙලා යනවා
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 bg-neutral-950/80 backdrop-blur-lg z-50 flex items-center justify-center overflow-hidden"
    >
      {/* --- The Glowing Aura Behind the Card --- */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute w-[30rem] h-[40rem] bg-gold-500/20 blur-[100px] rounded-full pointer-events-none"
      />

      {/* --- THE LUXURY CARD --- */}
      <motion.div 
        initial={{ y: 50, opacity: 0, rotateX: 10 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        // Click කරාම ඇතුලටම Zoom වෙලා යන සුපිරි Animation එක
        exit={{ 
          scale: [1, 0.9, 5], 
          opacity: [1, 1, 0], 
          filter: ['blur(0px)', 'blur(0px)', 'blur(20px)'],
          transition: { duration: 1.2, times: [0, 0.3, 1], ease: 'easeInOut' } 
        }}
        whileHover={{ scale: 1.02, translateY: -5 }}
        onClick={onOpen}
        className="w-[20rem] md:w-[24rem] h-[34rem] bg-gradient-to-b from-[#1a1a1a] via-[#0a0a0a] to-black rounded-sm p-6 cursor-pointer flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group border border-neutral-800"
        style={{ transformPerspective: 1000 }}
      >
        {/* Subtle texture/grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

        {/* --- LUXURY BORDERS & ORNAMENTS --- */}
        <div className="absolute inset-3 border border-gold-500/30 rounded-sm pointer-events-none transition-colors duration-500 group-hover:border-gold-500/60"></div>
        <div className="absolute inset-4 border border-gold-500/10 rounded-sm pointer-events-none"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold-500 transition-all duration-500 group-hover:w-8 group-hover:h-8"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold-500 transition-all duration-500 group-hover:w-8 group-hover:h-8"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold-500 transition-all duration-500 group-hover:w-8 group-hover:h-8"></div>
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold-500 transition-all duration-500 group-hover:w-8 group-hover:h-8"></div>

        {/* Top Decorative Line */}
        <div className="w-full flex items-center justify-center mt-6">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-500"></div>
          <div className="w-2 h-2 rotate-45 bg-gold-500 mx-2 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-500"></div>
        </div>

        {/* --- MAIN TEXT CONTENT --- */}
        <div className="flex flex-col items-center z-10 mt-8">
          <h3 className="text-gold-500/80 tracking-[0.2em] text-sm uppercase mb-4 font-serif">An Exclusive Invitation</h3>
          <h1 className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 font-serif text-center drop-shadow-lg mb-4">
            Chapter 22
          </h1>
          <p className="text-gray-400 text-center text-sm md:text-base italic px-4 font-light leading-relaxed">
            A beautiful milestone awaits. You are invited to witness the unfolding of a masterpiece.
          </p>
        </div>

        {/* --- THE INTERACTIVE SEAL (Button Replacement) --- */}
        <div className="relative mb-10 flex flex-col items-center">
          {/* Animated Glow behind the seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gold-500/20 blur-xl rounded-full group-hover:bg-gold-500/40 transition-all duration-500"></div>
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="w-16 h-16 border border-dashed border-gold-500/50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          ></motion.div>

          {/* The Diamond Seal */}
          <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-500 z-10">
            <div className="w-12 h-12 border border-black/20 flex items-center justify-center">
              <span className="-rotate-45 text-black font-serif font-extrabold text-xl">22</span>
            </div>
          </div>

          <motion.div 
             animate={{ opacity: [0.5, 1, 0.5] }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="mt-10 text-gold-500 text-xs tracking-widest uppercase font-semibold"
          >
            Tap to Unlock
          </motion.div>
        </div>
        
      </motion.div>
    </motion.div>
  );
}