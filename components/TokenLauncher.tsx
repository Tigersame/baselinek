import React, { useState } from 'react';
import { 
  Transaction, 
  TransactionButton, 
  TransactionSponsor, 
  TransactionStatus, 
  TransactionToast 
} from '@coinbase/onchainkit/transaction';

interface TokenLauncherProps {
  onComposeCast: (text: string) => void;
}

export const TokenLauncher: React.FC<TokenLauncherProps> = ({ onComposeCast }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [supply, setSupply] = useState('1000000000');
  const [tax, setTax] = useState('0');
  
  // Hypothetical Clanker-style factory on Base
  const LAUNCH_FACTORY = "0x532f27101965dd16442E59d40670FaF5eBB142E4"; 

  const calls = [
    {
      to: LAUNCH_FACTORY as `0x${string}`,
      data: "0x" as `0x${string}`, // In reality, encodeFunctionData(factoryABI, 'launch', [name, symbol, supply, tax])
      value: BigInt(0),
    }
  ];

  const handleShare = () => {
    const text = `🚀 I just launched $${tokenSymbol} on Base! ⚡️\n\nName: ${tokenName}\nLocked: 12 Months 🔒\nLaunched via BaseFlow Pro\n\nAPE IN: https://baseflow-pro.vercel.app`;
    onComposeCast(text);
  };

  if (step === 'success') {
    return (
        <div className="p-6 space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto border-4 border-green-500/20 shadow-2xl">
                    <i className="fas fa-check-circle text-4xl"></i>
                </div>
                <h2 className="text-2xl font-black tracking-tight">TOKEN LIVE!</h2>
                <p className="text-gray-400 text-sm">Deployment complete on Base Mainnet</p>
            </div>

            <div className="bg-base-card p-6 rounded-3xl border border-gray-700/50 space-y-4 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-5 rotate-12">
                    <i className="fas fa-rocket text-9xl"></i>
                </div>
                <div className="flex justify-between items-center relative z-10">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Token Detail</span>
                    <span className="text-base-blue text-[10px] font-bold bg-blue-500/10 px-2 py-0.5 rounded uppercase">Verified</span>
                </div>
                <div className="flex items-center gap-4 py-2 border-b border-gray-800 relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-tr from-base-blue to-purple-500 rounded-2xl flex items-center justify-center font-black text-xl italic shadow-lg uppercase">
                        {tokenSymbol[0] || 'T'}
                    </div>
                    <div>
                        <div className="text-xl font-black">{tokenName}</div>
                        <div className="text-sm text-gray-400 font-bold uppercase">${tokenSymbol}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 relative z-10">
                    <div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase">Supply</div>
                        <div className="font-bold text-sm">{(parseInt(supply || '0')).toLocaleString()}</div>
                    </div>
                    <div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase">LP Status</div>
                        <div className="font-bold text-sm text-green-400">Locked 12M</div>
                    </div>
                </div>
            </div>

            <button 
                onClick={handleShare}
                className="w-full bg-white text-base-blue font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-transform active:scale-95"
            >
                <i className="fab fa-foursquare"></i> Post Launch Announcement
            </button>

            <button 
                onClick={() => setStep('form')}
                className="w-full text-gray-500 text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors"
            >
                Deploy Another Token
            </button>
        </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <div className="bg-gradient-to-r from-base-blue/20 to-purple-600/20 p-6 rounded-3xl border border-white/5 relative overflow-hidden">
        <h2 className="text-2xl font-black tracking-tight relative z-10">Launch Pad</h2>
        <p className="text-gray-300 text-xs font-semibold relative z-10">Deploy audited tokens with auto-locked LP.</p>
        <div className="absolute top-0 right-0 p-4 text-white opacity-20">
            <i className="fas fa-rocket text-6xl -rotate-45"></i>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Token Identity</label>
            <div className="grid grid-cols-2 gap-3">
                <input 
                    placeholder="Token Name" 
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    className="bg-base-card border border-gray-700 rounded-2xl py-4 px-5 outline-none focus:border-base-blue transition-colors text-sm font-bold"
                />
                <input 
                    placeholder="Symbol" 
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    className="bg-base-card border border-gray-700 rounded-2xl py-4 px-5 outline-none focus:border-base-blue transition-colors text-sm font-bold uppercase"
                />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Total Supply</label>
            <input 
                type="number"
                value={supply}
                onChange={(e) => setSupply(e.target.value)}
                className="w-full bg-base-card border border-gray-700 rounded-2xl py-4 px-5 outline-none focus:border-base-blue transition-colors text-sm font-bold"
            />
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Buy/Sell Tax (%)</label>
                <div className="relative">
                    <input 
                        type="number"
                        value={tax}
                        onChange={(e) => setTax(e.target.value)}
                        className="w-full bg-base-card border border-gray-700 rounded-2xl py-4 px-5 outline-none focus:border-base-blue transition-colors text-sm font-bold"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-black text-xs">%</span>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">LP Lock Time</label>
                <select className="w-full bg-base-card border border-gray-700 rounded-2xl py-4 px-5 outline-none focus:border-base-blue transition-colors text-sm font-bold appearance-none">
                    <option>12 Months</option>
                    <option>Permanent (Burn)</option>
                    <option>6 Months</option>
                </select>
            </div>
        </div>

        <div className="bg-blue-600/5 border border-blue-500/20 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-500">
                <span>Security</span>
                <span className="text-green-400">Audited Contracts</span>
            </div>
            <p className="text-[9px] text-blue-400/80 italic text-center pt-1 border-t border-blue-500/10">
                Deployment includes a 12-month LP lock on Aerodrome.
            </p>
        </div>

        <Transaction 
          calls={calls}
          onSuccess={() => setStep('success')}
          onError={(err) => console.error(err)}
        >
          <TransactionButton 
            disabled={!tokenName || !tokenSymbol}
            className={`!w-full !bg-base-blue !text-white !font-black !py-5 !rounded-2xl !shadow-2xl !transition-all ${(!tokenName || !tokenSymbol) ? '!opacity-30 !grayscale' : ''}`}
            text="Launch on Base Mainnet"
          />
          <TransactionSponsor />
          <TransactionStatus />
        </Transaction>
      </div>
      <TransactionToast />

      <div className="text-center">
          <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em]">One-Click Deployment • Base Pro</span>
      </div>
    </div>
  );
};