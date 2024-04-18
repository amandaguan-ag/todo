import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";

interface NavBarProps {
  userEmail: string;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ userEmail, onLogout }) => (
  <Flex as="nav" p={4} bg="blue.500" color="white">
    <Box>
      <Text>User: {userEmail}</Text>
    </Box>
    <Spacer />
    <Button onClick={onLogout} colorScheme="blue" variant="outline">
      Log Out
    </Button>
  </Flex>
);

export default NavBar;
