import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

export const BoardHeader = () => {
  return (
    <Box as="header">
      <NavLink to="/dashboard">
        <Heading>Trello</Heading>
      </NavLink>
    </Box>
  );
};
