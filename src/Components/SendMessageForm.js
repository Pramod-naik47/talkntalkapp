import React, {useState} from "react";
import { Form } from "react-router-dom";
import { FormControl, InputGroup, Input, InputRightElement, Button, VStack} from "@chakra-ui/react";

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  return (
    // <VStack spacing="10px" style={{width: "80%"}}>
    <>
      <Form onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
        {/* <FormControl key="message-form"> */}
          <InputGroup size="md" style={{width: "100%", borderColor:"black"}}>
            <Input
              pr='4.5rem'
              key="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Enter message"
            />
            <InputRightElement width="4.5rem" paddingRight={2}>
              <Button h="1.75rem" size="sm" type="submit" disabled={!message} colorScheme="teal">Send</Button>
            </InputRightElement>
          </InputGroup>
        {/* </FormControl> */}
      </Form>
    {/* </VStack> */}
    </>
  );
};

export default SendMessageForm;
