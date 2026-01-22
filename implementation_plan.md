# BaseFlow Pro: Implementation Architecture

## 1. MiniApp Core Setup (Farcaster SDK)
To qualify as a featured MiniApp on the Base app:
*   **Manifest:** Hosted at `/.well-known/farcaster.json` with valid `accountAssociation`.
*   **Embeds:** Implemented dynamic embed metadata in `index.html` for rich social sharing.
*   **SDK Usage:** `sdk.actions.ready()` called immediately on load; `sdk.actions.openUrl()` for external links.

## 2. OnchainKit Integration
We use OnchainKit to power the "Pro" DeFi experience:
*   **Identity:** `Name` and `Socials` components for Trader profiles.
*   **Earn:** Leveraging `useMorphoVault` and `useBuildDepositToMorphoTx` for the Earn Vaults.
*   **Swap:** `useSwapQuote` and `Swap` components with custom **Slippage Tolerance** controls and **MEV Protection** toggles.
*   **Sponsorship:** All user transactions are sponsored via the **Base Paymaster** to ensure zero-friction onboarding.

## 3. Smart Contract Architecture (Foundry)
*   **CopyTrading Vaults:** Modified ERC-4626 for mirroring trades.
*   **Affiliate Router:** Wrapper for 0x/Aerodrome to manage aggregator fees (affiliate revenue).
*   **Token Launcher:** Clanker-style factory that deploys ERC20 + Aerodrome V3 Pool + 12-month LP Lock in a single atomic transaction.

## 4. Backend & Real-time Insights (Ponder + Neynar)
*   **Indexer (Ponder):** Real-time indexing of Base chain events to calculate Trader PnL and Whale alerts.
*   **Notifications (Neynar):** Push notifications to Farcaster users when:
    *   A copied trader opens/closes a position.
    *   A high-yield vault APY increases.
    *   A token launch they are watching goes live.

## 5. Viral Growth Loops
*   **PnL Share Cards:** Dynamic OG images generated for every swap/copy-trade event.
*   **Referral System:** Users earn a % of the aggregator fee for every trade made by users they refer via their unique MiniApp link.
*   **Smart Wallet Onboarding:** Direct integration with Coinbase Smart Wallet via OnchainKit for 1-click account creation.