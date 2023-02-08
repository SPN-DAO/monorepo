import { Box, Center, Heading, HStack, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import CenteredCard from "~~/components/CenteredCard";

const OnboardingNotConnected = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      void router.push("/user/dashboard");
    }
  }, [isConnected, router]);

  const infoText = (title: string, content: string) => (
    <Box maxW={250} textAlign="center">
      <Heading as="h3" size="md" textAlign="center" mb={2}>
        {title}
      </Heading>
      <Text>{content}</Text>
    </Box>
  );

  return (
    <>
      <Head>
        <title>SPN DAO - Onboarding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CenteredCard
        prependedContent={
          <Box mb={16}>
            <Heading as="h1" size="4xl" textAlign="center" mb={2}>
              SPN DAO
            </Heading>
            <Heading as="h2" size="md" textAlign="center">
              Your data is more valuable than you think
            </Heading>
          </Box>
        }
      >
        <HStack mb={20}>
          {infoText(
            "Control your data",
            "Have true ownership and governance in the data economy"
          )}
          {infoText(
            "Get rewards ",
            "Get rewards in Matic whenever your data is decrypted"
          )}
          {infoText(
            "Preserve privacy",
            "Pool your anonymized transaction data with other DAO members"
          )}
        </HStack>

        <Center>
          <ConnectButton />
        </Center>
      </CenteredCard>
    </>
  );
};

export default OnboardingNotConnected;
