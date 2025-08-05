import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://wellness-website.onrender.com/user/register",
        { username, email, password },
        { withCredentials: true }
      );

      toast({
        title: "Registration successful",
        description: "Redirecting to login...",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast({
        title: "Registration failed",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, brand.500, brand.600)"
    >
      <Box
        display="flex"
        w={["95%", "90%", "80%", "75%"]}
        maxW="1200px"
        h={["auto", "auto", "600px"]}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="2xl"
      >
        {/* Left Panel */}
        <Box
          display={["none", "none", "flex"]}
          w="50%"
          bgImage="url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe')"
          bgSize="cover"
          bgPosition="center"
          position="relative"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="blackAlpha.600"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            p={10}
            color="white"
          >
            <Text fontSize="4xl" fontWeight="bold" mb={4}>
              Register to our wellness website
            </Text>
            <Text fontSize="lg" maxW="400px">
              Find your inner peace
            </Text>
          </Box>
        </Box>

        {/* Right Panel - Form */}
        <Box
          w={["100%", "100%", "50%"]}
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={[6, 8, 10]}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box display={["block", "block", "none"]} textAlign="center" mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
              Create Account
            </Text>
          </Box>

          <VStack spacing={5} w="100%" maxW="400px" mx="auto">
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                size="lg"
                bg="gray.50"
                _dark={{ bg: "gray.700", color: "white" }}
                placeholder="Choose a username"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                size="lg"
                bg="gray.50"
                _dark={{ bg: "gray.700", color: "white" }}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                size="lg"
                bg="gray.50"
                _dark={{ bg: "gray.700", color: "white" }}
                placeholder="Create a password"
              />
            </FormControl>

            <Button
              onClick={handleSubmit}
              isLoading={loading}
              colorScheme="brand"
              width="100%"
              size="lg"
              fontWeight="medium"
            >
              Create Account
            </Button>

            <Text color="gray.600" _dark={{ color: "gray.300" }} pt={4}>
              Already have an account?{" "}
              <Link
                to="/user/login"
                style={{
                  color: "var(--chakra-colors-brand-500)",
                  fontWeight: 500,
                }}
              >
                Sign in
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
