import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// බැලුන් සඳහා ලස්සන 3D වර්ණ සංයෝජනයන්
const balloonColors = [
  { base: '#ff3b3b', dark: '#cc0000', light: '#ff9999' }, // රතු
  { base: '#3b82f6', dark: '#1d4ed8', light: '#93c5fd' }, // නිල්
  { base: '#eab308', dark: '#a16207', light: '#fef08a' }, // රන්වන්
  { base: '#22c55e', dark: '#15803d', light: '#86efac' }, // කොළ
  { base: '#a855f7', dark: '#7e22ce', light: '#d8b4fe' }, // දම්
  { base: '#ec4899', dark: '#be185d', light: '#fbcfe8' }, // රෝස
];

// බැලුන් වල ආරම්භක දත්ත සකස් කිරීම
const generateBalloons = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + Math.random(), // Unique ID
    color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
    startX: Math.random() * 80 + 10, // 10vw සිට 90vw අතර
    duration: Math.random() * 10 + 15, // තත්පර 15ත් 25ත් අතර කාලයක්
    delay: Math.random() * 5, // විවිධ වෙලාවල පටන් ගන්න
  }));
};

export default function Balloons() {
  const [balloons, setBalloons] = useState(generateBalloons(8)); // බැලුන් 8ක්

  const popBalloon = (id: number, e: React.MouseEvent, color: any) => {
    // Click කළ නිවැරදි ස්ථානය ලබා ගැනීම
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Creative Confetti Effect එක (First Burst)
    confetti({
      particleCount: 80,
      spread: 100,
      startVelocity: 30,
      origin: { x, y },
      colors: [color.base, color.light, '#ffffff'],
      shapes: ['circle', 'square'],
      ticks: 100,
      zIndex: 50,
    });

    // Second Burst (තරු හැඩයෙන් යුත් පුපුරා යාම)
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 120,
        startVelocity: 20,
        origin: { x, y },
        colors: [color.dark, '#ffd700'],
        shapes: ['star'],
        ticks: 80,
        zIndex: 50,
      });
    }, 100);

    // පුපුරා ගිය බැලුම ඉවත් කිරීම
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          // ආරම්භක ස්ථානය
          initial={{ 
            y: '110vh', 
            x: `${balloon.startX}vw`, 
            rotate: -10 
          }}
          // සජීවීකරණය (උඩට යාම සහ දෙපැත්තට පැද්දීම)
          animate={{ 
            y: '-20vh',
            x: [`${balloon.startX}vw`, `${balloon.startX - 5}vw`, `${balloon.startX + 5}vw`, `${balloon.startX}vw`],
            rotate: [-10, 10, -10]
          }}
          transition={{ 
            y: { duration: balloon.duration, repeat: Infinity, ease: 'linear', delay: balloon.delay },
            x: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: balloon.delay },
            rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: balloon.delay }
          }}
          className="absolute cursor-pointer pointer-events-auto flex flex-col items-center justify-start group"
          onClick={(e) => popBalloon(balloon.id, e, balloon.color)}
        >
          {/* 3D බැලුන් හැඩය */}
          <div 
            className="relative w-16 h-20 shadow-xl transition-transform duration-100 active:scale-90"
            style={{
              // 3D ගෝලාකාර පෙනුම ලබාදීම
              background: `radial-gradient(circle at 30% 30%, ${balloon.color.light}, ${balloon.color.base} 60%, ${balloon.color.dark} 100%)`,
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
              boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.3), inset 5px 5px 10px rgba(255,255,255,0.4)`,
            }}
          >
            {/* බැලුන් එකේ ගැටය (Knot) */}
            <div 
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: `8px solid ${balloon.color.dark}`,
              }}
            ></div>
          </div>

          {/* බැලුන් එකේ නූල */}
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent mt-1 group-hover:rotate-6 transition-transform origin-top"></div>
        </motion.div>
      ))}
    </div>
  );
}