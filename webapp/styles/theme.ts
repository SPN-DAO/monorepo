import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        minHeight: "100vh",
      },
    },
  },
});

export default theme;
