import { Heading } from "@chakra-ui/react";

import { NextPageWithLayout } from "../_app";

import ConnectedLayout from "~~/components/layouts/ConnectedLayout";
import HasTokenLayout from "~~/components/layouts/HasTokenLayout";
import CenteredCard from "~~/components/OnBoardingCenteredCard";

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <CenteredCard>
        <Heading as="h1" size="4xl" textAlign="center" mb={2}>
          Manage SPN DAO membership token
        </Heading>
      </CenteredCard>
    </>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return (
    <ConnectedLayout>
      <HasTokenLayout>{page}</HasTokenLayout>
    </ConnectedLayout>
  );
};

export default Dashboard;
