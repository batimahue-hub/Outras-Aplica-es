import React, { useState } from 'react';

const MetricCard = ({ title, value, icon, color, description, isLow }) => {
  return (
    <div className={`relative p-4 md:p-6 flex flex-col items-center justify-between transition-all duration-500 overflow-hidden group
      border-2 ${isLow ? 'border-red-900/50 bg-red-950/10' : 'border-[#1A1A1E] bg-[#0A0A08]'}`}
      style={{
        boxShadow: `inset 0 0 40px -20px ${color}40`,
      }}
    >
      {/* Efeito de aquarela a sangrar ao fundo (Watercolor bleed) */}
      <div 
        className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 60%)`,
          filter: 'url(#watercolor-bleed)'
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Contentor do ícone com filtro de tinta da china (nanquim) irregular */}
        <div 
          className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ filter: 'url(#rough-ink)' }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {icon}
          </svg>
        </div>

        <h3 className="font-serif text-lg tracking-widest uppercase text-gray-300 mb-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          {title}
        </h3>
        
        {/* Barra de progresso a imitar uma pincelada irregular */}
        <div className="w-full h-3 bg-[#1A1A1E] mt-3 relative overflow-hidden" style={{ filter: 'url(#rough-ink)' }}>
          <div 
            className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out"
            style={{ width: `${value}%`, backgroundColor: color }}
          />
        </div>
        
        <p className="mt-4 text-xs text-center text-gray-500 font-sans tracking-wide leading-relaxed px-2">
          {description}
        </p>
      </div>
      
      {/* Indicador de Valor */}
      <div className="absolute top-2 right-3 font-mono text-sm opacity-50" style={{ color: color }}>
        {value}%
      </div>
    </div>
  );
};

export default function App() {
  // Estados para simular a mudança in-game
  const [metrics, setMetrics] = useState({
    sintonia: 65,
    tensao: 80,
    creditos: 30,
    estrutura: 45
  });

  const randomizeMetrics = () => {
    setMetrics({
      sintonia: Math.floor(Math.random() * 100),
      tensao: Math.floor(Math.random() * 100),
      creditos: Math.floor(Math.random() * 100),
      estrutura: Math.floor(Math.random() * 100),
    });
  };

  return (
    <div className="min-h-screen bg-[#050508] text-gray-200 p-6 flex flex-col items-center justify-center" style={{ backgroundImage: 'radial-gradient(circle at center, #0A0A08 0%, #050508 100%)' }}>
      
      {/* DEFINIÇÕES DE FILTROS SVG (ESSENCIAL PARA A IDENTIDADE VISUAL DO JOGO) */}
      <svg className="hidden">
        <defs>
          {/* Filtro para Tinta da China irregular (Expressionismo) */}
          <filter id="rough-ink">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* Filtro para mancha de Aquarela (Watercolor bleed) */}
          <filter id="watercolor-bleed">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
      </svg>

      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif tracking-[0.2em] text-[#E8E4F0] uppercase mb-2" style={{ filter: 'url(#rough-ink)' }}>
            New Guanabara <span className="text-[#C17F3A]">2117</span>
          </h1>
          <p className="text-[#00C8D4] font-mono text-sm tracking-widest opacity-70 uppercase">
            Sistema de Monitorização // Módulo LK-7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <MetricCard 
            title="Sintonia" 
            value={metrics.sintonia}
            color="#C17F3A" // Âmbar Humano (O Lodo)
            description="Coesão social, empatia e a força do Coletivo Lodo Vivo. O calor que resiste."
            isLow={metrics.sintonia < 20}
            icon={
              // Traços orgânicos, entrelaçados como uma chama ou mãos unidas
              <path d="M12 22c5-4 8-9 8-13A8 8 0 004 9c0 4 3 9 8 13zM12 14a3 3 0 100-6 3 3 0 000 6z" />
            }
          />

          <MetricCard 
            title="Tensão" 
            value={metrics.tensao}
            color="#8B1A1A" // Vermelho Vigilância (Lima&Souza)
            description="Opressão corporativa, risco de repressão tática e vigilância da A Malha."
            isLow={metrics.tensao > 85} // Tensão alta é ruim
            icon={
              // Olho fragmentado, afiado, remetendo a vigilância
              <g>
                <path d="M2 12c0 0 4-7 10-7s10 7 10 7-4 7-10 7-10-7-10-7z" />
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="#8B1A1A" fillOpacity="0.3" />
                <line x1="12" y1="3" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="21" />
                <line x1="4" y1="5" x2="6" y2="7" />
              </g>
            }
          />

          <MetricCard 
            title="Créditos" 
            value={metrics.creditos}
            color="#00C8D4" // Ciano Opal (Dados/A Malha)
            description="Recursos, dados biométricos traficáveis e influência comercial."
            isLow={metrics.creditos < 20}
            icon={
              // Hexágono com veias de datachip, impessoal e corporativo
              <g>
                <polygon points="12 2 22 7 22 17 12 22 2 17 2 7" />
                <polyline points="2 7 12 12 22 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
                <circle cx="12" cy="12" r="2" fill="#00C8D4" fillOpacity="0.5"/>
              </g>
            }
          />

          <MetricCard 
            title="Estrutura" 
            value={metrics.estrutura}
            color="#2D4A2D" // Cinza/Verde Concreto Vivo (Lodo/Plataforma)
            description="Integridade dos suportes do LK-7, gambiarras e arquitetura brutalista."
            isLow={metrics.estrutura < 20}
            icon={
              // Arquitetura brutalista pesada, pilares sob peso
              <g>
                <rect x="3" y="4" width="18" height="4" />
                <rect x="5" y="8" width="4" height="12" />
                <rect x="15" y="8" width="4" height="12" />
                <line x1="2" y1="20" x2="22" y2="20" />
                <line x1="5" y1="14" x2="19" y2="14" strokeDasharray="2 2" />
              </g>
            }
          />

        </div>

        <div className="mt-12 flex justify-center">
          <button 
            onClick={randomizeMetrics}
            className="px-6 py-2 border border-[#C17F3A] text-[#C17F3A] font-mono uppercase text-sm tracking-widest hover:bg-[#C17F3A] hover:text-[#0A0A08] transition-colors duration-300 focus:outline-none"
            style={{ filter: 'url(#rough-ink)' }}
          >
            Simular Turno
          </button>
        </div>
      </div>
    </div>
  );
}
