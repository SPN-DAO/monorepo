import { Box, Center, Heading, Text, Spinner, Card } from "@chakra-ui/react";
import { useState } from "react";

import ConnectedLayout from "~~/components/layouts/ConnectedLayout";
import UploadUserDataProgressBar from "~~/components/UploadUserDataProgressBar";
import { NextPageWithLayout } from "~~/pages/_app";

const STRINGS = [
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
  const [progress, setProgress] = useState(0);

  return (
    <Center
      sx={{
        flex: 1,
      }}
    >
      <Box alignSelf="center" width="80vw">
        <Heading as="h1" size="lg" textAlign="center" mb={2}>
          Processing...
        </Heading>
        <Text textAlign="center" fontSize="lg" mb={16} color="#4A5568">
          Your file will be encrypted immediately after uploading process
        </Text>
        <Center alignItems="center">
          <Card
            paddingY={87}
            maxWidth={680}
            flex={1}
            borderStyle={"dashed"}
            borderWidth={1}
            borderColor={"rgba(0, 0, 0, 0.3)"}
          >
            <Spinner
              alignSelf="center"
              emptyColor="rgba(64, 117, 255, 0.2)"
              color="#4075FF"
              mb={6}
            />

            <Text textAlign="center" fontSize="md" mb={1} color="#4A5568">
              This may take a while...
            </Text>
            <Text textAlign="center" fontSize="md" color="#4A5568">
              Please do not close your browser
            </Text>
          </Card>
        </Center>
        <UploadUserDataProgressBar progress={progress} />
      </Box>
    </Center>
  );
};

UploadDataPage.getLayout = function getLayout(page) {
  return <ConnectedLayout>{page}</ConnectedLayout>;
};

export default UploadDataPage;
