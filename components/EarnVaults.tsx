import React, { useState } from 'react';
import { MOCK_VAULTS } from '../constants';
import { Vault } from '../types';
import { 
  Transaction, 
  TransactionButton, 
  TransactionSponsor, 
  TransactionStatus, 
  TransactionToast 
} from '@coinbase/onchainkit/transaction';
import { parseUnits } from 'viem';

interface EarnVaultsProps {
  onOpenUrl: (url: string) => void;
}

export const EarnVaults: React.FC<EarnVaultsProps> = ({ onOpenUrl }) => {
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [depositAmount, setDepositAmount] = useState('');

  // Mock contract address for Morpho Vault or similar DeFi strategy
  const VAULT_CONTRACT = "0x8e833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // Hypothetical vault

  const calls = [
    {
      to: VAULT_CONTRACT as `0x${string}`,
      data: "0x" as `0x${string}`, // In reality, this would be encodeFunctionData for deposit
      value: BigInt(0),
    }
  ];

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <div className="bg-gradient-to-br from-green-900/40 to-base-blue/40 p-6 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>
        <h2 className="text-2xl font-black tracking-tight relative z-10">Base Earn</h2>
        <p className="text-gray-300 text-xs font-semibold relative z-10">DeFi yield simplified by OnchainKit.</p>
        
        <div className="flex gap-4 mt-4 relative z-10">
          <div className="bg-black/30 backdrop-blur px-3 py-1.5 rounded-xl border border-white/5">
            <span className="text-[9px] text-gray-400 block font-bold uppercase">Total TVL</span>
            <span className="font-black text-sm">$13.9M</span>
          </div>
          <div className="bg-black/30 backdrop-blur px-3 py-1.5 rounded-xl border border-white/5">
            <span className="text-[9px] text-gray-400 block font-bold uppercase">Avg APY</span>
            <span className="font-black text-sm text-green-400">18.4%</span>
          </div>
        </div>
      </div>

      <div className="bg-base-card p-3 rounded-2xl border border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-plug text-xs text-blue-400"></i>
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Powered by Morpho Blue</span>
          </div>
          <span onClick={() => onOpenUrl('https://morpho.org')} className="text-[10px] text-blue-400 font-bold underline cursor-pointer">
            View Protocol
          </span>
      </div>

      <div className="space-y-4">
        {MOCK_VAULTS.map((vault) => (
          <div key={vault.id} onClick={() => setSelectedVault(vault)} className="bg-base-card p-5 rounded-3xl border border-gray-800 hover:border-green-500/50 transition-all cursor-pointer group shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <i className="fas fa-shield-halved text-6xl"></i>
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <img src={vault.logo} className="w-12 h-12 rounded-2xl shadow-lg border border-gray-700 object-cover" alt={vault.name} />
                <div>
                  <h4 className="font-black text-lg group-hover:text-green-400 transition-colors">{vault.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{vault.asset}</span>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                        vault.risk === 'Low' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        vault.risk === 'Med' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {vault.risk} Risk
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-green-400 leading-none">{vault.apy}%</div>
                <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Net APY</div>
              </div>
            </div>
            <div className="bg-black/20 p-3 rounded-2xl flex justify-between items-center text-xs">
                <span className="text-gray-500 font-bold uppercase text-[9px]">Strategy</span>
                <span className="text-gray-300 font-medium truncate ml-4 italic">{vault.strategy}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedVault && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-base-card border border-gray-700 rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-bounce-in">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <img src={selectedVault.logo} className="w-10 h-10 rounded-xl" />
                        <div>
                            <h3 className="font-black text-xl">{selectedVault.name}</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase">Vault: {selectedVault.asset}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedVault(null)} className="text-gray-500 hover:text-white transition-colors">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="bg-base-dark p-4 rounded-2xl border border-gray-700 shadow-inner">
                        <div className="flex justify-between text-[10px] text-gray-500 font-black uppercase mb-2">
                            <span>Amount to Deposit</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input 
                                type="number" 
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                placeholder="0.00"
                                className="bg-transparent text-3xl font-black w-full outline-none text-white placeholder-gray-800"
                            />
                            <span className="font-black text-gray-500">{selectedVault.asset}</span>
                        </div>
                    </div>

                    <div className="space-y-3 p-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500 font-bold uppercase">Yield Projection</span>
                            <span className="text-green-400 font-black">~${(parseFloat(depositAmount || '0') * 3200 * selectedVault.apy / 100).toFixed(2)}/yr</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500 font-bold uppercase">Status</span>
                            <span className="text-white font-black italic">Onchain Direct</span>
                        </div>
                    </div>

                    <Transaction 
                      calls={calls}
                      onSuccess={() => {
                        setSelectedVault(null);
                        setDepositAmount('');
                      }}
                      onError={(err) => console.error(err)}
                    >
                      <TransactionButton 
                        disabled={!depositAmount}
                        className={`!w-full !bg-green-500 !text-base-dark !font-black !py-5 !rounded-2xl !shadow-xl !transition-all ${!depositAmount ? '!opacity-50 !grayscale' : ''}`} 
                        text="Deposit & Earn"
                      />
                      <TransactionSponsor />
                      <TransactionStatus />
                    </Transaction>
                    
                    <p className="text-[8px] text-gray-600 text-center uppercase tracking-widest font-black">
                        Funds are fully non-custodial and can be withdrawn anytime.
                    </p>
                </div>
            </div>
            <TransactionToast />
        </div>
      )}

      <div className="text-center text-[9px] text-gray-600 font-black uppercase tracking-[0.4em] pt-4">
        Audited DeFi Strategies • Base Mainnet
      </div>
    </div>
  );
};