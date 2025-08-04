import { useState, useEffect } from 'react'
import axios from 'axios';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Text,
  VStack,
  Card,
  CardBody,
  Badge,
  Spinner,
  Center,
  HStack
} from '@chakra-ui/react';

interface Session {
    _id: string;
    title?: string;
    tag?: string;
    json_file_url?: string;
    status?: string;
    createdAt?: string;
}

const UserSession = () => {
    const [userSession, setUserSession] = useState<Session[]>([])
    const [loading, setLoading] = useState(true);

    const fetchSession = async () => {
        try {
            const res = await axios.get("http://localhost:5000/sessions/userSessions", {
                withCredentials: true
            })
            setUserSession(res.data)
        } catch (error) {
            console.log("Error fetching the data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSession();
    }, []);

    if (loading) {
        return (
            <Center py={8}>
                <VStack>
                    <Spinner size="lg" color="teal.500" />
                    <Text>Loading sessions...</Text>
                </VStack>
            </Center>
        );
    }

    return (
        <Box px={6}>
            <Heading size="lg" mb={4} color="teal.600" mt={4} textAlign="center">My Sessions</Heading>
            {userSession.length === 0 ? (
                <Text textAlign="center" color="gray.500" py={8}>
                    No sessions found.
                </Text>
            ) : (
                <SimpleGrid columns={[1, 2, 3]} spacing={10}>
                    {userSession.map((session) => (
                        <Card key={session._id} borderLeft="4px" 
                            borderLeftColor="teal.400"
                            cursor="pointer"
                            transition="all 0.2s"
                            _hover={{
                                transform: 'translateY(-4px)',
                                shadow: 'lg',
                                borderLeftColor: 'teal.600'
                            }}
                            _active={{
                                transform: 'translateY(-2px)',
                                shadow: 'md'
                            }}>
                            <CardBody>
                                <VStack align="start" spacing={3}>
                                    <Heading size="md">{session.title}</Heading>
                                    <HStack spacing={10}>
                                        <Badge colorScheme="blue">{session.tag}</Badge>
                                        <Badge 
                                            colorScheme={
                                                session.status === 'completed' ? 'green' : 
                                                session.status === 'in-progress' ? 'yellow' : 'gray'
                                            }
                                        >
                                            {session.status}
                                        </Badge>
                                    </HStack>
                                    <Text fontSize="sm" color="gray.600">
                                        Created: {session.createdAt ? new Date(session.createdAt).toLocaleDateString() : 'N/A'}
                                    </Text>
                                    {session.json_file_url && (
                                        <Text fontSize="sm" color="blue.500" isTruncated>
                                            File: {session.json_file_url}
                                        </Text>
                                    )}
                                </VStack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default UserSession