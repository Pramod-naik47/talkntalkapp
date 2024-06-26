import React, { useState, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { FormControl, Input, Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatContext";
import { useToast } from "@chakra-ui/react";

const WaitingRoom = ({ joinChat }) => {
  const {user} = ChatState();
  const [userName, setUserName] = useState(user.userName);
  const [chatRoom, setChatRoom] = useState();
  const toast = useToast();

  const joinChatHandler = () => {
    if (!chatRoom) {
      toast({
        title: "Please enter chat room!!!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    joinChat(userName, chatRoom);
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        Create Chat Room
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        background="#F8F8F8"
        width="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        <Stack>
          <FormControl  key="user-name" isRequired mt={3}>
            <Input
              key="user-name-input"
              variant="filled"
              background="#E0E0E0"
              placeholder="Enter name"
              value={user.userName}
              disabled = {true}
              color="green"
            />
          </FormControl>
          <FormControl key="chat-room" isRequired mt={3}>
            <Input
              variant="filled"
              background="#E0E0E0"
              placeholder="Enter chat room name"
              key="chat-room-input"
              onChange={(e) => setChatRoom(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={joinChatHandler}
          >
            Enter Room
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default WaitingRoom;
