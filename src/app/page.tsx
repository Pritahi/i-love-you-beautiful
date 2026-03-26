'use client'

import { useState, useEffect } from 'react'
import { X, Skull, Flame, Zap } from 'lucide-react'

export default function Home() {
  const [skulls, setSkulls] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([])
  const [clickX, setClickX] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Generate floating skulls
    const newSkulls = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 25 + 15,
    }))
    setSkulls(newSkulls)
    
    // Show message after delay
    setTimeout(() => setShowMessage(true), 500)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    const newX = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    }
    setClickX(prev => [...prev, newX])
    setTimeout(() => {
      setClickX(prev => prev.filter(h => h.id !== newX.id))
    }, 800)
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 30%, #2d0a0a 50%, #0a0a0a 100%)'
      }}
      onClick={handleClick}
    >
      {/* Animated Background Skulls */}
      {skulls.map(skull => (
        <div
          key={skull.id}
          className="absolute animate-float pointer-events-none"
          style={{
            left: `${skull.left}%`,
            bottom: '-50px',
            animationDelay: `${skull.delay}s`,
            animationDuration: '10s',
          }}
        >
          <Skull
            className="text-red-900/30"
            style={{ width: skull.size, height: skull.size }}
          />
        </div>
      ))}

      {/* Click X marks */}
      {clickX.map(mark => (
        <div
          key={mark.id}
          className="fixed pointer-events-none animate-burst"
          style={{ left: mark.x, top: mark.y, transform: 'translate(-50%, -50%)' }}
        >
          <X
            className="w-10 h-10 text-red-500"
            strokeWidth={3}
          />
        </div>
      ))}

      {/* Lightning Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Zap
            key={i}
            className="absolute animate-lightning"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              color: 'rgba(255, 0, 0, 0.4)',
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
            }}
          />
        ))}
      </div>

      {/* Flame Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Flame
            key={i}
            className="absolute animate-flame"
            style={{
              left: `${i * 10 + Math.random() * 5}%`,
              bottom: '-20px',
              animationDelay: `${Math.random() * 2}s`,
              color: 'rgba(255, 50, 0, 0.6)',
              width: Math.random() * 30 + 20,
              height: Math.random() * 40 + 30,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Broken Heart / X Symbol */}
        <div className={`transition-all duration-1000 ${showMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative">
            <X
              className="w-32 h-32 md:w-48 md:h-48 text-red-600 animate-shake"
              strokeWidth={3}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Skull
                className="w-16 h-16 md:w-24 md:h-24 text-red-800 animate-glow"
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className={`mt-8 text-center transition-all duration-1000 delay-300 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-600 bg-clip-text text-transparent animate-text-shadow">
            I HATE YOU
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-red-400/70 font-bold tracking-widest uppercase">
            💀 Stay Away From Me 💀
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-red-600/50">
            <X className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider">Click anywhere for more hatred</span>
            <X className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom Emojis */}
        <div className={`absolute bottom-8 flex gap-4 transition-all duration-1000 delay-700 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
          {['💀', '😤', '💔', '🤬', '👊'].map((emoji, i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl animate-shake-emoji"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes burst {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(2.5) rotate(180deg);
            opacity: 0;
          }
        }
        
        @keyframes lightning {
          0%, 90%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          5%, 10% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes flame {
          0%, 100% {
            transform: scaleY(1) scaleX(1);
            opacity: 0.6;
          }
          50% {
            transform: scaleY(1.3) scaleX(0.8);
            opacity: 0.9;
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }
        
        @keyframes shake-emoji {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 0, 0, 0.8));
          }
        }
        
        @keyframes text-shadow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
          }
          50% {
            text-shadow: 0 0 40px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 50, 0, 0.4);
          }
        }
        
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        
        .animate-burst {
          animation: burst 0.8s ease-out forwards;
        }
        
        .animate-lightning {
          animation: lightning 4s ease-in-out infinite;
        }
        
        .animate-flame {
          animation: flame 1.5s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }
        
        .animate-shake-emoji {
          animation: shake-emoji 0.8s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-text-shadow {
          animation: text-shadow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
