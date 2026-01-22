import React, { useState } from 'react';
import { 
  Transaction, 
  TransactionButton, 
  TransactionSponsor, 
  TransactionStatus, 
  TransactionToast 
} from '@coinbase/onchainkit/transaction';

export const PerpsInterface: React.FC = () => {
  const [leverage, setLeverage] = useState(5);
  const [side, setSide] = useState<'Long' | 'Short'>('Long');
  const [amount, setAmount] = useState('');

  // Hypothetical perps contract on Base (like GMX/Synthetix)
  const PERPS_CONTRACT = "0x1234567890123456789012345678901234567890";

  const calls = [
    {
      to: PERPS_CONTRACT as `0x${string}`,
      data: "0x" as `0x${string}`, // encodeFunctionData for openPosition
      value: BigInt(0),
    }
  ];

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <div className="bg-gradient-to-r from-red-900/30 to-base-blue/20 p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
        <h2 className="text-3xl font-black tracking-tight uppercase italic leading-none">Leverage Pro</h2>
        <p className="text-gray-400 text-[10px] font-black uppercase mt-2 tracking-widest">Advanced Onchain Perpetuals</p>
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 scale-150">
            <i className="fas fa-chart-line text-[8rem]"></i>
        </div>
      </div>

      <div className="bg-base-card p-6 rounded-[2.5rem] border border-gray-800 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-base-blue rounded-2xl flex items-center justify-center font-black text-xl italic shadow-lg">E</div>
            <div>
                <div className="font-black text-xl uppercase italic">ETH / USD</div>
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Base Perpetual</div>
            </div>
        </div>
        <div className="text-right">
            <div className="text-2xl font-black tracking-tighter">$3,204.50</div>
            <div className="text-[10px] text-green-400 font-black uppercase">Live Index</div>
        </div>
      </div>

      <div className="bg-base-card p-8 rounded-[2.5rem] border border-gray-800 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="flex bg-gray-900/50 p-1.5 rounded-2xl border border-gray-800 shadow-inner relative z-10">
            <button 
                onClick={() => setSide('Long')}
                className={`flex-1 py-4 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${side === 'Long' ? 'bg-green-500 text-base-dark shadow-lg' : 'text-gray-500'}`}
            >
                LONG
            </button>
            <button 
                onClick={() => setSide('Short')}
                className={`flex-1 py-4 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${side === 'Short' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-500'}`}
            >
                SHORT
            </button>
        </div>

        <div className="space-y-6 relative z-10">
            <div className="bg-base-dark p-6 rounded-[1.75rem] border border-gray-800 shadow-inner">
                <div className="flex justify-between text-[10px] text-gray-500 font-black uppercase mb-3 px-1 tracking-widest">
                    <span>Margin Amount</span>
                    <span>USDC</span>
                </div>
                <div className="flex justify-between items-center">
                    <input 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-transparent text-3xl font-black outline-none w-full text-white placeholder-gray-800" 
                      placeholder="0.00" 
                    />
                    <div className="text-[10px] font-black text-gray-600 bg-gray-800 px-2 py-1 rounded">MAX</div>
                </div>
            </div>

            <div className="space-y-4 px-1">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Leverage Intensity</span>
                    <span className="text-white font-black text-xs bg-gray-800 px-3 py-1 rounded-full border border-gray-700">{leverage}x</span>
                </div>
                <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={leverage} 
                    onChange={(e) => setLeverage(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-800 rounded-full appearance-none accent-base-blue cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-gray-600 font-black uppercase tracking-widest">
                    <span>1x (Safety)</span>
                    <span>20x (Degen)</span>
                </div>
            </div>

            <div className="p-6 bg-gray-900/40 rounded-[1.75rem] border border-gray-800 space-y-4 shadow-inner">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-500">Liquidation Price</span>
                    <span className="text-red-400 font-black">${(3204.50 * (1 - (1/leverage))).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-500">Size (Leveraged)</span>
                    <span className="text-white font-black">${(parseFloat(amount || '0') * leverage).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-500">Protocol Fee</span>
                    <span className="text-green-400 font-black">SPONSORED</span>
                </div>
            </div>

            <Transaction calls={calls} onSuccess={() => alert(`${side} position opened!`)}>
              <TransactionButton 
                disabled={!amount}
                className={`!w-full !font-black !py-6 !rounded-3xl !shadow-2xl !transition-all active:!scale-[0.98] !text-xs !uppercase !tracking-[0.2em] !border-0 ${
                    side === 'Long' ? '!bg-green-500 !text-base-dark !shadow-green-900/40' : '!bg-red-500 !text-white !shadow-red-900/40'
                } ${!amount ? '!opacity-30' : ''}`}
                text={`Open ${side} ${leverage}x`}
              />
              <TransactionSponsor />
              <TransactionStatus />
            </Transaction>
        </div>
      </div>
      <TransactionToast />
      
      <div className="text-center pt-2">
          <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em]">Zero-Latency Execution • Base Mainnet</p>
      </div>
    </div>
  );
};