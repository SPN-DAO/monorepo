import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { NextPageWithLayout } from "../_app";

import DashboardItem from "~~/components/DashboardItem";
import ConnectedLayout from "~~/components/layouts/ConnectedLayout";
import HasTokenLayout from "~~/components/layouts/HasTokenLayout";

const Dashboard: NextPageWithLayout = () => {
  return (
    <Container
      maxW="container.xl"
      mt={{
        base: 4,
        md: 16,
        lg: 24,
      }}
    >
      <Card w="full">
        <CardHeader>
          <Flex justifyContent="flex-end" alignItems="center">
            <Button variant="outline" colorScheme="red">
              Burn DALN token
            </Button>
          </Flex>

          <Heading as="h1" size="md" fontWeight={500} textAlign="center" mb={2}>
            Manage SPN DAO membership token
          </Heading>
        </CardHeader>

        <CardBody>
          <SimpleGrid columns={[1, 2]} spacing={5}>
            {/* TODO: Fetch info from user */}
            <DashboardItem label="Rewards" helpText="Matic" number="1.27" />
            <DashboardItem label="Decryption Sessions" number="5" />
            <DashboardItem label="Token ID" number="bd847700" />
            <DashboardItem label="DALN Contract" number="0x7580...B462C1" />
          </SimpleGrid>
        </CardBody>
      </Card>
    </Container>
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
