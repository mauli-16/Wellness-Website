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
import { Link} from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      toast({
        title: "Login successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      //navigate("/chat");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || "Something went wrong",
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
      bgGradient="linear(to-r, brand.500, brand.700)"
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
          bgImage="url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb')"
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
              Welcome Back
            </Text>
            <Text fontSize="lg" maxW="400px">
              Get ready for a session
            </Text>
          </Box>
        </Box>

        {/* Right Panel */}
        <Box
          w={["100%", "100%", "50%"]}
          bg="white"
          p={[6, 8, 10]}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {/* Header on mobile */}
          <Box display={["block", "block", "none"]} textAlign="center" mb={6}>
            <Box
              as={FiLogIn}
              mx="auto"
              fontSize="3rem"
              color="brand.500"
              mb={2}
            />
            <Text fontSize="2xl" fontWeight="bold" color="text.light">
              Welcome Back
            </Text>
          </Box>

          <VStack spacing={6} w="100%" maxW="400px" mx="auto">
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              onClick={handleSubmit}
              isLoading={loading}
              width="100%"
              size="lg"
              leftIcon={<FiLogIn />}
              colorScheme="brand"
            >
              Sign In
            </Button>

            <Text color="gray.600">
              Don’t have an account?{" "}
              <Link
                to="/user/register"
                style={{ fontWeight: 500, color: "#007f6a" }}
              >
                Register now
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
