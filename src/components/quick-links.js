import React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  Box,
  HStack,
  Icon,
  useColorModeValue,
  Pressable,
  Text,
  Flex,
  ScrollView,
} from "native-base";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const QuickLinks = () => {
  // Open quick links using the in-app browser | #00000
  const openWebsite = async () => {
    await WebBrowser.openBrowserAsync("https://sjdbh.ycdsb.ca", {
      toolbarColor: "#000000",
    });
  };

  const openD2l = async () => {
    await WebBrowser.openBrowserAsync("http://ycdsb.elearningontario.ca/", {
      toolbarColor: "#000000",
    });
  };

  const openGClassroom = async () => {
    await WebBrowser.openBrowserAsync("https://classroom.google.com/", {
      toolbarColor: "#000000",
    });
  };

  const openEdsembli = async () => {
    await WebBrowser.openBrowserAsync(
      "https://connect.edsembli.com/ON/YCDSB/SJDBH/Portal/viewer/login/login.aspx?LoginType=S",
      {
        toolbarColor: "#000000",
      }
    );
  };

  const openTwitter = async () => {
    await WebBrowser.openBrowserAsync("https://twitter.com/SJDBrebeufCHS", {
      toolbarColor: "#000000",
    });
  };

  const openInstagram = async () => {
    await WebBrowser.openBrowserAsync(
      "https://www.instagram.com/st.jeandebrebeufchs/",
      {
        toolbarColor: "#000000",
      }
    );
  };

  const openSelfScreen = async () => {
    await WebBrowser.openBrowserAsync(
      "https://www.ontario.ca/school-screening/",
      {
        toolbarColor: "#000000",
      }
    );
  };

  return (
    <ScrollView
      horizontal={true}
      mt={6}
      w="full"
      showsHorizontalScrollIndicator={false}
    >
      <Box bg={useColorModeValue("warmGray.50", "darkBlue.800")} p={4}>
        <HStack space={4} justifyContent="center">
          <Box alignItems="center" justifyContent="center">
            <Pressable
              h="20"
              w="20"
              bg={useColorModeValue("blue.50", "darkBlue.900")}
              rounded="md"
              shadow={3}
              onPress={openWebsite}
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                size="12"
                as={Feather}
                name="globe"
                color="dark"
                _dark={{
                  color: "warmGray.50",
                }}
              />
            </Pressable>
            <Flex py={2} alignItems="center" justifyContent="center">
              <Text fontSize="xs">School</Text>
              <Text fontSize="xs">Website</Text>
            </Flex>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Pressable
              h="20"
              w="20"
              bg={useColorModeValue("blue.50", "darkBlue.900")}
              rounded="md"
              shadow={3}
              onPress={openD2l}
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                size="12"
                as={MaterialCommunityIcons}
                name="school-outline"
                color="dark"
                _dark={{
                  color: "warmGray.50",
                }}
              />
            </Pressable>
            <Flex py={4} alignItems="center" justifyContent="center">
              <Text fontSize="xs">D2L</Text>
            </Flex>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Pressable
              h="20"
              w="20"
              bg={useColorModeValue("blue.50", "darkBlue.900")}
              rounded="md"
              shadow={3}
              onPress={openGClassroom}
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                size="12"
                as={MaterialCommunityIcons}
                name="google-classroom"
                color="dark"
                _dark={{
                  color: "warmGray.50",
                }}
              />
            </Pressable>
            <Flex py={2} alignItems="center" justifyContent="center">
              <Text fontSize="xs">Google</Text>
              <Text fontSize="xs">Classroom</Text>
            </Flex>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Pressable
              h="20"
              w="20"
              bg={useColorModeValue("blue.50", "darkBlue.900")}
              rounded="md"
              shadow={3}
              onPress={openEdsembli}
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                size="12"
                as={Feather}
                name="user"
                color="dark"
                _dark={{
                  color: "warmGray.50",
                }}
              />
            </Pressable>
            <Flex py={4} alignItems="center" justifyContent="center">
              <Text fontSize="xs">Edsembli</Text>
            </Flex>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Pressable
              h="20"
              w="20"
              bg={useColorModeValue("blue.50", "darkBlue.900")}
              rounded="md"
              shadow={3}
              onPress={openTwitter}
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                size="12"
                as={Feather}
                name="twitter"
                color="dark"
                _dark={{
                  color: "warmGray.50",
                }}
              />
            </Pressable>
            <Flex py={4} alignItems="center" justifyContent="center">
              <Text fontSize="xs">Twitter</Text>
            </Flex>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Pressable
              h="20"
              w="20"
              bg={useColorModeValue("blue.50", "darkBlue.900")}
              rounded="md"
              shadow={3}
              onPress={openInstagram}
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                size="12"
                as={Feather}
                name="instagram"
                color="dark"
                _dark={{
                  color: "warmGray.50",
                }}
              />
            </Pressable>
            <Flex py={4} alignItems="center" justifyContent="center">
              <Text fontSize="xs">Instagram</Text>
            </Flex>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Pressable
              h="20"
              w="20"
              bg={useColorModeValue("blue.50", "darkBlue.900")}
              rounded="md"
              shadow={3}
              onPress={openSelfScreen}
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                size="12"
                as={MaterialCommunityIcons}
                name="hospital-box-outline"
                color="dark"
                _dark={{
                  color: "warmGray.50",
                }}
              />
            </Pressable>

            <Flex py={2} alignItems="center" justifyContent="center">
              <Text fontSize="xs">Self</Text>
              <Text fontSize="xs">Screening</Text>
            </Flex>
          </Box>
        </HStack>
      </Box>
    </ScrollView>
  );
};

export default QuickLinks;
