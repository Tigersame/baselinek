import React, { useState, useMemo } from 'react';
import { 
  Swap, 
  SwapAmountInput, 
  SwapToggleButton, 
  SwapButton, 
  SwapMessage, 
  SwapToast, 
  SwapSettings 
} from '@coinbase/onchainkit/swap'; 
import { BASE_TOKENS, MOCK_ROUTES } from '../constants';
import { Route } from '../types';

interface SwapInterfaceProps {
  onComposeCast: (text: string) => void;
}

export const SwapInterface: React.FC<SwapInterfaceProps> = ({ onComposeCast }) => {
  const [activeTab, setActiveTab] = useState<'Swap' | 'Limit' | 'TWAP'>('Swap');
  const [isMevProtected, setIsMevProtected] = useState<boolean>(true);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(MOCK_ROUTES[0].id);
  const [slippage, setSlippage] = useState<string>('0.5');
  const [customSlippage, setCustomSlippage] = useState<string>('');
  const [showCustomSlippage, setShowCustomSlippage] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  
  // TWAP Specific State
  const [twapDuration, setTwapDuration] = useState<string>('1h');
  const [twapIntervals, setTwapIntervals] = useState<number>(4);

  const ockTokens = BASE_TOKENS.map(t => ({
    name: t.name,
    address: t.address as `0x${string}`,
    symbol: t.symbol,
    decimals: t.decimals,
    image: t.logoURI,
    chainId: 8453,
  }));

  const slippageValue = showCustomSlippage ? customSlippage : slippage;

  const optimizedRoutes = useMemo(() => {
    let routes = [...MOCK_ROUTES];
    if (isMevProtected) {
      routes.sort((a, b) => {
        if (a.mevProtected && !b.mevProtected) return -1;
        if (!a.mevProtected && b.mevProtected) return 1;
        return a.gasCostUSD - b.gasCostUSD;
      });
    } else {
      routes.sort((a, b) => b.outputAmount - a.outputAmount);
    }
    return routes;
  }, [isMevProtected]);

  const maxOutput = useMemo(() => Math.max(...MOCK_ROUTES.map(r => r.outputAmount)), []);
  const minGas = useMemo(() => Math.min(...MOCK_ROUTES.map(r => r.gasCostUSD)), []);

  const selectedRoute = useMemo(() => 
    optimizedRoutes.find(r => r.id === selectedRouteId) || optimizedRoutes[0]
  , [selectedRouteId, optimizedRoutes]);

  const handleSuccess = (tx: any) => {
    setShowConfirmModal(false);
    const mevText = isMevProtected ? "🛡 MEV Shield: ACTIVE" : "⚡️ Speed Mode: Public";
    if (activeTab === 'TWAP') {
      onComposeCast(`⏳ TWAP Order Initialized on BaseFlow Pro! ⚡️\n\n🛡 Protocol: ${selectedRoute.protocol}\n🕒 Duration: ${twapDuration}\n🔄 Parts: ${twapIntervals}\n\nAutomate your accumulation: https://baseflow-pro.vercel.app`);
    } else {
      onComposeCast(`🚀 Pro Swap completed via ${selectedRoute.protocol} on BaseFlow Pro! ⚡️\n\n${mevText}\n⛽ Gas: $${selectedRoute.gasCostUSD}\n📉 Slippage: ${slippageValue}%\n\nTrade like a pro: https://baseflow-pro.vercel.app`);
    }
  };

  const renderTwapConfig = () => (
    <div className="space-y-4 animate-fade-in mt-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-base-dark/50 p-4 rounded-2xl border border-gray-800">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Total Duration</label>
          <select 
            value={twapDuration}
            onChange={(e) => setTwapDuration(e.target.value)}
            className="w-full bg-transparent outline-none font-black text-sm text-white appearance-none cursor-pointer"
          >
            <option value="1h">1 Hour</option>
            <option value="4h">4 Hours</option>
            <option value="12h">12 Hours</option>
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
          </select>
        </div>
        <div className="bg-base-dark/50 p-4 rounded-2xl border border-gray-800">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Trade Parts</label>
          <div className="flex items-center justify-between">
            <button onClick={() => setTwapIntervals(Math.max(2, twapIntervals - 1))} className="text-base-blue"><i className="fas fa-minus-circle"></i></button>
            <span className="font-black text-sm text-white">{twapIntervals}</span>
            <button onClick={() => setTwapIntervals(Math.min(20, twapIntervals + 1))} className="text-base-blue"><i className="fas fa-plus-circle"></i></button>
          </div>
        </div>
      </div>
      <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-2xl text-center">
        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-tight">
          Executing {twapIntervals} smaller orders over {twapDuration} to minimize price impact.
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-5 pb-24 animate-fade-in">
      {/* View Switcher */}
      <div className="flex bg-gray-800/30 p-1 rounded-2xl border border-gray-800 shadow-inner">
        {(['Swap', 'Limit', 'TWAP']).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-500 hover:text-gray-400'}`}
            >
              {tab}
            </button>
        ))}
      </div>

      {/* Execution & Slippage Controls */}
      <div className="space-y-3">
        <div className={`p-4 rounded-3xl border transition-all duration-500 flex items-center justify-between shadow-xl ${
            isMevProtected ? 'bg-base-blue/5 border-base-blue/30' : 'bg-orange-500/5 border-orange-500/20'
        }`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isMevProtected ? 'bg-base-blue text-white shadow-[0_0_20px_rgba(0,82,255,0.3)]' : 'bg-gray-800 text-gray-500'
                }`}>
                    <i className={`fas ${isMevProtected ? 'fa-shield-halved text-xl' : 'fa-bolt-lightning text-xl'} ${isMevProtected ? 'animate-pulse' : ''}`}></i>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Execution Strategy</span>
                    </div>
                    <div className="text-sm font-black text-white">
                        {isMevProtected ? 'MEV Protection Active' : 'Maximum Speed Routing'}
                    </div>
                </div>
            </div>
            
            <button 
                onClick={() => setIsMevProtected(!isMevProtected)}
                className={`w-14 h-7 rounded-full relative transition-all duration-500 shadow-inner overflow-hidden ${
                    isMevProtected ? 'bg-base-blue' : 'bg-gray-700'
                }`}
            >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-500 ease-in-out ${
                    isMevProtected ? 'left-8' : 'left-1'
                }`}></div>
            </button>
        </div>

        {activeTab !== 'TWAP' && (
          <div className="bg-base-card border border-gray-800 p-5 rounded-[2rem] space-y-4 shadow-xl">
              <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                      <i className="fas fa-sliders-h text-base-blue text-xs"></i>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Slippage Tolerance</span>
                  </div>
                  <span className="text-[10px] font-black text-white bg-gray-800 px-2 py-0.5 rounded border border-gray-700">
                      {slippageValue || '0'}%
                  </span>
              </div>
              
              <div className="flex gap-2">
                  {['0.5', '1.0', '2.0'].map((val) => (
                      <button
                          key={val}
                          onClick={() => {
                              setSlippage(val);
                              setShowCustomSlippage(false);
                          }}
                          className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all border ${
                              !showCustomSlippage && slippage === val 
                              ? 'bg-base-blue border-base-blue text-white shadow-lg shadow-blue-900/20' 
                              : 'bg-gray-800 border-gray-700 text-gray-500'
                          }`}
                      >
                          {val}%
                      </button>
                  ))}
                  <button
                      onClick={() => setShowCustomSlippage(true)}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all border ${
                          showCustomSlippage 
                          ? 'bg-base-blue border-base-blue text-white' 
                          : 'bg-gray-800 border-gray-700 text-gray-500'
                      }`}
                  >
                      Custom
                  </button>
              </div>

              {showCustomSlippage && (
                  <div className="relative animate-fade-in">
                      <input 
                          type="number" 
                          value={customSlippage}
                          onChange={(e) => setCustomSlippage(e.target.value)}
                          placeholder="Enter percentage..."
                          className="w-full bg-base-dark border border-base-blue/30 rounded-xl py-3 px-4 outline-none text-xs font-black text-white placeholder-gray-700 focus:border-base-blue transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-base-blue">%</span>
                  </div>
              )}
          </div>
        )}
      </div>

      {/* Main Swap Component */}
      <div className="bg-base-card rounded-[2.5rem] p-2 border border-gray-800 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <i className={`fas ${activeTab === 'TWAP' ? 'fa-clock' : 'fa-exchange-alt'} text-[10rem] -rotate-12`}></i>
        </div>

        <Swap 
          onSuccess={handleSuccess}
          className="!bg-transparent !border-0 !p-2"
        >
          <div className="space-y-1 relative z-10">
            <div className="bg-base-dark/50 p-5 rounded-[2rem] border border-gray-800 focus-within:border-base-blue transition-all shadow-inner">
                <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 px-1">
                    <span>{activeTab === 'TWAP' ? 'Total to Sell' : 'From'}</span>
                </div>
                <SwapAmountInput
                  label="Sell"
                  swappableTokens={ockTokens}
                  type="from"
                  className="!bg-transparent !p-0 !border-0"
                />
            </div>

            <div className="flex justify-center -my-6 relative z-20">
                <div className="bg-base-dark border-[10px] border-base-dark rounded-3xl p-1 shadow-2xl transition-transform hover:scale-110">
                    <SwapToggleButton className="!bg-gray-800 !p-4 !rounded-2xl hover:!rotate-180 !transition-all !duration-500 !border-0 !text-base-blue shadow-lg" />
                </div>
            </div>

            <div className="bg-base-dark/50 p-5 rounded-[2rem] border border-gray-800 focus-within:border-base-blue transition-all shadow-inner">
                <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 px-1">
                    <span>{activeTab === 'TWAP' ? 'Target Token' : 'To'}</span>
                </div>
                <SwapAmountInput
                  label="Buy"
                  swappableTokens={ockTokens}
                  type="to"
                  className="!bg-transparent !p-0 !border-0"
                />
            </div>

            {activeTab === 'TWAP' && renderTwapConfig()}
          </div>

          <div className="mt-8 px-2 pb-2">
            <button 
              onClick={() => setShowConfirmModal(true)}
              className={`w-full text-white font-black py-6 rounded-3xl shadow-2xl transition-all border-0 active:scale-[0.98] ${
                activeTab === 'TWAP' ? 'bg-indigo-600 shadow-indigo-900/40' : 'bg-base-blue shadow-blue-900/40'
              }`}
            >
              Review {activeTab}
            </button>
            
            <div className="flex items-center justify-center gap-4 mt-5">
                <SwapMessage className="!text-[10px] !font-bold !text-gray-500 !text-center uppercase tracking-[0.3em]" />
                <div className="h-px w-8 bg-gray-800"></div>
                <SwapSettings className="!bg-transparent !p-0 !border-0 !shadow-none">
                    <span className="text-[10px] font-black text-base-blue uppercase cursor-pointer hover:underline">Settings</span>
                </SwapSettings>
            </div>
          </div>

          {/* Confirmation Modal */}
          {showConfirmModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
              <div className="bg-base-card w-full max-w-sm rounded-[3rem] border border-gray-700 p-8 shadow-[0_0_80px_rgba(0,82,255,0.2)] animate-bounce-in relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                   <i className="fas fa-file-invoice-dollar text-9xl"></i>
                </div>

                <div className="flex justify-between items-center mb-6 relative z-10">
                  <h3 className="text-2xl font-black italic uppercase text-white">Review Swap</h3>
                  <button onClick={() => setShowConfirmModal(false)} className="text-gray-500 hover:text-white transition-colors">
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Summary Card */}
                  <div className="bg-base-dark/80 p-6 rounded-[2rem] border border-gray-700 shadow-inner space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Protocol</span>
                      <span className="text-xs font-black text-white uppercase bg-gray-800 px-2 py-1 rounded border border-gray-700">
                        {selectedRoute.protocol}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Est. Output</span>
                      <span className="text-sm font-black text-green-400">
                        {selectedRoute.outputAmount.toFixed(2)} Target
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Gas Fees</span>
                      <span className="text-xs font-black text-blue-400">
                        ${selectedRoute.gasCostUSD}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Slippage</span>
                      <span className="text-xs font-black text-white">
                        {slippageValue}%
                      </span>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Security</span>
                      <div className="flex items-center gap-1.5">
                        <i className={`fas fa-shield-halved text-[10px] ${isMevProtected ? 'text-purple-400' : 'text-gray-600'}`}></i>
                        <span className={`text-[9px] font-black uppercase ${isMevProtected ? 'text-purple-400' : 'text-gray-600'}`}>
                          {isMevProtected ? 'MEV SHIELD' : 'PUBLIC'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <SwapButton className="!bg-base-blue !text-white !font-black !py-6 !rounded-3xl !shadow-2xl shadow-blue-900/40 !border-0 active:!scale-[0.98] !transition-all !w-full" />
                    <button 
                      onClick={() => setShowConfirmModal(false)}
                      className="w-full bg-gray-800 text-gray-400 font-black py-4 rounded-3xl text-[11px] uppercase tracking-widest border border-gray-700 active:scale-95 transition-all"
                    >
                      Back to Edit
                    </button>
                  </div>

                  <p className="text-[8px] text-gray-600 text-center uppercase tracking-widest font-black leading-normal">
                    By confirming, you authorize the smart contract to execute the swap on your behalf via the {selectedRoute.protocol} route.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Swap>
      </div>

      {/* Enhanced Route Optimizer & Comparison */}
      <div className="space-y-4 animate-slide-up">
        <div className="flex justify-between items-center px-1">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Route Analytics</h3>
            <span className="text-[9px] text-base-blue font-bold uppercase animate-pulse">Scanning Protocols...</span>
        </div>

        <div className="space-y-3">
            {optimizedRoutes.map((route) => {
                const isSelected = selectedRouteId === route.id;
                const priceMatch = route.outputAmount === maxOutput;
                const gasMatch = route.gasCostUSD === minGas;
                
                // Mock Efficiency Score calculation for visualization
                const efficiencyScore = ((route.outputAmount / maxOutput) * 60) + ((minGas / route.gasCostUSD) * 20) + (route.mevProtected ? 20 : 0);

                return (
                    <button
                        key={route.id}
                        onClick={() => setSelectedRouteId(route.id)}
                        className={`w-full p-5 rounded-[2rem] border transition-all relative overflow-hidden group ${
                            isSelected 
                            ? 'bg-base-blue/10 border-base-blue shadow-2xl ring-1 ring-base-blue/50' 
                            : 'bg-base-card border-gray-800 hover:border-gray-700'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner ${
                                    isSelected ? 'bg-base-blue border-base-blue text-white' : 'bg-gray-800 border-gray-700 text-gray-400'
                                }`}>
                                    <i className={route.protocol === 'Aerodrome' ? 'fas fa-wind' : route.protocol === 'Uniswap v3' ? 'fas fa-horse' : route.protocol === '0x' ? 'fas fa-cube' : 'fas fa-random'}></i>
                                </div>
                                <div className="text-left">
                                    <div className="font-black text-sm uppercase tracking-tight text-white group-hover:text-base-blue transition-colors">
                                        {route.protocol}
                                    </div>
                                    <div className="flex gap-1.5 mt-1">
                                        {priceMatch && <span className="bg-green-500/20 text-green-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter border border-green-500/20">Best Price</span>}
                                        {gasMatch && <span className="bg-blue-500/20 text-blue-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter border border-blue-500/20">Low Gas</span>}
                                        {route.mevProtected && <span className="bg-purple-500/20 text-purple-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter border border-purple-500/20">Protected</span>}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <div className={`font-black text-lg tracking-tighter leading-none ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                                    {route.outputAmount.toFixed(2)}
                                </div>
                                <div className="text-[9px] text-gray-500 font-bold uppercase mt-1">Est. Receive</div>
                            </div>
                        </div>

                        {/* Visual Trade-off Graph (Simplified Bar) */}
                        <div className="space-y-2 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700 shadow-inner">
                                    <div 
                                        className={`h-full transition-all duration-1000 ${isSelected ? 'bg-base-blue' : 'bg-gray-600'}`}
                                        style={{ width: `${efficiencyScore}%` }}
                                    ></div>
                                </div>
                                <span className="text-[9px] font-black text-gray-500 w-24 text-right uppercase">Efficiency Score</span>
                            </div>
                            
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-600 px-1 pt-1 border-t border-white/5">
                                <span>Gas: ${route.gasCostUSD}</span>
                                <span>Impact: &lt;0.01%</span>
                                <span className={route.mevProtected ? 'text-purple-400' : ''}>{route.mevProtected ? 'Private RPC' : 'Public Mempool'}</span>
                            </div>
                        </div>

                        {isSelected && (
                            <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
                                <i className="fas fa-check-circle text-6xl"></i>
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
      </div>

      <SwapToast className="!fixed !bottom-24 !left-4 !right-4 !z-50 !bg-base-card !border !border-gray-700 !rounded-3xl !shadow-2xl !p-6 animate-slide-up" />

      <div className="text-center pt-2">
        <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em]">Aggregating Industry Standards • Base Mainnet</p>
      </div>
    </div>
  );
};
