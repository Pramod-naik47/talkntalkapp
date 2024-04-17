import React, { useState } from "react";
import MyChats from "./MyChats";
import { ChatState } from "../Context/ChatContext";
import { Box } from "@chakra-ui/react";
import SideDrawer from "./SideDrawer";

const ChatWindow = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
      </Box>
    </div>
  );
};

export default ChatWindow;
