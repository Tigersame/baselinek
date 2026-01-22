import React from 'react';
import { AppView } from '../types';

interface HubProps {
  onNavigate: (view: AppView) => void;
  onComposeCast: (text: string) => void;
}

export const Hub: React.FC<HubProps> = ({ onNavigate, onComposeCast }) => {
  const tools = [
    { id: AppView.SWAP, icon: 'fas fa-bolt', label: 'Pro Swap', desc: 'Best routes & Safety', color: 'blue' },
    { id: AppView.COPY_TRADE, icon: 'fas fa-users-viewfinder', label: 'Copy Trade', desc: 'Mirror Smart Money', color: 'purple' },
    { id: AppView.LAUNCH, icon: 'fas fa-rocket', label: 'Launch Pad', desc: 'One-click Token/LP', color: 'orange' },
    { id: AppView.VAULTS, icon: 'fas fa-vault', label: 'Earn Vaults', desc: 'DeFi Yields', color: 'green' },
    { id: AppView.INDEX, icon: 'fas fa-layer-group', label: 'Index/Baskets', desc: 'Buy Bundles', color: 'indigo' },
    { id: AppView.STUDIO, icon: 'fas fa-palette', label: 'Creator Studio', desc: 'NFT Drops', color: 'pink' },
    { id: AppView.PERPS, icon: 'fas fa-chart-line', label: 'Perps/Leverage', desc: '20x Long/Short', color: 'red' },
    { id: AppView.PORTFOLIO, icon: 'fas fa-pie-chart', label: 'Analytics', desc: 'Insights', color: 'cyan' },
  ];

  const handleShareApp = () => {
    onComposeCast("🚀 I'm using BaseFlow Pro to trade on Base! Best aggregator + Copy Trading inside the Base app. Check it out: https://baseflow-pro.vercel.app");
  };

  return (
    <div className="p-4 space-y-8 pb-24 animate-fade-in">
      <div className="pt-4 px-2 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black tracking-tight leading-none">Command Center</h1>
          <p className="text-gray-500 text-sm font-bold mt-2 italic tracking-tight">Professional onchain infrastructure.</p>
        </div>
        <button 
          onClick={handleShareApp}
          className="w-11 h-11 bg-base-blue/10 text-base-blue rounded-full flex items-center justify-center hover:bg-base-blue hover:text-white transition-all shadow-lg border border-base-blue/20 active:scale-90"
        >
          <i className="fas fa-plus text-lg"></i>
        </button>
      </div>

      {/* Onboarding / Viral Hook */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-2 py-1 rounded-full mb-3 border border-white/10">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase text-white tracking-widest">Base Gasless</span>
          </div>
          <h3 className="text-white font-black text-2xl tracking-tighter">Zero-Gas Trading</h3>
          <p className="text-white/80 text-xs font-semibold leading-tight mt-1 max-w-[80%]">
            First 5 swaps are sponsored via Base Paymaster. Start trading without ETH.
          </p>
          <button 
            onClick={() => onNavigate(AppView.SWAP)}
            className="mt-6 bg-white text-base-blue text-xs font-black uppercase tracking-widest px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
          >
            Launch Terminal <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-700">
           <i className="fas fa-fire-extinguisher text-[12rem] text-white"></i>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onNavigate(tool.id)}
            className="group relative bg-base-card border border-gray-800 rounded-[1.75rem] p-5 text-left transition-all hover:border-base-blue active:scale-95 overflow-hidden shadow-xl"
          >
            <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-xl bg-${tool.color}-500/10 text-${tool.color}-500 border border-${tool.color}-500/20 group-hover:bg-${tool.color}-500 group-hover:text-white transition-all`}>
              <i className={tool.icon}></i>
            </div>
            <h3 className="font-black text-white text-sm uppercase tracking-wide">{tool.label}</h3>
            <p className="text-[10px] text-gray-500 font-bold mt-1 leading-tight">{tool.desc}</p>
            
            <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 -rotate-12">
               <i className={`${tool.icon} text-4xl`}></i>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-[2rem] border border-gray-700 shadow-2xl relative overflow-hidden group cursor-pointer" onClick={() => onNavigate(AppView.COPY_TRADE)}>
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">Alpha Feed</h2>
            <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/alpha${i}/100`} className="w-6 h-6 rounded-full border-2 border-base-dark" />
                ))}
                <div className="w-6 h-6 rounded-full bg-base-blue text-[8px] flex items-center justify-center font-bold border-2 border-base-dark">+12</div>
            </div>
          </div>
          <button className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all">
            <i className="fas fa-chevron-right text-white"></i>
          </button>
        </div>
        <div className="absolute top-0 right-0 p-4 text-white/10 opacity-5 scale-150">
            <i className="fas fa-radar text-9xl"></i>
        </div>
      </div>
    </div>
  );
};