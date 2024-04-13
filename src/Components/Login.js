import React from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { HEADERS, BASE_URL_USER_AUTHENTICATION } from "../Constants/Constant";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const signIn = async () => {
    if (!userName || !password) {
      toast({
        title: "Please provide user name and password",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    await axios
      .post(
        BASE_URL_USER_AUTHENTICATION + "/User/Login",
        {
          userName,
          password,
        },
          HEADERS,
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
      .catch((err) => {
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
    <VStack spacing="10px">
      <FormControl key="user-name-form" isRequired>
        <FormLabel>User Name</FormLabel>
        <Input
          key="user-name-input"
          value={userName}
          type="text"
          placeholder="Enter user name"
          onChange={(e) => setUserName(e.target.value)}
        />
      </FormControl>
      <FormControl key="password-form" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            key="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={signIn}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
