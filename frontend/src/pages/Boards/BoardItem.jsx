import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BoardItem = ({ data }) => {
  console.log("data", data);
  return (
    <Box
      as={Link}
      bg="orange"
      p={4}
      borderRadius="md"
      boxShadow="md"
      to={`/b/${data?._id}`}
      transition="all 0.3s ease"
      _hover={{
        bg: "orange.500", // Change background color on hover
        transform: "scale(1.05)", // Slightly increase size on hover
        boxShadow: "lg", // Increase shadow on hover
      }}
    >
      {data.title}
    </Box>
  );
};

export default BoardItem;
