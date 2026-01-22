import React from 'react';
import { MOCK_BASKETS } from '../constants';

export const IndexLauncher: React.FC = () => {
  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl relative overflow-hidden">
        <h2 className="text-2xl font-black tracking-tight">Index Studio</h2>
        <p className="text-gray-400 text-xs font-bold">Invest in themed baskets with one click.</p>
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fas fa-layer-group text-6xl"></i>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_BASKETS.map(basket => (
          <div key={basket.id} className="bg-base-card p-5 rounded-3xl border border-gray-800 hover:border-indigo-500 transition-all group shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-indigo-500/20">
                  <i className={basket.icon}></i>
                </div>
                <div>
                  <h4 className="font-black text-lg group-hover:text-indigo-400 transition-colors">{basket.name}</h4>
                  <p className="text-[9px] text-gray-500 font-bold uppercase">By {basket.creator}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-black text-xl">+{basket.performance7d}%</div>
                <div className="text-[9px] text-gray-500 font-bold uppercase">7d Perf</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {basket.tokens.map(t => (
                <span key={t} className="bg-black/40 px-2 py-1 rounded-lg text-[10px] font-black border border-white/5 text-gray-400">
                  {t}
                </span>
              ))}
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl text-xs transition-all active:scale-95 shadow-lg shadow-indigo-900/30">
              Buy Basket
            </button>
          </div>
        ))}

        <button className="w-full bg-gray-800 border-2 border-dashed border-gray-700 p-6 rounded-3xl text-gray-500 font-black uppercase tracking-widest text-[10px] hover:border-indigo-500 hover:text-indigo-400 transition-all flex flex-col items-center gap-2">
            <i className="fas fa-plus-circle text-xl"></i>
            Create New Basket
        </button>
      </div>
    </div>
  );
};