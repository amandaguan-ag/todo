import { extendTheme } from "@chakra-ui/react";
import { color } from "framer-motion";

export const theme = extendTheme({
  fonts: {
    heading: `'Pacifico', cursive`,
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
