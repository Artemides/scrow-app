import {
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
  sepolia,
} from "wagmi";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { publicProvider } from "wagmi/providers/public";
import { Titillium_Web } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/Layout";
import { ThemeProvider } from "next-themes";
import { hardhat } from "wagmi/chains";

const titillium_web = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia, mainnet, hardhat],
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
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Layout className={titillium_web.className}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
