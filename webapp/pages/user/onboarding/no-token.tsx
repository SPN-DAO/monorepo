import { Button, Heading } from "@chakra-ui/react";

import ConnectedLayout from "~~/components/layouts/ConnectedLayout";
import CenteredCard from "~~/components/OnBoardingCenteredCard";
import { NextPageWithLayout } from "~~/pages/_app";

const NoTokenPage: NextPageWithLayout = () => {
  return (
    <>
      <CenteredCard>
        <Heading as="h1" size="4xl" textAlign="center" mb={2}>
          Join the party 🥳
        </Heading>

        <Heading as="h2" size="md" textAlign="center">
          You don&apos;t have a DALN membership token yet
        </Heading>

        <Button mt={8} colorScheme="blue" size="lg">
          Join DALN
        </Button>
      </CenteredCard>
    </>
  );
};

NoTokenPage.getLayout = function getLayout(page) {
  return <ConnectedLayout>{page}</ConnectedLayout>;
};

export default NoTokenPage;
