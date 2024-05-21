import { Box, Image, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const pages = [
  { name: "Log In", path: "/log-in" },
  { name: "Sign Up", path: "/sign-up" },
  { name: "Todo", path: "/home" },
];

const Header = () => {
  return (
    <Box py={4} px={8} display="flex" alignItems="center">
      <Box display="flex" gap={4} alignItems="center" flex={1}>
        <Image
          boxSize="80px"
          borderRadius="50%"
          src="SwiftShopBird.png"
          alt="swiftbird logo"
          boxShadow="lg"
        />
        <Heading fontSize={24}>Todo List</Heading>
      </Box>
      <Box display="flex" justifyContent="space-around" w="70%">
        {pages.map((page) => {
          return (
            <Link to={page.path}>
              <Box>{page.name}</Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default Header;
