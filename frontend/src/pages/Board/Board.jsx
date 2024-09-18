import React, { useState, useEffect } from "react";
import { BoardHeader } from "./BoardHeader";

import {
  Box,
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Check, Pen, Plus, X } from "@phosphor-icons/react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { defaultCardModel } from "../../utils/statics/models";
import { useMutative } from "use-mutative";

import {
  addCardInputStyle,
  boardCardStyle,
  boardColumnStyle,
  editableStyle,
  minColumnWidth,
} from "../../assets/styles/chakraStyles";
import { useParams } from "react-router-dom";

export const Board = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [boardData, setBoardData] = useMutative({
    todos: [],
    doing: [],
    done: [],
  });

  const [columnOrder, setColumnOrder] = useState([]);
  const [newCardColumn, setNewCardColumn] = useState(null);
  const [newCardText, setNewCardText] = useState("");
  const [addingNewColumn, setAddingNewColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [selectedEditCard, setSelectedEditCard] = useState(null);
  const { boardId } = useParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBoardData = JSON.parse(localStorage.getItem("boardData"));
      const savedColumnOrder = JSON.parse(localStorage.getItem("columnOrder"));

      if (savedBoardData && savedColumnOrder) {
        setBoardData(savedBoardData);
        setColumnOrder(savedColumnOrder);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("boardData", JSON.stringify(boardData));
      localStorage.setItem("columnOrder", JSON.stringify(columnOrder));
    }
  }, [boardData, columnOrder]);

  const handleLogout = () => {
    localStorage.removeItem("boardData");
    localStorage.removeItem("columnOrder");
    setBoardData({
      todos: [],
      doing: [],
      done: [],
    });
    setColumnOrder([]);
    toast({
      title: "Logged out successfully",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === "COLUMN") {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setColumnOrder(newColumnOrder);
    } else {
      const startColumn = source.droppableId;
      const endColumn = destination.droppableId;

      if (startColumn === endColumn) {
        const column = boardData[startColumn];
        const newTasks = Array.from(column);
        newTasks.splice(source.index, 1);
        newTasks.splice(
          destination.index,
          0,
          boardData[startColumn][source.index]
        );

        setBoardData((draft) => {
          draft[startColumn] = newTasks;
        });
      } else {
        const startTasks = Array.from(boardData[startColumn]);
        const [movedTask] = startTasks.splice(source.index, 1);

        const endTasks = Array.from(boardData[endColumn]);
        endTasks.splice(destination.index, 0, movedTask);

        setBoardData((draft) => {
          draft[startColumn] = startTasks;
          draft[endColumn] = endTasks;
        });
      }
    }
  };

  const addNewCard = (columnKey) => {
    if (!newCardText) {
      toast({
        title: "No name provided",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setBoardData((draft) => {
      draft[columnKey].push({
        ...defaultCardModel,
        title: newCardText,
        id: Date.now().toString(),
      });
    });
    setNewCardText("");
    setNewCardColumn(null);
  };

  const handleAddColumn = () => {
    if (!newColumnName) {
      toast({
        title: "No name provided",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setBoardData((draft) => {
      draft[newColumnName] = [];
    });
    setColumnOrder((prevOrder) => [...prevOrder, newColumnName]);
    setNewColumnName("");
    setAddingNewColumn(false);
  };

  const handleCardEdit = (task) => {
    setSelectedEditCard(task);
    onOpen();
  };

  return (
    <Container maxW="1400px" marginInline={0} bg="#232b2b" minHeight="100vh">
      <BoardHeader onLogout={handleLogout} />
      <Box as="main">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="COLUMN"
          >
            {(provided) => (
              <Flex
                wrap="wrap"
                ref={provided.innerRef}
                {...provided.droppableProps}
                gap={4}
                alignItems="flex-start"
                p={4}
              >
                {columnOrder.map((columnKey, index) => (
                  <Draggable
                    key={columnKey}
                    draggableId={columnKey}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        flexBasis="23%"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...boardColumnStyle}
                      >
                        <Editable
                          defaultValue={columnKey}
                          onSubmit={(value) => {
                            setBoardData((prev) => {
                              const newData = { ...prev };
                              newData[value] = newData[columnKey];
                              delete newData[columnKey];
                              return newData;
                            });
                            setColumnOrder((prev) => 
                              prev.map((col) => (col === columnKey ? value : col))
                            );
                          }}
                          {...editableStyle}
                        >
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                        <Droppable droppableId={columnKey} type="TASK">
                          {(provided) => (
                            <Flex
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              direction="column"
                              gap={2}
                            >
                              {boardData[columnKey].map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <Box
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      color="white"
                                      {...boardCardStyle}
                                      onDoubleClick={() => handleCardEdit(task)}
                                    >
                                      <Heading as="h4" fontSize={16}>
                                        {task.title}
                                      </Heading>

                                      <Button
                                        position="absolute"
                                        top={0}
                                        right={0}
                                        bg="transparent"
                                        opacity={0.3}
                                        _hover={{ bg: "transparent", opacity: 1 }}
                                        onClick={() => handleCardEdit(task)}
                                      >
                                        <Pen color="white" />
                                      </Button>
                                    </Box>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                              {newCardColumn === columnKey && (
                                <>
                                  <Input
                                    {...addCardInputStyle}
                                    placeholder="Enter name for this card"
                                    value={newCardText}
                                    onChange={(e) => setNewCardText(e.target.value)}
                                  />
                                  <HStack>
                                    <Button
                                      bg="#284b63"
                                      color="white"
                                      _hover={{ bg: "#3d6f8f" }}
                                      onClick={() => addNewCard(columnKey)}
                                    >
                                      <Check />
                                    </Button>
                                    <Button
                                      colorScheme="red"
                                      onClick={() => {
                                        setNewCardColumn(null);
                                        setNewCardText("");
                                      }}
                                    >
                                      <X />
                                    </Button>
                                  </HStack>
                                </>
                              )}
                              {newCardColumn !== columnKey && (
                                <Button
                                  bg="#284b63"
                                  color="white"
                                  _hover={{ bg: "#3d6f8f" }}
                                  onClick={() => {
                                    setNewCardText("");
                                    setNewCardColumn(columnKey);
                                  }}
                                >
                                  <Plus />
                                  <Text>Add</Text>
                                </Button>
                              )}
                            </Flex>
                          )}
                        </Droppable>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Box pr={5}>
                  {addingNewColumn ? (
                    <Flex direction="column">
                      <Input
                        bg="#f8f9fa"
                        placeholder="Enter column name"
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                      />
                      <HStack mt={2} minWidth={minColumnWidth}>
                        <Button
                          bg="#284b63"
                          color="white"
                          _hover={{ bg: "#3d6f8f" }}
                          onClick={handleAddColumn}
                        >
                          <Check />
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => setAddingNewColumn(false)}
                        >
                          <X />
                        </Button>
                      </HStack>
                    </Flex>
                  ) : (
                    <Button
                      bg="#284b63"
                      color="white"
                      _hover={{ bg: "#3d6f8f" }}
                      onClick={() => setAddingNewColumn(true)}
                      minWidth={minColumnWidth}
                    >
                      Add another list
                    </Button>
                  )}
                </Box>
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Edit card title"
              value={selectedEditCard?.title || ""}
              onChange={(e) =>
                setSelectedEditCard({
                  ...selectedEditCard,
                  title: e.target.value,
                })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#284b63"
              color="white"
              _hover={{ bg: "#3d6f8f" }}
              onClick={() => {
                setBoardData((draft) => {
                  const column = columnOrder.find((col) =>
                    draft[col].some((task) => task.id === selectedEditCard.id)
                  );
                  const newTasks = draft[column].map((task) =>
                    task.id === selectedEditCard.id ? selectedEditCard : task
                  );
                  draft[column] = newTasks;
                });
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
