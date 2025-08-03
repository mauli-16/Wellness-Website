import { Box, Flex, HStack, Text, Button, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Sessions", route: "/sessions" },
    // { label: "Blog", route: "/blog" },
    // { label: "Expertise", route: "/expertise" },
  ];

  const handleSignInClick = () => {
    navigate("/user/login");
  };

  return (
    <Box px={6} py={4} boxShadow="sm">
      <Flex align="center">
        {/* Logo */}
        <Text fontWeight="bold" fontSize="xl" letterSpacing="wider">
          FITPRO
        </Text>

        {/* Spacer to center menu items */}
        <Spacer />

        {/* Menu Items with hover and navigation */}
        <HStack spacing={8} fontSize="md" color="gray.600">
          {menuItems.map((item, index) => (
            <Text
              key={index}
              fontWeight={item.label === "Home" ? "bold" : "medium"}
              color={item.label === "Home" ? "black" : "gray.600"}
              cursor="pointer"
              transition="all 0.2s ease"
              _hover={{
                color: "teal.500",
                transform: "translateY(-2px)",
              }}
              onClick={() => navigate(item.route)}
            >
              {item.label}
            </Text>
          ))}
        </HStack>

        {/* Spacer to push Sign In button right */}
        <Spacer />

        {/* Sign In Button */}
        <Button
          variant="outline"
          borderRadius="full"
          px={6}
          fontWeight="medium"
          size="sm"
          _hover={{
            bg: "teal.500",
            color: "white",
            borderColor: "teal.500",
          }}
          onClick={handleSignInClick}
        >
          Login
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
