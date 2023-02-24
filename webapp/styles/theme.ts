import { extendTheme } from "@chakra-ui/react";

import { cardTheme } from "./cardTheme";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        minHeight: "100vh",
        backgroundColor: "gray.50",
      },
    },
  },
  components: {
    Card: cardTheme,
  },
});

export default theme;
