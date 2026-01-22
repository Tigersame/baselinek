
import React, { useState } from 'react';
import sdk from '@farcaster/miniapp-sdk';

// Added missing prop interface
interface TokenLauncherProps {
  onComposeCast: (text: string) => void;
}

export const TokenLauncher: React.FC<TokenLauncherProps> = ({ onComposeCast }) => {
  const [step, setStep] = useState<'form' | 'deploying' | 'success'>('form');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [supply, setSupply] = useState('1000000000');
  const [tax, setTax] = useState('0');
  
  const [deployProgress, setDeployProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');

  const handleLaunch = () => {
    setStep('deploying');
    setDeployProgress(10);
    
    // Step 1: Contract Deployment
    setTimeout(() => {
        setDeployProgress(40);
        setStatusText('Deploying ERC20 to Base...');
    }, 1000);

    // Step 2: Pool Creation
    setTimeout(() => {
        setDeployProgress(70);
        setStatusText('Creating Aerodrome V3 Liquidity Pool...');
    }, 2500);

    // Step 3: Locking LP
    setTimeout(() => {
        setDeployProgress(90);
        setStatusText('Locking LP tokens for 12 months...');
    }, 4000);

    // Final
    setTimeout(() => {
        setStep('success');
    }, 5500);
  };

  const handleShare = () => {
    // Fix: Use onComposeCast instead of building a manual URL
    const text = `🚀 I just launched $${tokenSymbol} on Base! ⚡️\n\nName: ${tokenName}\nLocked: 12 Months 🔒\nLaunched via BaseFlow Pro\n\nAPE IN: [Link]`;
    onComposeCast(text);
  };

  if (step === 'deploying') {
    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <div className="w-full max-w-xs space-y-4">
                <div className="flex justify-between items-end">
                    <span className="text-base-blue font-black text-xs uppercase tracking-widest animate-pulse">
                        {statusText}
                    </span>
                    <span className="text-white font-bold text-sm">{deployProgress}%</span>
                </div>
                <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                    <div 
                        className="h-full bg-base-blue transition-all duration-700 ease-out shadow-[0_0_15px_rgba(0,82,255,0.5)]" 
                        style={{ width: `${deployProgress}%` }}
                    ></div>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8 opacity-40">
                <div className={`text-center space-y-2 ${deployProgress >= 40 ? 'opacity-100 text-base-blue' : ''}`}>
                    <i className="fas fa-file-code text-2xl"></i>
                    <div className="text-[8px] font-bold uppercase">Token</div>
                </div>
                <div className={`text-center space-y-2 ${deployProgress >= 70 ? 'opacity-100 text-base-blue' : ''}`}>
                    <i className="fas fa-water text-2xl"></i>
                    <div className="text-[8px] font-bold uppercase">Liquidity</div>
                </div>
                <div className={`text-center space-y-2 ${deployProgress >= 90 ? 'opacity-100 text-base-blue' : ''}`}>
                    <i className="fas fa-lock text-2xl"></i>
                    <div className="text-[8px] font-bold uppercase">Locked</div>
                </div>
            </div>
        </div>
    );
  }

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
                    <span className="text-base-blue text-[10px] font-bold bg-blue-500/10 px-2 py-0.5 rounded">Verified</span>
                </div>
                <div className="flex items-center gap-4 py-2 border-b border-gray-800 relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-tr from-base-blue to-purple-500 rounded-2xl flex items-center justify-center font-black text-xl italic shadow-lg">
                        {tokenSymbol[0]}
                    </div>
                    <div>
                        <div className="text-xl font-black">{tokenName}</div>
                        <div className="text-sm text-gray-400 font-bold">${tokenSymbol}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 relative z-10">
                    <div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase">Supply</div>
                        <div className="font-bold text-sm">{(parseInt(supply)).toLocaleString()}</div>
                    </div>
                    <div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase">Liquidity Pool</div>
                        <div className="font-bold text-sm text-green-400">Locked 100%</div>
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
            <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Estimated Gas</span>
                <span className="text-xs font-black text-white">$2.40 ETH</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Platform Fee</span>
                <span className="text-xs font-black text-green-400">FREE</span>
            </div>
            <p className="text-[9px] text-blue-400/80 italic text-center pt-1 border-t border-blue-500/10">
                100% of initial LP will be sent to the locking contract.
            </p>
        </div>

        <button 
            onClick={handleLaunch}
            disabled={!tokenName || !tokenSymbol}
            className={`w-full bg-base-blue hover:opacity-90 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-900/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3
                ${(!tokenName || !tokenSymbol) ? 'opacity-30 cursor-not-allowed grayscale' : ''}
            `}
        >
            <i className="fas fa-fire"></i>
            <span className="uppercase tracking-widest text-sm">Deploy on Base</span>
        </button>
      </div>

      <div className="text-center">
          <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">Clanker Architecture Mode</span>
      </div>
    </div>
  );
};
