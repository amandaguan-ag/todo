import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Pacifico, cursive",
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "Pacifico, cursive",
      },
    },
  },
  layerStyles: {
    heading: { color: "#79A9cd" },
  },
  styles: {
    global: {
      heading: { color: "#79A9cds" },
      body: {
        bg: "gray.#E1E7CD",
      },
    },
  },
});
