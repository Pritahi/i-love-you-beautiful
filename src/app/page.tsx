'use client'

import { useState, useEffect } from 'react'
import { Heart, Sparkles } from 'lucide-react'

export default function Home() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([])
  const [clickHearts, setClickHearts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Generate floating hearts
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 20 + 10,
    }))
    setHearts(newHearts)
    
    // Show message after delay
    setTimeout(() => setShowMessage(true), 500)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    }
    setClickHearts(prev => [...prev, newHeart])
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== newHeart.id))
    }, 1000)
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #1a0a0a 0%, #2d1f1f 50%, #1a0a0a 100%)'
      }}
      onClick={handleClick}
    >
      {/* Animated Background Hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-float pointer-events-none"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
            animationDuration: '8s',
          }}
        >
          <Heart
            fill="rgba(255, 100, 100, 0.3)"
            stroke="rgba(255, 100, 100, 0.5)"
            style={{ width: heart.size, height: heart.size }}
          />
        </div>
      ))}

      {/* Click Hearts */}
      {clickHearts.map(heart => (
        <div
          key={heart.id}
          className="fixed pointer-events-none animate-burst"
          style={{ left: heart.x, top: heart.y }}
        >
          <Heart
            fill="#ff6b6b"
            stroke="#ff6b6b"
            className="w-8 h-8"
          />
        </div>
      ))}

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              color: 'rgba(255, 200, 200, 0.5)',
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Big Heart */}
        <div className={`transition-all duration-1000 ${showMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative">
            <Heart
              fill="#ff4757"
              stroke="#ff6b81"
              strokeWidth={2}
              className="w-32 h-32 md:w-48 md:h-48 animate-pulse-heart"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart
                fill="#ff6b81"
                className="w-16 h-16 md:w-24 md:h-24 animate-pulse-heart"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className={`mt-8 text-center transition-all duration-1000 delay-300 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            I Love You
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-rose-200/70 font-light tracking-wide">
            ❤️ Forever and Always ❤️
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-rose-300/50">
            <Heart fill="currentColor" className="w-4 h-4" />
            <span className="text-sm">Click anywhere for more love</span>
            <Heart fill="currentColor" className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom Hearts */}
        <div className={`absolute bottom-8 flex gap-4 transition-all duration-1000 delay-700 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
          {['💖', '💕', '💗', '💓', '💝'].map((emoji, i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl animate-bounce"
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
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes burst {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(2) rotate(180deg) translateY(-50px);
            opacity: 0;
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse-heart {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-burst {
          animation: burst 1s ease-out forwards;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-pulse-heart {
          animation: pulse-heart 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
