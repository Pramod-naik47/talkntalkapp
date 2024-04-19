import React from "react";
import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatContext";
import UserProfile from "./UserProfile";

const SideDrawer = () => {
  const navigate = useNavigate();
  const { user, setUser } = ChatState();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };


  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-N-Talk
        </Text>
        <Menu>
          <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.pic}
            />
          </MenuButton>
          <MenuList>
            <UserProfile user={user}>
              <MenuItem>My Profile</MenuItem>
            </UserProfile>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};

export default SideDrawer;
