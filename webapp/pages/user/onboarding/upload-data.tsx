import {
  Box,
  Center,
  Heading,
  Text,
  Spinner,
  Card,
  Button,
  Flex,
  Container,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import DataBaseSvgComponent from "~~/components/DataBaseSvgComponent";
import ConnectedLayout from "~~/components/layouts/ConnectedLayout";
import SuccessSvgComponent from "~~/components/SuccessSvgComponent";
import UploadUserDataProgressBar from "~~/components/UploadUserDataProgressBar";
import {
  basicSpnFactoryABI,
  spnFactoryABI,
  usePrepareBasicSpnFactorySafeMint,
} from "~~/generated/wagmiTypes";
import usePrepareWriteAndWaitTx from "~~/hooks/usePrepareWriteAndWaitTx";
import { NextPageWithLayout } from "~~/pages/_app";

const HEADER_STRINGS = [
  {
    title: "Processing...",
    subtitle: "Your file will be encrypted immediately after uploading process",
  },
  {
    title: "Uploading to IPFS",
    subtitle:
      "Your data is being uploaded to decentralized storage provided by IPFS",
  },
  {
    title: "Encrypting your data...",
    subtitle:
      "After encryption, your file will be stored on decentralized storage provided by IPFS.",
  },
  {
    title: "Upload successful! Mint your token now",
    subtitle:
      "Only authorized parties such as DAO admins can decrypt and access your data. You will be rewarded with Matic whenever your data is decrypted and processed.",
  },
  {
    title: "Confirm minting in your wallet",
    subtitle:
      "You will be asked to review and confirm the minting from your wallet.",
  },
  {
    title: "Token mint successful",
    subtitle:
      "You can always burn the token in the personal dashboard if you wish to exit from the DAO and stop sharing your encrypted data.",
  },
];
const UploadDataPage: NextPageWithLayout = () => {
  const [progress, setProgress] = useState(70);
  const [success, setSuccess] = useState(false);

  const isMint = progress > 67;

  const { address: userAddress } = useAccount();

  const cid = sessionStorage.getItem("plaidItemId");

  const mintToken = usePrepareWriteAndWaitTx({
    address: process.env.NEXT_PUBLIC_DALN_CONTRACT_ADDRESS as `0x${string}`,
    abi: basicSpnFactoryABI,
    functionName: "safeMint",
    args: [userAddress, cid],
    enabled:
      !!process.env.NEXT_PUBLIC_DALN_CONTRACT_ADDRESS && !!userAddress && !!cid,
  });

  useEffect(() => {
    if (mintToken.isSuccess) {
      setProgress(100);
      setSuccess(true);
    }
  }, [mintToken.isSuccess]);

  return (
    <Center
      sx={{
        flex: 1,
      }}
    >
      <Box alignSelf="center" width="80vw" overflow={"hidden"}>
        <Heading as="h1" size="lg" textAlign="center" mb={2}>
          Processing...
        </Heading>
        <Text textAlign="center" fontSize="lg" mb={16} color="#4A5568">
          Your file will be encrypted immediately after uploading process
        </Text>
        <Center alignItems="center">
          {success ? (
            <Container>
              <Flex flex={1} justifyContent="center">
                <SuccessSvgComponent />
              </Flex>
              <Flex flex={1} justifyContent="center" mt={20}>
                <Link href="/user/dashboard">
                  <Button maxWidth={320} size="lg" flex={1} mb={2}>
                    View in dashboard
                  </Button>
                </Link>
              </Flex>
            </Container>
          ) : (
            <Card
              height={"300px"}
              maxWidth={"680px"}
              flex={1}
              borderStyle={isMint ? undefined : "dashed"}
              borderWidth={isMint ? undefined : 1}
              borderColor={isMint ? undefined : "rgba(0, 0, 0, 0.3)"}
              justifyContent="center"
            >
              {isMint ? (
                <Container>
                  <Center>
                    <DataBaseSvgComponent />
                  </Center>
                  <Text textAlign="center" fontSize="md" color="#4A5568">
                    The token is free to mint but you will pay a small gas fee
                    in Matic
                  </Text>
                  <Flex flex={1} justifyContent="center" mt={10}>
                    <Button
                      maxWidth={320}
                      size="lg"
                      flex={1}
                      mb={2}
                      isDisabled={!mintToken.write}
                      isLoading={mintToken.isLoading}
                      onClick={() => {
                        mintToken.write && mintToken.write();
                      }}
                    >
                      Mint token
                    </Button>
                  </Flex>
                </Container>
              ) : (
                <Container centerContent>
                  <Spinner
                    alignSelf="center"
                    emptyColor="rgba(64, 117, 255, 0.2)"
                    color="#4075FF"
                    mb={6}
                    mt={"69px"}
                  />
                  <Text textAlign="center" fontSize="md" mb={1} color="#4A5568">
                    This may take a while...
                  </Text>{" "}
                  <Text
                    textAlign="center"
                    fontSize="md"
                    color="#4A5568"
                    mb={"69px"}
                  >
                    Please do not close your browser
                  </Text>
                </Container>
              )}
            </Card>
          )}
        </Center>
        {success ? null : <UploadUserDataProgressBar progress={progress} />}
      </Box>
    </Center>
  );
};

UploadDataPage.getLayout = function getLayout(page) {
  return <ConnectedLayout>{page}</ConnectedLayout>;
};

export default UploadDataPage;
