export enum AppView {
  HUB = 'HUB',
  SWAP = 'SWAP',
  COPY_TRADE = 'COPY_TRADE',
  LAUNCH = 'LAUNCH',
  VAULTS = 'VAULTS',
  STUDIO = 'STUDIO',
  INDEX = 'INDEX',
  PERPS = 'PERPS',
  PORTFOLIO = 'PORTFOLIO'
}

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
  price: number;
  balance?: number;
}

export interface Route {
  id: string;
  protocol: 'Aerodrome' | 'Uniswap v3' | '0x' | 'Paraswap';
  outputAmount: number;
  gasCostUSD: number;
  best: boolean;
  mevProtected: boolean;
}

export interface Trader {
  id: string;
  ens?: string;
  address: string;
  pnl30d: number;
  winRate: number;
  followers: number;
  topToken: string;
  riskScore: 'Low' | 'Med' | 'High';
}

export interface PortfolioPosition {
  token: Token;
  amount: number;
  valueUSD: number;
  pnlPercent: number;
  avgEntry: number;
  realizedPnL?: number;
}

export interface Vault {
  id: string;
  name: string;
  asset: string;
  apy: number;
  tvl: number;
  risk: 'Low' | 'Med' | 'High';
  strategy: string;
  logo: string;
}

export interface NFTDrop {
  id: string;
  title: string;
  creator: string;
  imageUrl: string;
  price: number;
  minted: number;
  totalSupply: number;
}

export interface IndexBasket {
  id: string;
  name: string;
  tokens: string[];
  performance7d: number;
  creator: string;
  icon: string;
}