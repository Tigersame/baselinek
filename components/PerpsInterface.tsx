import React, { useState } from 'react';

export const PerpsInterface: React.FC = () => {
  const [leverage, setLeverage] = useState(5);
  const [side, setSide] = useState<'Long' | 'Short'>('Long');

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      {/* Asset Picker & Price */}
      <div className="bg-base-card p-5 rounded-3xl border border-gray-800 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-black">E</div>
            <div>
                <div className="font-black text-lg">ETH / USD</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Perpetual</div>
            </div>
        </div>
        <div className="text-right">
            <div className="text-xl font-black tracking-tighter">$3,204.50</div>
            <div className="text-[10px] text-green-400 font-black">+2.45%</div>
        </div>
      </div>

      {/* Trade Logic */}
      <div className="bg-base-card p-6 rounded-3xl border border-gray-800 space-y-6 shadow-2xl">
        <div className="flex bg-gray-900/50 p-1 rounded-xl border border-gray-800">
            <button 
                onClick={() => setSide('Long')}
                className={`flex-1 py-3 rounded-lg text-xs font-black transition-all ${side === 'Long' ? 'bg-green-500 text-base-dark' : 'text-gray-500'}`}
            >
                LONG
            </button>
            <button 
                onClick={() => setSide('Short')}
                className={`flex-1 py-3 rounded-lg text-xs font-black transition-all ${side === 'Short' ? 'bg-red-500 text-white' : 'text-gray-500'}`}
            >
                SHORT
            </button>
        </div>

        <div className="space-y-4">
            <div className="bg-base-dark p-4 rounded-2xl border border-gray-800">
                <div className="flex justify-between text-[10px] text-gray-500 font-black uppercase mb-2">
                    <span>Pay</span>
                    <span>Bal: 1,452.00 USDC</span>
                </div>
                <div className="flex justify-between items-center">
                    <input className="bg-transparent text-2xl font-black outline-none w-full" placeholder="0.00" />
                    <span className="font-black text-gray-400">USDC</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-500">
                    <span>Leverage Slider</span>
                    <span className="text-white bg-gray-800 px-2 py-0.5 rounded border border-gray-700">{leverage}x</span>
                </div>
                <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={leverage} 
                    onChange={(e) => setLeverage(parseInt(e.target.value))}
                    className="w-full accent-base-blue"
                />
                <div className="flex justify-between text-[8px] text-gray-600 font-black uppercase">
                    <span>1x</span>
                    <span>20x</span>
                </div>
            </div>

            <div className="p-4 bg-gray-900/20 rounded-2xl border border-gray-800 space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase">
                    <span className="text-gray-500">Liquidation Price</span>
                    <span className="text-red-400">$2,840.20</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase">
                    <span className="text-gray-500">Entry Price</span>
                    <span className="text-white">$3,204.50</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase">
                    <span className="text-gray-500">Fee</span>
                    <span className="text-white">$1.20</span>
                </div>
            </div>

            <button 
                className={`w-full font-black py-5 rounded-2xl shadow-xl transition-all active:scale-[0.98] ${
                    side === 'Long' ? 'bg-green-500 text-base-dark shadow-green-900/20' : 'bg-red-500 text-white shadow-red-900/20'
                }`}
            >
                Open {side}
            </button>
        </div>
      </div>
    </div>
  );
};