import React, { useEffect, useState, useCallback } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SwapInterface } from './components/SwapInterface';
import { CopyTrader } from './components/CopyTrader';
import { Portfolio } from './components/Portfolio';
import { TokenLauncher } from './components/TokenLauncher';
import { EarnVaults } from './components/EarnVaults';
import { CreatorStudio } from './components/CreatorStudio';
import { Hub } from './components/Hub';
import { IndexLauncher } from './components/IndexLauncher';
import { PerpsInterface } from './components/PerpsInterface';
import { Navbar } from './components/Navbar';
import { AppView } from './types';

// Use standard Wagmi config for Base Mainnet
const wagmiConfig = createConfig({
  chains: [base],
  transports: { [base.id]: http() },
});

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HUB);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const ctx = await sdk.context;
        setContext(ctx);
        // Required call for Farcaster MiniApp to display
        await sdk.actions.ready();
      } catch (e) {
        console.warn('MiniApp SDK init error:', e);
      }
    };
    init();
  }, []);

  const handleOpenUrl = useCallback((url: string) => {
    try {
      sdk.actions.openUrl(url);
    } catch (e) {
      window.open(url, '_blank');
    }
  }, []);

  const handleComposeCast = useCallback((text: string) => {
    try {
      sdk.actions.composeCast({ text });
    } catch (e) {
      console.warn('Compose cast failed:', e);
    }
  }, []);

  const renderView = () => {
    switch (currentView) {
      case AppView.HUB:
        return <Hub onNavigate={setCurrentView} onComposeCast={handleComposeCast} />;
      case AppView.SWAP:
        return <SwapInterface onComposeCast={handleComposeCast} />;
      case AppView.COPY_TRADE:
        return <CopyTrader onComposeCast={handleComposeCast} onOpenUrl={handleOpenUrl} />;
      case AppView.LAUNCH:
        return <TokenLauncher onComposeCast={handleComposeCast} />;
      case AppView.VAULTS:
        return <EarnVaults onOpenUrl={handleOpenUrl} />;
      case AppView.STUDIO:
        return <CreatorStudio onComposeCast={handleComposeCast} />;
      case AppView.INDEX:
        return <IndexLauncher />;
      case AppView.PERPS:
        return <PerpsInterface />;
      case AppView.PORTFOLIO:
        return <Portfolio onComposeCast={handleComposeCast} />;
      default:
        return <Hub onNavigate={setCurrentView} onComposeCast={handleComposeCast} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-dark text-white font-sans selection:bg-base-blue selection:text-white pb-24">
      {/* Header with Connection Status */}
      <div className="fixed top-0 left-0 right-0 bg-base-dark/80 backdrop-blur-xl z-40 px-4 py-3 border-b border-gray-800 flex justify-between items-center shadow-lg pt-safe">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView(AppView.HUB)}>
          <div className="w-8 h-8 bg-gradient-to-tr from-base-blue to-purple-600 rounded-lg flex items-center justify-center font-bold italic shadow-lg shadow-blue-500/20">B</div>
          <span className="font-black text-lg tracking-tight uppercase text-white/90">BaseFlow<span className="text-base-blue">Pro</span></span>
        </div>
        
        <div className="flex items-center gap-2">
          {context?.user?.username && (
            <span className="text-[10px] text-gray-500 font-bold hidden sm:block">@{context.user.username}</span>
          )}
          <div className="bg-gray-800/50 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-gray-700 flex items-center gap-2 shadow-inner">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            {context?.user?.username ? 'Live' : 'Connect'}
          </div>
        </div>
      </div>

      <main className="pt-16 max-w-lg mx-auto min-h-screen">
        {renderView()}
      </main>

      <Navbar currentView={currentView} onChangeView={setCurrentView} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider 
          apiKey={process.env.API_KEY} 
          chain={base}
          schemaId="0x1234567890123456789012345678901234567890" // Placeholder for Identity
        >
          <AppContent />
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;