import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import BoardItem from "./BoardItem"; // Import BoardItem component
import { createBoard, getBoards } from "../../services/apiService";

// const boards = [
//   { id: 1, name: "Board 1" },
//   { id: 2, name: "Board 2" },
//   { id: 3, name: "Board 3" },
// ];

export const Boards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBoardName, setNewBoardName] = useState("");
  const toast = useToast();

  const [boards, setBoards] = useState([]);
  const initBoards = async () => {
    const res = await getBoards();
    if (res.data) {
      setBoards(res.data);
    }
  };

  const addBoard = async () => {
    if (!newBoardName) {
      toast({
        title: "no name",
      });
    }
    const res = await createBoard(newBoardName);
  };

  useEffect(() => {
    initBoards();
  }, []);
  return (
    <Box p={4} bg="#232b2b" minHeight="100vh">
      <Button
        onClick={() => {
          setNewBoardName("");
          onOpen();
        }}
      >
        create board
      </Button>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={10}>
        {boards.length > 0 ? (
          boards.map((board) => <BoardItem key={board._id} data={board} />)
        ) : (
          <Text color="white">no board</Text>
        )}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="enter board name"
            />
          </ModalBody>

          <ModalFooter gap="10px">
            <Button colorScheme="green" onClick={addBoard}>
              add
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
