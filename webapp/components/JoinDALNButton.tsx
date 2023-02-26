import { Button, ButtonProps, ChakraProps, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

interface JoinDALNButtonProps extends ButtonProps {
  linkToken: string | null;
  onSuccess?: () => void;
}
export default function JoinDALNButton({
  linkToken,
  onClick = () => {},
  isDisabled,
  onSuccess = () => {},
  ...props
}: JoinDALNButtonProps) {
  const sendPublicTokenToBackend = useCallback(
    async (public_token: string, metadata: any) => {
      // send public_token to server to exchange for access_token and store in db
      await axios
        .post("/api/set_access_token", { public_token })
        .then(() => {
          onSuccess();
        })
        .catch((error) => {
          console.log(`axios.post() failed: ${error}`);
        });
    },
    [onSuccess]
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken,
    onSuccess: sendPublicTokenToBackend,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <Flex justifyContent="center">
      <Button
        size="lg"
        maxWidth={382}
        flex={1}
        isDisabled={!linkToken || !ready || isDisabled}
        onClick={(e) => {
          open();
          onClick && onClick(e);
        }}
        {...props}
      >
        Join DALN
      </Button>
    </Flex>
  );
}
