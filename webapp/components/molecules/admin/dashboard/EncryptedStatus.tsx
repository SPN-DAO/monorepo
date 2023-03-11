import { Flex, Text } from "@chakra-ui/react";

import DecryptedLockedSvgComponent from "~~/components/svgComponents/DecryptedLockedSvgComponent";
import EncryptedLockedSvgComponent from "~~/components/svgComponents/EncryptedLockedSvgComponent";

function EncryptedStatus({ isDecrypted }: { isDecrypted: boolean }) {
  return (
    <Flex alignItems="center" maxWidth={"172px"}>
      {isDecrypted ? (
        <DecryptedLockedSvgComponent />
      ) : (
        <EncryptedLockedSvgComponent />
      )}
      <Text marginLeft={2}>{isDecrypted ? "Decrypted" : "Encrypted"}</Text>
    </Flex>
  );
}

export default EncryptedStatus;
