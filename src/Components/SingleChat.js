import React, {useState} from "react";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import ChatMessages from "./ChatMessages";
import { ChatState } from "../Context/ChatContext";

const SingleChat = () => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messageTypeHandler = () => {}
  return (
    <>
      {selectedChat ? (
        <Box
          d="flex"
          flexDir="column"
          justifyContent="flex-end"
          p={3}
          bg="#E8E8E8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {loading ? (
            <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
          ) : (
            <div className="messages">
              <ChatMessages messages={messages} />
            </div>
          )}

          <FormControl
            //onKeyDown={sendMessage}
            id="first-name"
            isRequired
            mt={3}
          >
            <Input
              variant="filled"
              background="#E0E0E0"
              placeholder="Enter a message.."
              value={newMessage}
              onChange={messageTypeHandler}
            />
          </FormControl>
        </Box>
      ) : (
        // to get socket.io on same page
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pd={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
