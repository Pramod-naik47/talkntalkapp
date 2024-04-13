import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { HEADERS, BASE_URL_USER_MANAGEMENT } from "../Constants/Constant";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPasswordConfirmClick = () => setShowConfirmPassword(!showConfirmPassword);
  const toast = useToast();

  const [userName, setUserName] = useState();
  const [name, setName] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();

  const signupSubmitHandler = async () => {
    if (!name || !password || !confirmpassword || !userName) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Password not matching",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    await axios.post(
      BASE_URL_USER_MANAGEMENT + "/User/Signup",
      {
        userName,
        name,
        password
      },
      HEADERS
    )
    .then((res) => {
      toast({
        title: res.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    })
    .catch((err) =>  {
      toast({
        title: "Something went wrong!!!!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    });
  };

  return (
    <>
      <VStack spacing="5px">
        <FormControl id="user-name" key="user-name" isRequired>
          <FormLabel>User Name</FormLabel>
          <Input
            placeholder="Enter User Name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>
        <FormControl id="full-name" key="full-name" isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="Enter Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" key="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input key="input-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowPasswordClick}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmPassword" key="confirmPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input key="input-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowPasswordConfirmClick}>
                {showConfirmPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={signupSubmitHandler}
        >
          Sign Up
        </Button>
      </VStack>
    </>
  );
};

export default Signup;
