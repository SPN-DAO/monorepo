import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const OnBoardingHeaderComponent: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <Box>
      <Heading as="h1" size="4xl" textAlign="center" mb={2} color={"#5D5FEF"}>
        {title}
      </Heading>
      <Heading as="h2" size="md" textAlign="center">
        {description}
      </Heading>
    </Box>
  );
};

export default OnBoardingHeaderComponent;
