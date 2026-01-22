import React from 'react';
import { TokenImage } from '@coinbase/onchainkit/token';
import { Name } from '@coinbase/onchainkit/identity';
import { MOCK_PORTFOLIO } from '../constants';

interface PortfolioProps {
  onComposeCast: (text: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onComposeCast }) => {
  const totalValue = MOCK_PORTFOLIO.reduce((acc, curr) => acc + curr.valueUSD, 0);
  const handleSharePnL = () => {
    onComposeCast(`📈 Portfolio Check on BaseFlow Pro! ⚡️\n\n💰 Net Worth: $${totalValue.toLocaleString()}\n🚀 Top Holding: ${MOCK_PORTFOLIO[0].token.symbol}\n\nView Assets: https://baseflow-pro.vercel.app`);
  };

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-base-blue flex items-center justify-center font-black italic shadow-lg">B</div>
              <div>
                  <Name address="0x123...456" className="font-black text-lg text-white" />
                  <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Base Voyager</div>
              </div>
          </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-[2.5rem] border border-gray-700 shadow-2xl relative overflow-hidden">
        <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Total Assets</div>
        <div className="text-4xl font-black text-white tracking-tighter">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-700/50">
           <div>
             <div className="text-[9px] text-gray-500 font-black uppercase">24h Gain</div>
             <div className="text-green-400 font-black text-lg">+$142.50</div>
           </div>
           <div>
             <div className="text-[9px] text-gray-500 font-black uppercase">Gas Saved</div>
             <div className="text-blue-400 font-black text-lg">$8.20</div>
           </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Holdings</h3>
        {MOCK_PORTFOLIO.map((pos) => (
          <div key={pos.token.symbol} className="bg-base-card p-4 rounded-[1.75rem] border border-gray-800/50 flex justify-between items-center group hover:border-base-blue/30 transition-all shadow-lg">
            <div className="flex items-center gap-3">
               <TokenImage token={{ ...pos.token, address: pos.token.address as `0x${string}`, image: pos.token.logoURI, chainId: 8453 }} size={48} className="!rounded-2xl shadow-xl" />
               <div>
                  <div className="font-black text-lg group-hover:text-base-blue transition-colors leading-tight uppercase">{pos.token.symbol}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">{pos.amount.toLocaleString()} Units</div>
               </div>
            </div>
            <div className="text-right">
              <div className="font-black text-lg leading-none">${pos.valueUSD.toLocaleString()}</div>
              <div className={`text-[11px] font-black mt-1 ${pos.pnlPercent >= 0 ? 'text-green-400' : 'text-error'}`}>{pos.pnlPercent}%</div>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={handleSharePnL} className="w-full bg-base-blue/10 border-2 border-dashed border-base-blue/20 rounded-[2rem] p-6 flex flex-col items-center gap-2 hover:border-base-blue transition-all">
          <i className="fas fa-camera text-xl text-base-blue"></i>
          <span className="font-black text-xs uppercase text-white">Generate PnL Card</span>
      </button>
    </div>
  );
};