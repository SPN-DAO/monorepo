import { Container, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

import DecryptButton from "./DecryptButton";

import DecryptedLockedSvgComponent from "~~/components/svgComponents/DecryptedLockedSvgComponent";
import EncryptedLockedSvgComponent from "~~/components/svgComponents/EncryptedLockedSvgComponent";

function EncryptedStatus({ isDecrypted }: { isDecrypted: boolean }) {
  const [isMouseOver, setOnMouseOver] = useState(false);
  return (
    <Flex
      alignItems="center"
      width={"140px"}
      paddingLeft={isDecrypted ? 0 : 1}
      onMouseEnter={(e) => setOnMouseOver(true)}
      onMouseLeave={(e) => setOnMouseOver(false)}
    >
      {isDecrypted ? (
        isMouseOver ? (
          <DecryptButton />
        ) : (
          <Flex alignItems="center" height={"40px"}>
            <DecryptedLockedSvgComponent />
            <Text marginLeft={2}>Decrypted </Text>
          </Flex>
        )
      ) : (
        <Flex alignItems="center" height={"40px"}>
          <EncryptedLockedSvgComponent />
          <Text marginLeft={2}>Encrypted </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default EncryptedStatus;
