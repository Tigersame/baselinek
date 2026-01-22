import { Token, Trader, Route, PortfolioPosition, NFTDrop, Vault, IndexBasket } from './types';

export const BASE_TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    logoURI: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a635305444d7503cc8c9f3000970b72049e2469/32/color/eth.png',
    price: 3200.50,
    balance: 1.45
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    decimals: 6,
    logoURI: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a635305444d7503cc8c9f3000970b72049e2469/32/color/usdc.png',
    price: 1.00,
    balance: 540.20
  },
  {
    symbol: 'DEGEN',
    name: 'Degen',
    address: '0x4ed4E862860beD51a9570b96d89a4e1769484cEd',
    decimals: 18,
    logoURI: 'https://picsum.photos/id/3/200',
    price: 0.024,
    balance: 15000
  },
  {
    symbol: 'BRETT',
    name: 'Brett',
    address: '0x532f27101965dd16442E59d40670FaF5eBB142E4',
    decimals: 18,
    logoURI: 'https://picsum.photos/id/4/200',
    price: 0.12,
    balance: 0
  }
];

export const MOCK_VAULTS: Vault[] = [
  {
    id: 'v1',
    name: 'Stable Yield Plus',
    asset: 'USDC',
    apy: 8.4,
    tvl: 4200000,
    risk: 'Low',
    strategy: 'Aave V3 Lending + Aerodrome LP Rewards',
    logo: 'https://picsum.photos/seed/usdc/200'
  },
  {
    id: 'v2',
    name: 'ETH LST Aggregator',
    asset: 'ETH',
    apy: 12.1,
    tvl: 8500000,
    risk: 'Med',
    strategy: 'wstETH/cbETH Leverage Loop on Moonwell',
    logo: 'https://picsum.photos/seed/eth/200'
  }
];

export const MOCK_TRADERS: Trader[] = [
  {
    id: '1',
    ens: 'basegod.eth',
    address: '0x123...456',
    pnl30d: 450.2,
    winRate: 78,
    followers: 12400,
    topToken: 'DEGEN',
    riskScore: 'Med'
  },
  {
    id: '2',
    ens: 'memeking.eth',
    address: '0x789...012',
    pnl30d: 1205.5,
    winRate: 62,
    followers: 8500,
    topToken: 'BRETT',
    riskScore: 'High'
  }
];

export const MOCK_ROUTES: Route[] = [
  { id: '1', protocol: 'Aerodrome', outputAmount: 1450.20, gasCostUSD: 0.15, best: true, mevProtected: false },
  { id: '2', protocol: 'Uniswap v3', outputAmount: 1448.50, gasCostUSD: 0.45, best: false, mevProtected: true },
  { id: '3', protocol: '0x', outputAmount: 1449.10, gasCostUSD: 0.25, best: false, mevProtected: true },
];

export const MOCK_PORTFOLIO: PortfolioPosition[] = [
  {
    token: BASE_TOKENS[0],
    amount: 1.45,
    valueUSD: 4640.72,
    pnlPercent: 12.5,
    avgEntry: 2800
  },
  {
    token: BASE_TOKENS[2],
    amount: 15000,
    valueUSD: 360.00,
    pnlPercent: -5.2,
    avgEntry: 0.025
  }
];

export const MOCK_BASKETS: IndexBasket[] = [
  {
    id: 'i1',
    name: 'Base Memes Index',
    tokens: ['BRETT', 'DEGEN', 'KEYCAT'],
    performance7d: 24.5,
    creator: 'jesse.base',
    icon: 'fas fa-dog'
  },
  {
    id: 'i2',
    name: 'AI Agent Basket',
    tokens: ['VIRTUAL', 'LUNA', 'GOAT'],
    performance7d: 112.8,
    creator: 'clanker.eth',
    icon: 'fas fa-robot'
  }
];

export const MOCK_DROPS: NFTDrop[] = [
  {
    id: '1',
    title: 'Base Summer Vibes',
    creator: 'jesse.base',
    imageUrl: 'https://picsum.photos/seed/base1/600/600',
    price: 0.001,
    minted: 1420,
    totalSupply: 5000
  }
];