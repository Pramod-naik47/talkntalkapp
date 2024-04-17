import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatContext";
import { Box, Stack, useToast, Text } from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL_TALKNTALK } from "../utilities/Constant";
import ChatShimmer from "./ChatShimmer";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const fetchChats = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .get(BASE_URL_TALKNTALK + "/Chats/GetChats", config)
      .then((res) => {
        setChats(res.data);
      })
      .catch(() => {
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
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
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
        My Chats
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat.userId}
              >
                <Text fontSize="xs" key={chat.userId}>
                  <b>{chat.name}</b>
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatShimmer />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
