import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { goerli } from "viem/dist/types/chains";
import { publicProvider } from "wagmi/providers/public";
import { Titillium_Web } from "next/font/google";
const titillium_web = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const { publicClient, webSocketPublicClient } = configureChains(
  [goerli, mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
