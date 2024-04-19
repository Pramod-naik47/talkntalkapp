import React, { useState } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL_USER_MANAGEMENT } from "../utilities/Constant";
import { ChatState } from "../Context/ChatContext";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPasswordConfirmClick = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const toast = useToast();

  const [userName, setUserName] = useState(user.userName);
  const [name, setName] = useState(user.name);
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState(null);
  const { setUser } = ChatState();

  const signupSubmitHandler = async () => {
    if (!name) {
      toast({
        title: "Please fill name feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .put(
        BASE_URL_USER_MANAGEMENT + "/User/UpdateUser",
        {
          userId : user.userId,
          name,
          password,
        },
        config
      )
      .then((res) => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo.name = res?.data?.name
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUser(userInfo);
        toast({
          title: "Profile updated successfully!!!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="90%">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <VStack spacing="5px">
              <FormControl id="user-name" key="user-name" isRequired>
                <FormLabel>User Name</FormLabel>
                <Input
                  value={userName}
                  placeholder="Enter User Name"
                  onChange={(e) => setUserName(e.target.value)}
                  disabled = {true}
                />
              </FormControl>
              <FormControl id="full-name" key="full-name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={name}
                  placeholder="Enter Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" key="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    key="input-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowPasswordClick}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl
                id="confirmPassword"
                key="confirmPassword"
                isRequired
              >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    key="input-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowPasswordConfirmClick}
                    >
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
                Update
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
