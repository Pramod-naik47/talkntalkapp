import React, { useState } from "react";
import { ChatState } from "../Context/ChatContext";
import { Box, Stack, useToast, Text } from "@chakra-ui/react";
import SideDrawer from "./SideDrawer";
import WaitingRoom from "./WaitingRoom";
import ChatRoom from "./ChatRoom";
import { BASE_URL_TALKNTALK } from "../utilities/Constant";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const ChatWindow = () => {
  const { user } = ChatState();
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const toast = useToast();

  const joinChatRoom = async (userName, chatRoom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(BASE_URL_TALKNTALK + "/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, {user, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose((e) => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { userName, chatRoom });
      setConnection(connection);
    } catch (e) {
      console.log(e);
      toast({
        title: "Something went wrong!!!!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && !connection ? (
          <WaitingRoom joinChat={joinChatRoom} />
        ) : (
          <ChatRoom
            sendMessage={sendMessage}
            messages={messages}
            users={users}
            closeConnection={closeConnection}
          />
        )}
      </Box>
    </div>
  );
};

export default ChatWindow;
