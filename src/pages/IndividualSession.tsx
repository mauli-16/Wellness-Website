
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Text,
  VStack,
  Card,
  CardBody,
 
} from '@chakra-ui/react';

interface ExtraDetails {
  description?: string;
  duration?: string;
  difficulty?: string;
}

interface Session {
  extraDetails: ExtraDetails;
}



const IndividualSession = () => {
    const [userSession, setUserSession] = useState<Session|null>()
    const [loading, setLoading] = useState(true);
    const {id}=useParams()
    

    const fetchSession = async () => {
        
        try {
            const res = await axios.get(`http://localhost:5000/sessions/${id}`, {
                withCredentials: true
            })
            console.log('clicked');
            console.log(res.data);
            
            
            setUserSession(res.data)
        } catch (error) {
            console.log("Error fetching the data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(id){
            fetchSession()
        }
        
    }, [id]);
     if (loading) return <p>Loading session...</p>;
    if (!userSession) return <p>Session not found.</p>;

  return (
     <Box px={6}>
                <Heading size="lg" mb={4} color="teal.600" mt={4} textAlign="center">Session Details</Heading>
                {!userSession?.extraDetails ? (
    <Text textAlign="center" color="gray.500" py={8}>
      No details found.
    </Text>
  ) : (
    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
      <Card
        borderLeft="4px"
        borderLeftColor="teal.400"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: 'lg',
          borderLeftColor: 'teal.600',
        }}
        _active={{
          transform: 'translateY(-2px)',
          shadow: 'md',
        }}
      >
        <CardBody>
          <VStack align="start" spacing={3}>
            <Text fontSize="sm" color="gray.600">
              Description: {userSession.extraDetails.description}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Duration: {userSession.extraDetails.duration}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Difficulty: {userSession.extraDetails.difficulty}
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </SimpleGrid>
  )}
            </Box>
    
  )
}

export default IndividualSession