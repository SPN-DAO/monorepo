import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { erc20ABI, useAccount, useContractRead } from "wagmi";

import PageTransition from "~~/components/PageTransition";
import { SpendToken } from "~~/oldContracts";

export default function UserHome() {
  const { address } = useAccount();

  const balanceQuery = useContractRead({
    // TODO: Replace with new contract address
    address: SpendToken.polygonMumbai as `0x${string}`,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [address || "0x0"],
    enabled: !!address,
  });

  console.log("address", address);

  const router = useRouter();

  useEffect(() => {
    if (address && !balanceQuery.isLoading) {
      if (balanceQuery.data && balanceQuery.data.gt(0)) {
        void router.replace("/user/dashboard");
      }

      if (balanceQuery.data && balanceQuery.data.lte(0)) {
        void router.replace("/user/onboarding/no-token");
      }
    }
  }, [address, balanceQuery.data, balanceQuery.isLoading, router]);

  if (!address && router.isReady) {
    void router.replace("/user/onboarding/not-connected");
  }

  if (balanceQuery.isError) {
    return (
      <PageTransition>
        <Center h="100vh">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            flex={1}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Error loading your token balance
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              We&apos;re sorry, an error occurred while loading your token
              balance. Please try again or contact support.
            </AlertDescription>
          </Alert>
        </Center>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Center h="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    </PageTransition>
  );
}
