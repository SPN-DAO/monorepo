import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

// define custom styles for funky variant
const variants = {
  outline: definePartsStyle({
    container: {
      boxShadow: "none",
    },
  }),
};

export const cardTheme = defineMultiStyleConfig({ variants });
