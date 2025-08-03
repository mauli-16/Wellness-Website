import { Box, Heading, IconButton, SimpleGrid, Text, Image, HStack, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import AddSession from './AddSession';

type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
};

const courseData: Course[] = [
  {
    id: 1,
    title: 'Restorative Yoga Training & Immersion',
    description:
      'In Online Restorative Yoga Teacher Training and Immersion, you will learn all the methodology for...',
    image: '/images/yoga1.jpg',
    rating: 4,
    reviews: 18,
  },
  {
    id: 2,
    title: 'Effective Yin Yoga for Beginners',
    description:
      'You will learn about ethics, lifestyle, mythology, asanas, body anatomy, basic meditation and pranayama.',
    image: '/images/yoga2.jpg',
    rating: 5,
    reviews: 24,
  },
  {
    id: 3,
    title: '200-Hour Ashtanga Vinyasa Yoga Training',
    description:
      'The goal of this course is to achieve a deeper holistic understanding of Vinyasa Yoga and gain the skills ...',
    image: '/images/yoga3.jpg',
    rating: 4,
    reviews: 13,
  },
  {
    id: 4,
    title: 'Beginner’s Power Yoga Challenge',
    description: 'Strengthen your body and enhance flexibility with a 30-day power yoga challenge...',
    image: '/images/yoga4.jpg',
    rating: 4,
    reviews: 16,
  },
  {
    id: 5,
    title: 'Prenatal Yoga Foundation',
    description: 'Learn safe and beneficial yoga practices during pregnancy for body and mind.',
    image: '/images/yoga5.jpg',
    rating: 5,
    reviews: 21,
  },
  {
    id: 6,
    title: 'Yoga for Stress Relief & Sleep',
    description: 'This course helps calm your mind and body, especially suited for better sleep.',
    image: '/images/yoga6.jpg',
    rating: 5,
    reviews: 30,
  },
  // Add more courses if needed
];

const CourseCard = ({
  course,
}: {
  course: Course;
}) => (
  <Box
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    bg="white"
    p={3}
  >
    <Image
      src={course.image}
      alt={course.title}
      borderRadius="md"
      height="200px"
      width="100%"
      objectFit="cover"
    />
    <Box mt={4}>
      <Text fontWeight="semibold" fontSize="lg" mb={2}>
        {course.title}
      </Text>
      <Text fontSize="sm" color="gray.600" noOfLines={3}>
        {course.description}
      </Text>
    </Box>
    <HStack mt={3}>
      {Array(5)
        .fill('')
        .map((_, i) => (
          <StarIcon key={i} color={i < course.rating ? 'yellow.400' : 'gray.300'} />
        ))}
      <Text fontSize="sm" color="gray.500">
        ({course.reviews})
      </Text>
    </HStack>
  </Box>
);

export const PopularCourses = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCourses = courseData.slice(startIndex, startIndex + 3);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 3, 0));
  };

  const handleNext = () => {
    if (startIndex + 3 < courseData.length) {
      setStartIndex((prev) => prev + 3);
    }
  };

  return (
    <Box py={10} px={5} maxW="1200px" mx="auto">
      <Heading mb={6} textAlign="center">
        Popular Courses
      </Heading>
      <HStack justifyContent="space-between" mb={4}>
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={handlePrev}
          isDisabled={startIndex === 0}
        />
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          onClick={handleNext}
          isDisabled={startIndex + 3 >= courseData.length}
        />
      </HStack>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {visibleCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </SimpleGrid>
      <Box textAlign="center" mt={6}>
        <Button colorScheme="purple" variant="outline">
          View More
        </Button>
      </Box>
      <AddSession/>
    </Box>
  );
};
