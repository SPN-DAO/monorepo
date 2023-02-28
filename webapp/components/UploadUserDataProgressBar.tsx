import { Box, Center, Circle, Flex, Progress, Wrap } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import theme from "~~/styles/theme";

const PointAndLabel = ({
  label,
  position,
  progress,
}: {
  label: string;
  position: number;
  progress: number;
}) => {
  return (
    <>
      <Circle
        bg="white"
        size={"24px"}
        position="absolute"
        left={`${position}%`}
        marginX={"-12px"}
        zIndex={1}
        borderColor={
          progress < position ? "#A7A7A7" : theme.colors.primary["500"]
        }
        borderWidth={progress < position ? 2 : 3}
      />
      <Center
        position="absolute"
        left={`${position}%`}
        width={"200px"}
        bottom={10}
        marginX={"-100px"}
      >
        {label}
      </Center>
    </>
  );
};

const UploadUserDataProgressBar = (
  props: PropsWithChildren<{
    progress: number;
  }>
) => {
  const { progress } = props;

  return (
    <Flex
      mt={28}
      position={"relative"}
      alignItems={"center"}
      height="24px"
      marginX={10}
    >
      <PointAndLabel progress={progress} position={0} label={"Upload"} />
      <PointAndLabel
        progress={progress}
        position={100 / 3}
        label={"Encrypt & Store"}
      />
      <PointAndLabel
        progress={progress}
        position={(100 / 3) * 2}
        label={"Mint SBT"}
      />
      <PointAndLabel progress={progress} position={100} label={"Complete"} />
      <Progress
        bgColor="#D9D9D9"
        flex={1}
        value={progress}
        borderRadius={5}
        isAnimated
        hasStripe
      />
    </Flex>
  );
};

export default UploadUserDataProgressBar;
