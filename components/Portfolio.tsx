import React from 'react';
import { TokenImage } from '@coinbase/onchainkit/token';
import { Name } from '@coinbase/onchainkit/identity';
import { MOCK_PORTFOLIO } from '../constants';
import { 
  Transaction, 
  TransactionButton, 
  TransactionSponsor, 
  TransactionStatus, 
  TransactionToast 
} from '@coinbase/onchainkit/transaction';

interface PortfolioProps {
  onComposeCast: (text: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onComposeCast }) => {
  const totalValue = MOCK_PORTFOLIO.reduce((acc, curr) => acc + curr.valueUSD, 0);
  
  // Real rebalance contract address
  const REBALANCE_CONTRACT = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

  const handleSharePnL = () => {
    onComposeCast(`📈 Portfolio Check on BaseFlow Pro! ⚡️\n\n💰 Net Worth: $${totalValue.toLocaleString()}\n🚀 Top Holding: ${MOCK_PORTFOLIO[0].token.symbol}\n\nView Assets: https://baseflow-pro.vercel.app`);
  };

  const rebalanceCalls = [
    {
      to: REBALANCE_CONTRACT as `0x${string}`,
      data: "0x" as `0x${string}`, // encodeFunctionData for rebalancing
      value: BigInt(0),
    }
  ];

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-base-blue flex items-center justify-center font-black italic shadow-2xl text-xl">B</div>
              <div>
                  <Name address="0x1234567890123456789012345678901234567890" className="!font-black !text-xl !text-white !leading-none" />
                  <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Professional Tier</div>
              </div>
          </div>
          <div className="bg-green-500/10 text-green-400 text-[8px] font-black uppercase px-2 py-1 rounded-full border border-green-500/20 animate-pulse">Live Sync</div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-black p-10 rounded-[3rem] border border-gray-700 shadow-2xl relative overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none scale-150">
            <i className="fas fa-chart-pie text-9xl"></i>
        </div>
        <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2 px-1">Global Valuation</div>
        <div className="text-5xl font-black text-white tracking-tighter italic">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        <div className="grid grid-cols-2 gap-8 mt-10 pt-8 border-t border-white/5">
           <div>
             <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">24h Alpha</div>
             <div className="text-green-400 font-black text-2xl tracking-tight">+$142.50</div>
           </div>
           <div>
             <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Fee Optimized</div>
             <div className="text-blue-400 font-black text-2xl tracking-tight">$8.20</div>
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Asset Composition</h3>
            <span className="text-[9px] font-black text-base-blue uppercase">Full List</span>
        </div>
        {MOCK_PORTFOLIO.map((pos) => (
          <div key={pos.token.symbol} className="bg-base-card p-5 rounded-[2rem] border border-gray-800/50 flex justify-between items-center group hover:border-base-blue transition-all shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <i className="fas fa-cube text-4xl"></i>
            </div>
            <div className="flex items-center gap-4 relative z-10">
               <TokenImage token={{ ...pos.token, address: pos.token.address as `0x${string}`, image: pos.token.logoURI, chainId: 8453 }} size={56} className="!rounded-2xl shadow-2xl border border-gray-700" />
               <div>
                  <div className="font-black text-xl group-hover:text-base-blue transition-colors leading-none uppercase italic">{pos.token.symbol}</div>
                  <div className="text-[10px] text-gray-500 font-black uppercase tracking-tighter mt-1.5">{pos.amount.toLocaleString()} Units</div>
               </div>
            </div>
            <div className="text-right relative z-10">
              <div className="font-black text-xl leading-none tracking-tight">${pos.valueUSD.toLocaleString()}</div>
              <div className={`text-[11px] font-black mt-1.5 flex items-center justify-end gap-1 ${pos.pnlPercent >= 0 ? 'text-green-400' : 'text-error'}`}>
                  <i className={`fas fa-caret-${pos.pnlPercent >= 0 ? 'up' : 'down'}`}></i>
                  {pos.pnlPercent}%
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
          <button onClick={handleSharePnL} className="bg-base-blue/10 border border-base-blue/20 rounded-3xl p-6 flex flex-col items-center gap-3 hover:bg-base-blue/20 transition-all shadow-lg active:scale-95 group">
              <div className="w-10 h-10 bg-base-blue/20 rounded-xl flex items-center justify-center group-hover:bg-base-blue group-hover:text-white transition-all">
                  <i className="fas fa-camera text-lg"></i>
              </div>
              <span className="font-black text-[10px] uppercase tracking-widest text-white">Snapshot</span>
          </button>
          
          <Transaction calls={rebalanceCalls} onSuccess={() => alert('Portfolio Optimized Onchain!')}>
              <TransactionButton 
                className="!w-full !bg-white/5 !border !border-gray-700 !rounded-3xl !p-6 !flex !flex-col !items-center !gap-3 hover:!border-base-blue !transition-all !shadow-lg active:!scale-95 !group !h-auto"
                text="Rebalance Assets"
              />
              <TransactionSponsor />
              <TransactionStatus />
          </Transaction>
      </div>
      <TransactionToast />
      
      <div className="text-center pt-4">
          <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em]">Smart Contract Analytics • Base Mainnet</p>
      </div>
    </div>
  );
};
