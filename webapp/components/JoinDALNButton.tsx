import { Button, ButtonProps, ChakraProps, Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { PlaidLinkOnSuccess, usePlaidLink } from "react-plaid-link";

import useMutationSetAccessToken from "~~/hooks/useMutationSetAccessToken";

interface JoinDALNButtonProps extends ButtonProps {
  linkToken?: string;
  onSuccess?: (data?: any, variables?: any, context?: any) => void;
}
export default function JoinDALNButton({
  linkToken,
  onClick = () => null,
  isDisabled,
  onSuccess = () => null,
  isLoading = false,
  ...props
}: JoinDALNButtonProps) {
  const { mutateAsync, isLoading: isLoadingSetAccessToken } =
    useMutationSetAccessToken({
      onSuccess(data, variables, context) {
        onSuccess(data, variables, context);
      },
      onError(error) {
        console.log(`axios.post() failed: ${error}`);
      },
    });

  const sendPublicTokenToBackend: PlaidLinkOnSuccess = async (
    public_token,
    metadata
  ) => {
    await mutateAsync(public_token);
  };

  const { open, ready } = usePlaidLink({
    token: linkToken || "",
    onSuccess: sendPublicTokenToBackend,
  });

  return (
    <Flex justifyContent="center">
      <Button
        size="lg"
        maxWidth={382}
        flex={1}
        isLoading={isLoading || isLoadingSetAccessToken}
        isDisabled={!linkToken || !ready || isDisabled}
        onClick={() => open()}
        {...props}
      >
        Join DALN
      </Button>
    </Flex>
  );
}
