import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Avatar,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import Trello from "../../assets/trello.svg";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(""); // Track the active dropdown
  const [workplaceName, setWorkplaceName] = useState("");

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? "" : dropdown));
  };

  const handleWorkplaceNameChange = (e) => setWorkplaceName(e.target.value);

  const handleCreateWorkplace = () => {
    // Handle workplace creation logic
    console.log("Creating workplace:", workplaceName);
    setWorkplaceName("");
    setActiveDropdown("");
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here, e.g., clearing tokens, etc.
    // Then navigate to the home page
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <Box bg="#232b2b" color="white" p={4}>
      <Flex align="center">
        <Flex align="center" mr={4}>
          <Link to="/dashboard/boards">
            <Flex align="center">
              <Box as="img" src={Trello} alt="Trello Logo" boxSize="30px" />
              <Text fontSize="2xl" ml={2}>
                Trello
              </Text>
            </Flex>
          </Link>
        </Flex>
        <Flex align="center" gap={4} mr="auto" position="relative">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="transparent"
              color="white"
              _hover={{ bg: "gray.700", color: "white" }}
              _active={{ bg: "gray.600" }}
              onClick={() => handleDropdownClick("workplaces")}
            >
              Workplaces
            </MenuButton>
            <MenuList
              bg="gray.600"
              border="none"
              display={activeDropdown === "workplaces" ? "block" : "none"}
            >
              <MenuItem
                bg="gray.600"
                _hover={{ bg: "gray.700", color: "white" }}
                _focus={{ bg: "gray.700", color: "white" }}
              >
                Workplace 1
              </MenuItem>
              <MenuItem
                bg="gray.600"
                _hover={{ bg: "gray.700", color: "white" }}
                _focus={{ bg: "gray.700", color: "white" }}
              >
                Workplace 2
              </MenuItem>
            </MenuList>
          </Menu>

          <Box position="relative">
            <Button
              rightIcon={<ChevronDownIcon />}
              bg="transparent"
              color="white"
              _hover={{ bg: "gray.700", color: "white" }}
              _active={{ bg: "gray.600" }}
              onClick={() => handleDropdownClick("create")}
            >
              Create
            </Button>
            {activeDropdown === "create" && (
              <Box
                borderRadius={8}
                p={4}
                bg="gray.600"
                border="none"
                position="absolute"
                top="100%"
                left="0"
                mt={2}
                width="max-content"
                zIndex="tooltip"
              >
                <Input
                  placeholder="Enter workplace name"
                  value={workplaceName}
                  onChange={handleWorkplaceNameChange}
                  mb={2}
                  bg="gray.700"
                  color="white"
                  border="none"
                  _placeholder={{ color: "gray.400" }}
                />
                <Button
                  onClick={handleCreateWorkplace}
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                  _active={{ bg: "blue.700" }}
                >
                  Create Workplace
                </Button>
              </Box>
            )}
          </Box>
        </Flex>

        {/* Profile Dropdown */}
        <Menu>
          <MenuButton
            as={Button}
            bg="transparent"
            color="white"
            _hover={{ bg: "gray.700", color: "white" }}
            _active={{ bg: "gray.600" }}
            onClick={() => handleDropdownClick("profile")}
          >
            <Avatar name="Profile" src="https://bit.ly/2k1jrfw" size="sm" />
          </MenuButton>
          <MenuList
            bg="gray.700"
            color="white"
            border="none"
            display={activeDropdown === "profile" ? "block" : "none"}
          >
            <MenuItem
              bg="gray.700"
              _hover={{ bg: "gray.600", color: "white" }}
              _focus={{ bg: "gray.600", color: "white" }}
            >
              Profile
            </MenuItem>
            <MenuItem
              bg="gray.700"
              _hover={{ bg: "gray.600", color: "white" }}
              _focus={{ bg: "gray.600", color: "white" }}
            >
              Settings
            </MenuItem>
            <MenuItem
              bg="gray.700"
              _hover={{ bg: "gray.600", color: "white" }}
              _focus={{ bg: "gray.600", color: "white" }}
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Header;
