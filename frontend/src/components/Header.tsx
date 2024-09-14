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
      justifyContent="space-between"
      bg="blue.700"
      color="white"
    >
      <Box display="flex" gap={4} alignItems="center" flexShrink={0}>
        <Image
          boxSize="80px"
          borderRadius="50%"
          src="todo.png"
          alt="swiftbird logo"
          boxShadow="lg"
        />
        <Heading size="lg">Todo List</Heading>
      </Box>
      <Box display="flex" alignItems="center">
        {userEmail ? (
          <Button
            onClick={handleLogout}
            colorScheme="blue"
            bg="blue.800"
            _hover={{ bg: "blue.900" }}
          >
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