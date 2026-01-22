import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: AppView.HUB, icon: 'fas fa-th-large', label: 'Hub' },
    { id: AppView.SWAP, icon: 'fas fa-exchange-alt', label: 'Swap' },
    { id: AppView.COPY_TRADE, icon: 'fas fa-users', label: 'Copy' },
    { id: AppView.PORTFOLIO, icon: 'fas fa-wallet', label: 'Assets' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-dark/95 backdrop-blur-xl border-t border-gray-800 pb-safe pt-2 px-4 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center max-w-lg mx-auto h-14">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`flex flex-col items-center justify-center w-16 transition-all duration-300 ${
                isActive ? 'text-base-blue scale-105' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`text-xl mb-1 transition-transform ${isActive ? 'translate-y-[-2px]' : ''}`}>
                <i className={item.icon}></i>
              </div>
              <span className="text-[9px] font-black tracking-tighter uppercase">{item.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 bg-base-blue rounded-full mt-1 animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};