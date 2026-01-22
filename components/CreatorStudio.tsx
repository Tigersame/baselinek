import React, { useState } from 'react';
import { MOCK_DROPS } from '../constants';
import { 
  Transaction, 
  TransactionButton, 
  TransactionSponsor, 
  TransactionStatus, 
  TransactionToast 
} from '@coinbase/onchainkit/transaction';

interface CreatorStudioProps {
  onComposeCast: (text: string) => void;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({ onComposeCast }) => {
  const [view, setView] = useState<'explore' | 'create' | 'success'>('explore');
  const [title, setTitle] = useState('');
  
  // Real contract addresses for Creator Hub on Base
  const MINT_CONTRACT = "0x4ed4E862860beD51a9570b96d89a4e1769484cEd"; // Placeholder ERC721
  const FACTORY_CONTRACT = "0x532f27101965dd16442E59d40670FaF5eBB142E4";

  const handleShareDrop = (dropTitle: string) => {
    onComposeCast(`🎨 New Drop: "${dropTitle}" on Base! ⚡️\n\nMint exclusively via BaseFlow Pro.\n\n[Launch Page Link]`);
  };

  const createCalls = [
    {
      to: FACTORY_CONTRACT as `0x${string}`,
      data: "0x" as `0x${string}`, // encodeFunctionData for creating a drop
      value: BigInt(0),
    }
  ];

  const mintCalls = [
    {
      to: MINT_CONTRACT as `0x${string}`,
      data: "0x" as `0x${string}`, // encodeFunctionData for minting
      value: BigInt(0),
    }
  ];

  if (view === 'success') {
    return (
        <div className="p-6 text-center space-y-6 animate-fade-in">
            <div className="w-24 h-24 bg-base-blue/20 text-base-blue rounded-full flex items-center justify-center mx-auto border-4 border-base-blue/10 shadow-[0_0_30px_rgba(0,82,255,0.2)]">
                <i className="fas fa-magic text-4xl"></i>
            </div>
            <h2 className="text-3xl font-black italic uppercase">Drop Published!</h2>
            <p className="text-gray-400 text-sm font-bold">Your collection is now live on Base and ready for the feed.</p>
            <button 
                onClick={() => handleShareDrop(title || 'New Art')}
                className="w-full bg-base-blue text-white font-black py-5 rounded-[1.5rem] shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all text-sm uppercase tracking-widest"
            >
                <i className="fab fa-foursquare"></i> Share to Feed
            </button>
            <button onClick={() => setView('explore')} className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors">Back to Studio</button>
        </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <div className="flex gap-6 border-b border-gray-800/50 mb-4 px-2">
        <button onClick={() => setView('explore')} className={`text-[10px] font-black uppercase tracking-[0.25em] pb-3 transition-all ${view === 'explore' ? 'text-white border-b-2 border-base-blue' : 'text-gray-500'}`}>Market</button>
        <button onClick={() => setView('create')} className={`text-[10px] font-black uppercase tracking-[0.25em] pb-3 transition-all ${view === 'create' ? 'text-white border-b-2 border-base-blue' : 'text-gray-500'}`}>Deploy</button>
      </div>

      {view === 'explore' ? (
          <div className="grid gap-6">
              {MOCK_DROPS.map(drop => (
                  <div key={drop.id} className="bg-base-card rounded-[2.5rem] border border-gray-800/50 overflow-hidden group shadow-2xl relative">
                      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">Live Mint</span>
                      </div>
                      <img src={drop.imageUrl} className="w-full h-72 object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" alt={drop.title} />
                      <div className="p-6 space-y-4">
                          <div className="flex justify-between items-center">
                              <div>
                                  <h4 className="font-black text-xl uppercase italic leading-none">{drop.title}</h4>
                                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">Creator: {drop.creator}</p>
                              </div>
                              <div className="text-right">
                                  <div className="font-black text-lg text-base-blue leading-none">{drop.price} ETH</div>
                                  <div className="text-[9px] text-gray-500 font-bold uppercase mt-1">Direct Mint</div>
                              </div>
                          </div>
                          
                          <Transaction calls={mintCalls} onSuccess={() => alert('Successfully minted!')}>
                            <TransactionButton className="!w-full !bg-white !text-base-dark !font-black !py-4 !rounded-2xl !shadow-xl !text-xs !uppercase !tracking-widest !transition-all active:!scale-95" text="Collect Onchain" />
                            <TransactionSponsor />
                            <TransactionStatus />
                          </Transaction>
                      </div>
                  </div>
              ))}
          </div>
      ) : (
          <div className="space-y-6">
              <div className="bg-base-card border-2 border-dashed border-gray-700 rounded-[2.5rem] p-16 text-center hover:border-base-blue transition-all cursor-pointer group shadow-inner">
                  <div className="w-16 h-16 bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-gray-700 group-hover:bg-base-blue group-hover:text-white transition-all">
                    <i className="fas fa-plus text-2xl"></i>
                  </div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">Upload 4K Artwork</h4>
              </div>
              <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Drop Title</label>
                    <input 
                      placeholder="e.g. Summer on Base" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      className="w-full bg-base-card border border-gray-700 rounded-2xl py-5 px-6 outline-none focus:border-base-blue font-black text-sm text-white placeholder-gray-800 transition-colors" 
                    />
                  </div>
                  
                  <Transaction calls={createCalls} onSuccess={() => setView('success')}>
                    <TransactionButton 
                      disabled={!title} 
                      className={`!w-full !bg-base-blue !text-white !font-black !py-6 !rounded-2xl !shadow-2xl !text-xs !uppercase !tracking-[0.2em] !transition-all ${!title ? '!opacity-30' : ''}`} 
                      text="Initialize Contract" 
                    />
                    <TransactionSponsor />
                    <TransactionStatus />
                  </Transaction>
              </div>
          </div>
      )}
      <TransactionToast />
      
      <div className="text-center pt-2">
          <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em]">Zora-Compatible Studio • Base Mainnet</p>
      </div>
    </div>
  );
};