import React, { useState } from 'react';
import { MOCK_DROPS } from '../constants';

interface CreatorStudioProps {
  onComposeCast: (text: string) => void;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({ onComposeCast }) => {
  const [view, setView] = useState<'explore' | 'create' | 'success'>('explore');
  const [title, setTitle] = useState('');
  
  const handleCreate = () => setView('success');
  const handleShareDrop = (dropTitle: string) => {
    onComposeCast(`🎨 New Drop: "${dropTitle}" on Base! ⚡️\n\nMint exclusively via BaseFlow Pro.\n\n[Launch Page Link]`);
  };

  if (view === 'success') {
    return (
        <div className="p-6 text-center space-y-6 animate-fade-in">
            <div className="w-24 h-24 bg-base-blue/20 text-base-blue rounded-full flex items-center justify-center mx-auto border-4 border-base-blue/10">
                <i className="fas fa-magic text-4xl"></i>
            </div>
            <h2 className="text-3xl font-black">Drop Published!</h2>
            <p className="text-gray-400">Your NFT collection is live on Base and ready for the Farcaster feed.</p>
            <button 
                onClick={() => handleShareDrop(title || 'New Art')}
                className="w-full bg-base-blue text-white font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
                <i className="fab fa-foursquare"></i> Share to Feed
            </button>
            <button onClick={() => setView('explore')} className="text-gray-500 text-xs font-black uppercase tracking-widest">Back to Studio</button>
        </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <div className="flex gap-4 border-b border-gray-800 pb-2">
        <button onClick={() => setView('explore')} className={`text-sm font-black uppercase tracking-widest ${view === 'explore' ? 'text-white border-b-2 border-base-blue pb-2' : 'text-gray-500'}`}>Explore</button>
        <button onClick={() => setView('create')} className={`text-sm font-black uppercase tracking-widest ${view === 'create' ? 'text-white border-b-2 border-base-blue pb-2' : 'text-gray-500'}`}>Create</button>
      </div>

      {view === 'explore' ? (
          <div className="grid gap-6">
              {MOCK_DROPS.map(drop => (
                  <div key={drop.id} className="bg-base-card rounded-3xl border border-gray-800 overflow-hidden group shadow-xl">
                      <img src={drop.imageUrl} className="w-full h-64 object-cover" alt={drop.title} />
                      <div className="p-4 space-y-3">
                          <div className="flex justify-between items-center">
                              <div>
                                  <h4 className="font-black text-lg">{drop.title}</h4>
                                  <p className="text-gray-500 text-xs font-bold">By {drop.creator}</p>
                              </div>
                              <div className="text-right">
                                  <div className="font-black text-base-blue">{drop.price} ETH</div>
                              </div>
                          </div>
                          <button onClick={() => alert('Minting coming soon!')} className="w-full bg-white text-base-dark font-black py-3 rounded-xl">Mint Now</button>
                      </div>
                  </div>
              ))}
          </div>
      ) : (
          <div className="space-y-6">
              <div className="bg-base-card border-2 border-dashed border-gray-700 rounded-3xl p-12 text-center hover:border-base-blue transition-all cursor-pointer">
                  <i className="fas fa-plus text-2xl text-gray-500 mb-2"></i>
                  <h4 className="font-black text-sm uppercase">Upload Artwork</h4>
              </div>
              <div className="space-y-4">
                  <input placeholder="Drop Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-base-card border border-gray-700 rounded-2xl py-4 px-5 outline-none focus:border-base-blue font-bold" />
                  <button onClick={handleCreate} disabled={!title} className="w-full bg-base-blue text-white font-black py-5 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3">Create Drop</button>
              </div>
          </div>
      )}
    </div>
  );
};