import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const AddSession = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSaveDraft = async () => {
    if (!title || !tags || !description || !duration || !difficulty) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const sessionDetails = {
        description,
        duration,
        difficulty,
      };

      const payload = {
        title,
        tags: tags.split(",").map((tag) => tag.trim()),
        sessionDetails,
        sessionId: null,
      };

      const res = await axios.post(
        "http://localhost:5000/sessions/saveDraft",
        payload,
        { withCredentials: true }
      );

      if (res.data.session && res.data.session._id) {
        setSessionId(res.data.session._id);
      }

      alert(res.data.message || "Session saved as draft!");
    } catch (error: any) {
      console.error("Save draft error:", error);
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save session as draft"
      );
    }
  };

 const handlePublish = async () => {
  if (!title || !tags || !description || !duration || !difficulty) {
    alert("Please fill all the fields.");
    return;
  }

  const sessionDetails = {
    description,
    duration,
    difficulty,
  };

  // Step 1: Upload JSON file
  const jsonBlob = new Blob([JSON.stringify(sessionDetails)], {
    type: "application/json",
  });

  const formData = new FormData();
  formData.append("file", jsonBlob, `${title.replace(/\s+/g, "_")}.json`);

  try {
    const uploadRes = await axios.post(
      "http://localhost:5000/sessions/uploadJson",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    const jsonUrl = uploadRes.data.url;

    // Step 2: Publish session using uploaded JSON URL
    const payload = {
      title,
      tags: tags.split(",").map((tag) => tag.trim()),
      jsonUrl,
    };

    const res = await axios.post(
      "http://localhost:5000/sessions/publish",
      payload,
      { withCredentials: true }
    );

    alert(res.data.message || "Session published!");
  } catch (error: any) {
    console.error("Publish error:", error);
    alert(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to publish session"
    );
  }
};


  return (
    <Box>
      <Button onClick={onOpen} colorScheme="teal" borderRadius="full">
        Add a Session
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Enter session title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Tags</FormLabel>
                <Input
                  placeholder="e.g. fitness, diet"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Enter session description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Duration (in minutes)</FormLabel>
                <Input
                  type="number"
                  placeholder="30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Difficulty</FormLabel>
                <Input
                  placeholder="Beginner / Intermediate / Advanced"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={handleSaveDraft} variant="outline">
              Save Draft
            </Button>
            <Button onClick={handlePublish} colorScheme="teal">
              Publish Session
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddSession;
