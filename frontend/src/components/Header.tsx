import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Header = () => {
  const { userEmail, setUserEmail } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail(""); 
    navigate("/log-in");
  };

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
        {userEmail ? (
          <Button onClick={handleLogout} colorScheme="blue">
            Log Out
          </Button>
        ) : (
          [
            { name: "Log In", path: "/log-in" }, 
            { name: "Sign Up", path: "/sign-up" }, 
          ].map((link, index) => (
            <Link to={link.path} key={index}>
              <Text px={3} py={2} borderRadius="md" _hover={{ bg: "blue.800" }}>
                {link.name}
              </Text>
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Header;
