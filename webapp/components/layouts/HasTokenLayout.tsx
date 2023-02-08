import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useBalance } from "wagmi";

import DelayedProgressBar from "../common/DelayedProgressBar";

interface ConnectedLayoutProps {
  children: React.ReactNode;
}

// This is a layout component that will be used in the pages that require the user to have a token. If the user does not have the token, it will redirect to the token creation page.
const HasTokenLayout = ({ children }: ConnectedLayoutProps) => {
  const balanceQuery = useBalance({
    // TODO: Replace this with the address of the SPN token. Using devdao CODE token for now.
    address: "0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11",
  });
  const router = useRouter();

  useEffect(() => {
    if (balanceQuery.isSuccess && balanceQuery.data?.value.lt(1)) {
      void router.replace("/user/onboarding/no-token");
    }
  }, [balanceQuery.isSuccess, balanceQuery.data, router]);

  if (balanceQuery.isError) {
    return (
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
          We&apos;re sorry, an error occurred while loading your token balance.
          Please try again or contact support.
        </AlertDescription>
      </Alert>
    );
  }

  if (balanceQuery.isSuccess && balanceQuery?.data?.value.gte(1))
    return (
      <Flex minH="100vh" direction="column">
        {children}
      </Flex>
    );

  return <DelayedProgressBar />;
};

export default HasTokenLayout;
