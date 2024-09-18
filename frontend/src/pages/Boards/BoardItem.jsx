import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BoardItem = ({ data }) => {
  console.log("data", data);
  return (
    <Box
      as={Link}
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      to={`/dashboard/boards/${data?._id}`}
      transition="all 0.3s ease"
      _hover={{
        bg: "#edede9", // Change background color on hover
        transform: "scale(1.05)", // Slightly increase size on hover
        boxShadow: "lg", // Increase shadow on hover
      }}
    >
      {data.title}
    </Box>
  );
};

export default BoardItem;
