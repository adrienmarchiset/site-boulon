'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Sparkles, Heart } from 'lucide-react';

export default function BoulonSite() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Créer des paillettes au mouvement de la souris
      if (Math.random() > 0.7) {
        const colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0080', '#00FF80', '#FF8000'];
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 2
        };
        setSparkles(prev => [...prev.slice(-30), newSparkle]);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Gradient qui change selon le scroll
  const getBackgroundGradient = () => {
    const scroll = Math.min(scrollY / 2000, 1);
    return `linear-gradient(135deg, 
      hsl(${290 + scroll * 40}, 100%, 50%) 0%,
      hsl(${320 + scroll * 20}, 100%, 50%) 25%,
      hsl(${180 - scroll * 50}, 100%, 50%) 50%,
      hsl(${40 + scroll * 40}, 100%, 50%) 75%,
      hsl(${290 + scroll * 30}, 100%, 50%) 100%)`;
  };

  return (
    <div 
      className="overflow-hidden"
      style={{
        background: getBackgroundGradient(),
        transition: 'background 0.1s ease-out'
      }}
    >
      {/* Paillettes animées */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              boxShadow: `0 0 ${sparkle.size * 3}px ${sparkle.color}`,
              animation: 'sparkleFloat 1s ease-out forwards',
              opacity: 0.8
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes sparkleFloat {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
          }
        }
      `}</style>

      {/* Header Hero */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute text-9xl font-bold"
            style={{ 
              transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.05}deg)`,
              top: '50%',
              left: '50%',
              marginLeft: '-100px',
              marginTop: '-100px'
            }}
          >
            ⚙️
          </div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div 
            className="inline-block mb-8"
            style={{
              animation: 'pulse 2s infinite',
              filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))'
            }}
          >
            <Zap className="w-32 h-32 text-white drop-shadow-lg" />
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black text-white mb-8 drop-shadow-lg" style={{
            textShadow: '0 0 30px rgba(255, 0, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6)',
            letterSpacing: '0.05em'
          }}>
            LE BOULON
          </h1>
          
          <p className="text-2xl md:text-4xl text-white font-bold mb-6 drop-shadow-lg" style={{
            textShadow: '0 0 20px rgba(255, 255, 0, 0.8)',
          }}>
            L'élément indispensable pour réussir
          </p>
          
          <p className="text-xl md:text-2xl text-white italic font-light mb-12 drop-shadow-lg" style={{
            textShadow: '0 0 15px rgba(0, 255, 255, 0.8)',
            fontStyle: 'italic',
            letterSpacing: '0.1em'
          }}>
            ~ Si tu n'as pas un boulon à 50 ans, tu as raté ta vie. ~
          </p>

          <div 
            style={{ animation: 'float 3s ease-in-out infinite' }}
            className="text-white text-4xl"
          >
            ↓
          </div>

          <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(15px); }
            }
          `}</style>
        </div>
      </header>

      {/* Section 1: La puissance du Boulon */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-6 drop-shadow-lg" style={{
              textShadow: '0 0 20px rgba(255, 0, 255, 0.8)'
            }}>
              Pourquoi le Boulon ?
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div 
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
              style={{
                transform: `translateY(${Math.max(0, scrollY - 800) * 0.08}px)`,
                cursor: 'crosshair',
                transition: 'transform 0.1s ease-out',
                perspective: '1000px'
              }}
              onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
                e.currentTarget.style.transform = `translateY(${Math.max(0, scrollY - 800) * 0.08}px) rotateX(${y}deg) rotateY(${x}deg) scale(1.05)`;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = `translateY(${Math.max(0, scrollY - 800) * 0.08}px) rotateX(0deg) rotateY(0deg) scale(1)`;
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop" 
                alt="Boulon brillant" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 via-transparent to-cyan-500/30"></div>
            </div>
            
            <div className="space-y-8 text-white">
              <div className="flex gap-4">
                <Sparkles className="w-8 h-8 text-yellow-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-pink-300">Solidité</h3>
                  <p className="text-lg">Le boulon tient tout ensemble. C'est la force tranquille qui construit l'empire.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Heart className="w-8 h-8 text-cyan-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-cyan-300">Fiabilité</h3>
                  <p className="text-lg">On peut compter sur lui. Le boulon ne lâche jamais, jamais.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Zap className="w-8 h-8 text-yellow-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-yellow-300">Puissance</h3>
                  <p className="text-lg">Simple mais efficace. Le boulon a changé le monde.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Les types de boulons */}
      <section className="py-32 px-6 bg-gradient-to-b from-black/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-black text-white text-center mb-20 drop-shadow-lg" style={{
            textShadow: '0 0 20px rgba(0, 255, 255, 0.8)'
          }}>
            Les Légendes du Boulon
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Le Classique', emoji: '⭐', desc: 'Intemporel et efficace' },
              { name: 'Le Futuriste', emoji: '🚀', desc: 'Moderne et révolutionnaire' },
              { name: 'L\'Exceptionnel', emoji: '💎', desc: 'Rare et précieux' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="relative group"
                style={{ animation: `slideUp 0.6s ease-out ${idx * 0.2}s backwards` }}
              >
                <div 
                  className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white/60 transition-all duration-300 h-full"
                  onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
                    const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.05)`;
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                  }}
                  style={{
                    transition: 'transform 0.1s ease-out',
                    cursor: 'pointer'
                  }}
                >
                  <div className="text-6xl mb-4">{item.emoji}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-white/80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(40px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </section>

      {/* Section 3: Image avec parallax */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-5xl mx-auto">
          <div 
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
            style={{
              transform: `translateY(${Math.max(0, scrollY - 2200) * 0.08}px)`,
              cursor: 'pointer'
            }}
            onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
              const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
              e.currentTarget.style.transform = `translateY(${Math.max(0, scrollY - 2200) * 0.08}px) rotateX(${y}deg) rotateY(${x}deg) scale(1.08)`;
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.transform = `translateY(${Math.max(0, scrollY - 2200) * 0.08}px) rotateX(0deg) rotateY(0deg) scale(1)`;
            }}
            style={{
              transition: 'transform 0.1s ease-out',
              perspective: '1000px'
            }}
          >
            <img 
              src="/images.jpg" 
              alt="Boulons en action" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <p className="text-white text-2xl font-bold p-8">Assemblés. Unis. Indestructibles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-black/30 to-black/60">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6 drop-shadow-lg" style={{
            textShadow: '0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6)'
          }}>
            Rejoins le Mouvement 🔩
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Crois au pouvoir du boulon. Change ta vie.
          </p>
          <button className="px-12 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-110 border-2 border-white/50">
            Découvrir ✨
          </button>
        </div>
      </section>
    </div>
  );
}