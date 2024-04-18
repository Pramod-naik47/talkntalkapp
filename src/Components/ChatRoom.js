import React from "react";
import { Box, Button } from "@chakra-ui/react";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

const ChatRoom = ({ sendMessage, messages, closeConnection }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      width="100%"
      borderRadius="lg"
      borderWidth="1px"
      backgroundColor="beige"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        //w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <div>Chat room</div>
        <div alignItems>
          <Button colorScheme="red" onClick={closeConnection}>
            Leave Room
          </Button>
        </div>
      </Box>
      <MessageContainer messages={messages} />
      <SendMessageForm sendMessage={sendMessage} />
    </Box>
  );
};

export default ChatRoom;
