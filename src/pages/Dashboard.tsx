import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
 
  Text,
  VStack,
  
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate=useNavigate();
    const handleRegister=()=>{
        navigate('/user/register')
    }
  return (
    <>
    <Navbar/>

    <Box bg="gray.50" minH="100vh" p={[4, 8]}>
       
      {/* Hero Section */}
      <Flex
        direction={["column", "column", "row"]}
        align="center"
        justify="space-between"
        py={10}
        gap={10}
      >
        <VStack align="start" spacing={5} maxW="600px">
          <Text color="gray.600" fontWeight="medium">
            Mental Health Is Wealth
          </Text>
          <Heading fontSize={["2xl", "3xl", "4xl"]}>
            Set The Stage For A Calmer Mind
          </Heading>
          <Text color="gray.600" fontSize="md">
            Learn to manage feelings and thoughts with the lifelong skill of
            everyday mindfulness, any time of the day. Make your mind calmer and
            happier.
          </Text>
          <Flex align="center" gap={4}>
            <Button size="lg" colorScheme="gray" variant="outline" onClick={handleRegister} _hover={{
            bg: "teal.500",
            color: "white",
            borderColor: "teal.500",
          }}>
              Register Now
            </Button>
            <Box as="button" w="40px" h="40px" borderRadius="full" bg="yellow.300">
              ▶
            </Box>
          </Flex>
        </VStack>

        <Image
          src="/yoga-pic.jpg"
          alt="Illustration"
          w={["100%", "80%", "50%"]}
          maxH="400px"
          objectFit="contain"
        />
      </Flex>

      {/* Feature Cards Section */}
      <SimpleGrid columns={[1, 2, 3]} spacing={6} mt={12}>
        {[
          {
            title: "Mental Health",
            desc: "Most effective way to gain peace of mind.",
            img: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
          },
          {
            title: "Peace Of Mind",
            desc: "Effective tools to guide your mental clarity.",
            img: "https://cdn-icons-png.flaticon.com/512/4033/4033787.png",
          },
          {
            title: "Yoga & Calm",
            desc: "Yoga practices that support emotional balance.",
            img: "https://cdn-icons-png.flaticon.com/512/2906/2906274.png",
          },
        ].map((card, i) => (
          <Flex
            key={i}
            p={5}
            borderRadius="xl"
            bg="white"
            boxShadow="sm"
            align="center"
            gap={4}
            _hover={{ boxShadow: "md" }}
          >
            <Image src={card.img} w="60px" />
            <Box>
              <Text fontWeight="bold">{card.title}</Text>
              <Text fontSize="sm" color="gray.600">
                {card.desc}
              </Text>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>

      {/* Info Section */}
      <Box mt={12} p={6} bg="blue.50" borderRadius="xl">
        <Text fontSize="sm" color="gray.600" mb={2}>
          Time Can Heal
        </Text>
        <Heading fontSize="xl" mb={3}>
          Every Story Has Its Own Purpose
        </Heading>
        <Text color="gray.600" maxW="700px">
          Wondering how many times a day you're in a mindful state? Track your
          journey and discover how mindfulness builds resilience and peace. The
          higher your score, the greater your ability to stay grounded.
        </Text>
      </Box>
      

    </Box>
    </>

  );
};

export default Dashboard;
