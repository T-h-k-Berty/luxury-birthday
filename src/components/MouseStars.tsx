import { useEffect, useState } from 'react';

export default function MouseStars() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newStar = { id: Date.now(), x: e.clientX, y: e.clientY };
      setStars((prev) => [...prev, newStar]);
      
      // තත්පර 1කින් තරුව මැකිලා යන්න
      setTimeout(() => {
        setStars((prev) => prev.filter((star) => star.id !== newStar.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-gold-500 text-xl animate-ping"
          style={{ left: star.x, top: star.y }}
        >
          ✦
        </div>
      ))}
    </div>
  );
}