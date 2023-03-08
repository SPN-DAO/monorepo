import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Component, ComponentProps, useEffect, useRef } from "react";

import { basicSpnFactoryABI } from "~~/generated/wagmiTypes";
import usePrepareWriteAndWaitTx from "~~/hooks/usePrepareWriteAndWaitTx";

interface BurnSBTProps extends ComponentProps<typeof Button> {
  alertDialogProps?: Component<typeof AlertDialog>;
  tokenId?: string;
}

export default function BurnSBT({
  alertDialogProps,
  tokenId,
  ...props
}: BurnSBTProps) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const userBurn = usePrepareWriteAndWaitTx({
    address: process.env.NEXT_PUBLIC_DALN_CONTRACT_ADDRESS as `0x${string}`,
    abi: basicSpnFactoryABI,
    functionName: "userBurn",
    args: [tokenId],
    enabled:
      !!process.env.NEXT_PUBLIC_DALN_CONTRACT_ADDRESS && tokenId !== undefined,
  });

  useEffect(() => {
    if (userBurn.isSuccess) {
      void router.push("/user/onboarding/no-token");
    }
  }, [onClose, router, userBurn.isSuccess]);

  const handleBurn = async () => {
    if (userBurn.writeAsync) {
      try {
        await userBurn.writeAsync();
      } catch (e) {
        console.error("burn error", e);
        onClose();
      }
    }
  };

  return (
    <>
      <Button colorScheme="red" variant="outline" onClick={onOpen} {...props}>
        Burn my SBT
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        {...alertDialogProps}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Are you sure?
            </AlertDialogHeader>

            <AlertDialogBody>
              If you burn your soul-bound token, you will lose your DAO
              membership and stop sharing your data. You will also stop
              receiving rewards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleBurn}
                isDisabled={!userBurn.writeAsync}
                isLoading={userBurn.isLoading}
                ml={3}
              >
                Burn it anyway
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
