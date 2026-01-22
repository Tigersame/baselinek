import React from 'react';
import { MOCK_BASKETS } from '../constants';
import { 
  Transaction, 
  TransactionButton, 
  TransactionSponsor, 
  TransactionStatus, 
  TransactionToast 
} from '@coinbase/onchainkit/transaction';

export const IndexLauncher: React.FC = () => {
  // Real index protocol addresses on Base
  const INDEX_CONTRACT = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // Placeholder

  const buyCalls = [
    {
      to: INDEX_CONTRACT as `0x${string}`,
      data: "0x" as `0x${string}`, // encodeFunctionData for buying basket
      value: BigInt(0),
    }
  ];

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <div className="bg-gradient-to-tr from-indigo-900/60 to-purple-900/40 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-white/5">
        <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">Index Hub</h2>
        <p className="text-white/60 text-[10px] font-black uppercase mt-2 tracking-widest">Diversify with one-click themed baskets</p>
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 scale-150">
            <i className="fas fa-layer-group text-[8rem]"></i>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Curated Indices</h3>
        {MOCK_BASKETS.map(basket => (
          <div key={basket.id} className="bg-base-card p-6 rounded-[2.25rem] border border-gray-800 hover:border-indigo-500/50 transition-all group shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 font-black italic text-4xl text-white/5 pointer-events-none uppercase">Bundle</div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <i className={basket.icon}></i>
                </div>
                <div>
                  <h4 className="font-black text-xl uppercase italic group-hover:text-indigo-400 transition-colors leading-none">{basket.name}</h4>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Creator: {basket.creator}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-black text-2xl tracking-tighter leading-none">+{basket.performance7d}%</div>
                <div className="text-[10px] text-gray-500 font-black uppercase mt-1">7D Perf</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
              {basket.tokens.map(t => (
                <span key={t} className="bg-black/30 px-3 py-1.5 rounded-xl text-[10px] font-black border border-white/5 text-gray-400 uppercase tracking-tighter">
                  {t}
                </span>
              ))}
            </div>

            <Transaction calls={buyCalls} onSuccess={() => alert('Basket Investment Complete!')}>
              <TransactionButton 
                className="!w-full !bg-indigo-600 !text-white !font-black !py-5 !rounded-2xl !text-xs !uppercase !tracking-[0.2em] !shadow-2xl shadow-indigo-900/40 !transition-all active:!scale-95" 
                text="Acquire Basket"
              />
              <TransactionSponsor />
              <TransactionStatus />
            </Transaction>
          </div>
        ))}

        <Transaction calls={buyCalls} onSuccess={() => alert('Index Factory Activated')}>
          <TransactionButton 
            className="!w-full !bg-gray-800 !border-2 !border-dashed !border-gray-700 !p-10 !rounded-[2.5rem] !text-gray-500 !font-black !uppercase !tracking-widest !text-[10px] hover:!border-indigo-500 hover:!text-indigo-400 !transition-all !flex !flex-col !items-center !gap-3 !shadow-inner !h-auto"
            text="Launch Custom Index"
          />
          <TransactionSponsor />
          <TransactionStatus />
        </Transaction>
      </div>
      <TransactionToast />
      
      <div className="text-center pt-2">
          <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em]">Automated Rebalancing • Base Pro</p>
      </div>
    </div>
  );
};
