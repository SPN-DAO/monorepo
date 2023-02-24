import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  HStack,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import OnBoardingCenteredCard from "~~/components/OnBoardingCenteredCard";
import OnBoardingContentPiece from "~~/components/OnBoardingContentPiece";
import OnBoardingHeaderComponent from "~~/components/OnBoardingHeaderComponent";

const OnboardingNotConnected = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      /*       void router.push("/admin/dashboard");
       */
    }
  }, [isConnected, router]);

  return (
    <>
      <Head>
        <title>DALN - Onboarding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <OnBoardingCenteredCard
        prependedContent={
          <>
            <OnBoardingHeaderComponent
              title="DALN"
              description="Be the shepherd for a vibrant data economy"
            />
            <Alert
              justifyContent="center"
              alignSelf="center"
              borderRadius={12}
              status="warning"
              alignItems={"center"}
              mt={6}
            >
              <AlertIcon />
              <AlertTitle color="#DD6B20">Admin NFT</AlertTitle>
              <AlertDescription color="#DD6B20">
                is not detected. Please check your wallet again.
              </AlertDescription>
            </Alert>
          </>
        }
      >
        <HStack mb={20}>
          <OnBoardingContentPiece
            title="Access valuable data"
            content="Access valuable data crowd-sourced by DAO members"
          />
          <OnBoardingContentPiece
            title="Reward DAO members"
            content="Reward DAO members for their contribution to the data economy"
          />

          <OnBoardingContentPiece
            title="Protect data privacy"
            content="Get behavioral insights without compromising data privacy"
          />
        </HStack>

        <Center>
          <ConnectButton />
        </Center>
      </OnBoardingCenteredCard>
    </>
  );
};

export default OnboardingNotConnected;
