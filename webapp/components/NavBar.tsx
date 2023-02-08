import { Container, Link, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";

const NavBar = () => {
  return (
    <Container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      maxW="container.xl"
      py={4}
    >
      <Link as={NextLink} href="/">
        <Text>SPN DAO</Text>
      </Link>

      <ConnectButton />
    </Container>
  );
};

export default NavBar;
