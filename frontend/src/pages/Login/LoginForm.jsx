import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Link,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import HomeBackground from "../../assets/HomeBackground.jpg"; // Import the background image
import { login } from "../../services/apiService"; // Adjust the path as needed

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Function to reset the form fields
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate(); // Initialize navigate
  const [loading, setLoading] = useState(false); // Manage loading state

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when starting the request
    try {
      const response = await login(data);

      // Check if the response status indicates success
      if (response.status >= 200 && response.status < 300) {
        const { token } = response.data; // Extract token from response
        localStorage.setItem("authToken", token); // Store token in localStorage

        toast({
          title: "Login Successful",
          description: "You have been successfully signed in.",
          status: "success",
          position: "bottom-right",
        });
        reset(); // Clear the form fields
        setTimeout(() => {
          navigate("/dashboard/boards");
        }, 1500);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials or an error occurred.",
          status: "error",
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description:
          error.response?.data?.message ||
          "An error occurred during login. Please try again.",
        status: "error",
        position: "bottom-right",
      });
    } finally {
      setLoading(false); // Set loading to false when request is completed
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundImage={`url(${HomeBackground})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundAttachment="fixed"
    >
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        width={{ base: "90%", sm: "400px" }}
        padding={6}
        borderRadius="12px"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        backgroundColor="rgba(255, 255, 255, 0.1)" // Semi-transparent background
        backdropFilter="blur(10px)" // Blurred glass effect
        border="1px solid rgba(255, 255, 255, 0.3)" // Light border
        textAlign="center"
      >
        <Link
          as={RouterLink}
          to="/"
          fontSize="3xl"
          fontWeight="bold"
          mb={6}
          color="#353839"
          textDecoration="none" // Remove underline
          _hover={{ textDecoration: "none" }} // Ensure no underline on hover
        >
          TRELLO
        </Link>

        <FormControl mb={4} isInvalid={errors.email}>
          <FormLabel color="white">Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter email"
            {...register("email", { required: "Email is required" })}
            borderColor="whiteAlpha.600"
            color="white"
            _placeholder={{ color: "whiteAlpha.800" }}
          />
        </FormControl>

        <FormControl mb={4} isInvalid={errors.password}>
          <FormLabel color="white">Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
            borderColor="whiteAlpha.600"
            color="white"
            _placeholder={{ color: "whiteAlpha.800" }}
          />
        </FormControl>

        <Button
          colorScheme="teal"
          size="md"
          width="full"
          type="submit"
          backgroundColor="white"
          color="black"
          borderRadius="8px"
          _hover={{ backgroundColor: "gray.200" }}
          isLoading={loading} // Show loading spinner while submitting
        >
          Sign in
        </Button>

        <Text mt={4} color="white">
          Don't have an account yet?
          <Link
            marginLeft={2}
            as={RouterLink}
            to="/register"
            color="#232b2b"
            fontWeight="bold"
            _hover={{ textDecoration: "underline" }}
          >
            Sign up
          </Link>
        </Text>
      </Box>
    </Box>
  );
};
