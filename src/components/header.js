import React from "react";
import { VStack, Heading, Box } from "native-base";

const Header = ({ home, subscreen, title, name, children }) => {
  const currentTime = new Date().getHours();

  function Greeting(props) {
    const time = props.time;
    if (time < 12) {
      return "Good Morning,";
    } else if (time >= 12 && time <= 17) {
      return "Good Afternoon,";
    } else if (time >= 17 && time <= 24) {
      return "Good Evening,";
    }
    return "Welcome!";
  }

  return (
    <>
      {home && (
        <VStack
          h={"170px"}
          bg="darkBlue.700"
          borderBottomLeftRadius={30}
          borderBottomRightRadius={30}
        >
          <Box alignSelf="flex-end">{children}</Box>
          <Heading color="white" px={6} size="xl">
            {title ? title : <Greeting time={currentTime} />}
          </Heading>
          {!title && (
            <Heading color="white" mb={2} px={6} size="xl">
              {name ? name : "Student"}
            </Heading>
          )}
        </VStack>
      )}
      {!home && !subscreen && (
        <VStack h={"220px"} bg="darkBlue.700">
          <Box alignSelf="flex-end">{children}</Box>
          <Heading color="white" px={6} size="xl">
            {title ? title : <Greeting time={currentTime} />}
          </Heading>
          {!title && (
            <Heading color="white" mb={2} px={6} size="xl">
              {name ? name : "Student"}
            </Heading>
          )}
        </VStack>
      )}
      {subscreen && (
        <VStack
          h={"140px"}
          bg="darkBlue.700"
          borderBottomLeftRadius={20}
          borderBottomRightRadius={20}
        >
          <Box alignSelf="flex-end">{children}</Box>
          <Heading color="white" px={6} size="xl">
            {title ? title : <Greeting time={currentTime} />}
          </Heading>
          {!title && (
            <Heading color="white" mb={2} px={6} size="xl">
              {name ? name : "Student"}
            </Heading>
          )}
        </VStack>
      )}
    </>
  );
};

export default Header;
