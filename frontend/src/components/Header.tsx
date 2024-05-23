import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const pages = [
  { name: "Log In", path: "/log-in" },
  { name: "Sign Up", path: "/sign-up" },
  { name: "Task Manager", path: "/home" },
];

const Header = () => {
  return (
    <Box
      as="header"
      py={4}
      px={8}
      display="flex"
      alignItems="center"
      bg="blue.700"
      color="white"
    >
      <Box display="flex" gap={4} alignItems="center" flex={1}>
        <Image
          boxSize="80px"
          borderRadius="50%"
          src="SwiftShopBird.png"
          alt="swiftbird logo"
          boxShadow="lg"
        />
        <Heading size="lg">Todo List</Heading>
      </Box>
      <Box display="flex" justifyContent="space-around" w="70%">
        {pages.map((page, index) => (
          <Link to={page.path} key={index}>
            <Text
              px={3}
              py={2}
              borderRadius="md"
              _hover={{ bg: "blue.800" }}
              color="#ffffff"
            >
              {page.name}
            </Text>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Header;
