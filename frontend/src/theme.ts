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
    heading: {
      fontSize: "24px",
      color: "blue.600",
      fontWeight: "bold",
    },
    text: {
      color: "gray.600",
    },
    input: {
      borderColor: "gray.300",
      _hover: {
        borderColor: "gray.400",
      },
      _focus: {
        borderColor: "blue.500",
        boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
      },
    },
    button: {
      backgroundColor: "blue.500",
      color: "white",
      _hover: {
        backgroundColor: "blue.600",
      },
    },
    errorText: {
      fontSize: "sm",
      color: "red.500",
    },
  },
});
