import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Trello from "../../assets/trello.svg";

export const BoardHeader = () => {
  return (
    <Box as="header" p="20px">
      <Link to="/dashboard/boards">
        <Flex align="center">
          <Box as="img" src={Trello} alt="Trello Logo" boxSize="30px" />
          <Text fontSize="2xl" ml={2} color="white">
            Trello
          </Text>
        </Flex>
      </Link>
    </Box>
  );
};
