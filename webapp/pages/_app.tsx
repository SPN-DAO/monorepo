import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  localhost,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import theme from "~~/styles/theme";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const { chains, provider, webSocketProvider } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [localhost, goerli]
      : []),
    mainnet,
    polygon,
    optimism,
    arbitrum,
  ],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider theme={theme}>
        <RainbowKitProvider chains={chains}>
          <Flex minH="100vh" direction="column" w="full">
            {getLayout(<Component {...pageProps} />)}
          </Flex>
        </RainbowKitProvider>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;
