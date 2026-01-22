import React, { useState } from 'react';
import { Name, Avatar, Identity, Socials } from '@coinbase/onchainkit/identity';
import { MOCK_TRADERS } from '../constants';
import { Trader } from '../types';

interface CopyTraderProps {
  onComposeCast: (text: string) => void;
  onOpenUrl: (url: string) => void;
}

export const CopyTrader: React.FC<CopyTraderProps> = ({ onComposeCast, onOpenUrl }) => {
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);

  const handleShareStats = (trader: Trader) => {
    const text = `📈 Mirroring ${trader.ens || trader.address} on BaseFlow Pro! ⚡️\n\n🔥 30d PnL: +${trader.pnl30d}%\n🎯 Win Rate: ${trader.winRate}%\n👥 Join the best on Base.\n\nMirror Alpha: https://baseflow-pro.vercel.app`;
    onComposeCast(text);
  };

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 p-6 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl">
        <h2 className="text-2xl font-black tracking-tight uppercase italic text-white leading-none">Smart Copy</h2>
        <p className="text-white/70 text-[10px] font-black uppercase mt-1 tracking-widest">Mirror professional wallets with OnchainKit trust</p>
        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-45"><i className="fas fa-radar text-8xl"></i></div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Top Tier Traders</h3>
        {MOCK_TRADERS.map((trader, idx) => (
          <div key={trader.id} className="bg-base-card p-6 rounded-[2.25rem] border border-gray-800 hover:border-base-blue transition-all group shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 font-black italic text-4xl text-white/5 pointer-events-none">ALPHA</div>
             <div className="flex justify-between items-start relative z-10">
                <div className="flex gap-4 items-center">
                    <Identity address={trader.address as any} schemaId="0x123..." className="!bg-transparent !p-0">
                        <div className="relative">
                            <Avatar className="!w-14 !h-14 !rounded-2xl border-2 border-gray-700 shadow-2xl" />
                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-base-dark"></div>
                        </div>
                        <div className="ml-4">
                            <Name address={trader.address as any} className="!font-black !text-lg !text-white group-hover:!text-base-blue transition-colors tracking-tighter" />
                            <div className="flex gap-2 items-center">
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{trader.followers.toLocaleString()} Mirrors</span>
                                <span className="text-[9px] text-gray-600">•</span>
                                <span className="text-[9px] text-purple-400 font-bold uppercase">Whale Class</span>
                            </div>
                        </div>
                    </Identity>
                </div>
                <div className="text-right">
                    <div className="text-green-400 font-black text-2xl tracking-tighter leading-none">+{trader.pnl30d}%</div>
                    <div className="text-[9px] text-gray-500 font-black uppercase mt-1">30d Growth</div>
                </div>
             </div>

             <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => setSelectedTrader(trader)} 
                  className="flex-[2] bg-base-blue text-white font-black py-4 rounded-2xl text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                >
                    Link Mirror
                </button>
                <button 
                  onClick={() => handleShareStats(trader)}
                  className="flex-1 bg-gray-800 text-gray-400 font-black py-4 rounded-2xl text-[11px] uppercase tracking-widest border border-gray-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <i className="fas fa-share-nodes"></i>
                </button>
             </div>
          </div>
        ))}
      </div>

      {selectedTrader && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <div className="bg-base-card w-full max-w-sm rounded-[2.5rem] border border-gray-700 p-8 animate-bounce-in shadow-[0_0_80px_rgba(0,82,255,0.2)]">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black italic uppercase text-white">Config Mirror</h3>
                    <button onClick={() => setSelectedTrader(null)} className="text-gray-500 hover:text-white transition-colors"><i className="fas fa-times text-xl"></i></button>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Allocation Limit (USDC)</label>
                        <div className="mt-2 bg-base-dark border border-gray-700 rounded-2xl p-5 shadow-inner">
                            <input type="number" className="bg-transparent w-full outline-none font-black text-2xl text-white placeholder-gray-800" placeholder="500.00" />
                        </div>
                    </div>

                    <div className="bg-blue-600/5 p-4 rounded-2xl border border-blue-500/20 space-y-2">
                         <div className="flex justify-between text-[9px] font-black uppercase text-gray-500">
                             <span>Copying Asset</span>
                             <span className="text-white">{selectedTrader.topToken}</span>
                         </div>
                         <div className="flex justify-between text-[9px] font-black uppercase text-gray-500">
                             <span>Execution Fee</span>
                             <span className="text-green-400">FREE (Sponsored)</span>
                         </div>
                    </div>
                    
                    <button 
                      onClick={() => { alert('Mirror activated via BaseFlow Protocol!'); setSelectedTrader(null); }}
                      className="w-full bg-base-blue text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-900/40 text-xs uppercase tracking-[0.2em] active:scale-95 transition-all"
                    >
                        Activate Protocol
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};