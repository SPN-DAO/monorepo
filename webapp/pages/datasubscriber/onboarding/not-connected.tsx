import { Box, Button, Center, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import OnBoardingCard from "~~/components/OnBoardingCard";
import OnBoardingContentPiece from "~~/components/OnBoardingContentPiece";
import OnBoardingHeaderComponent from "~~/components/OnBoardingHeaderComponent";

const OnboardingNotConnected = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      void router.push("/user/dashboard");
    }
  }, [isConnected, router]);

  return (
    <>
      <Head>
        <title>SPN DAO - Onboarding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center
        sx={{
          flex: 1,
        }}
      >
        <OnBoardingCard
          width={"90%"}
          alignSelf={"center"}
          prependedContent={
            <VStack spacing={6}>
              <OnBoardingHeaderComponent
                title="DALN"
                description="Harvest data insights & stay compliant"
              />
              <Button colorScheme="blue" size="md">
                Comming soon
              </Button>
            </VStack>
          }
        >
          <Box flex="1">
            <OnBoardingContentPiece
              textAlign="start"
              title="Control your data"
              content="Have true ownership and governance in the data economy"
              mb={10}
            />
            <OnBoardingContentPiece
              textAlign="start"
              title="Get rewards"
              content="Get rewards in Matic whenever your data is decrypted"
              mb={10}
            />
            <OnBoardingContentPiece
              textAlign="start"
              title="Preserve privacy"
              content="Pool your anonymized transaction data with other DAO members"
            />
          </Box>
          <Box flex="1">
            {/* TODO: Add svg component. KEVIN Which is the best way to do this in REACT? */}
          </Box>
        </OnBoardingCard>
      </Center>
    </>
  );
};

export default OnboardingNotConnected;
