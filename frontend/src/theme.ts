import { extendTheme } from "@chakra-ui/react";
import { text } from "stream/consumers";

export const theme = extendTheme({
  fonts: {
    heading: "Pacifico, cursive",
    body: `"Sometype Mono", monospace`,
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
    text: { color: "#45446A" },
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
