import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";

const Homepage = () => {
 
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        alignItems="center"
        alignContent="center"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Talk-N-Talk
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab key="login-panel-tab">Login</Tab>
            <Tab key="signup-panel-tab">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel key="login-panel">
              <Login />
            </TabPanel>
            <TabPanel key="signup-panel">
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
