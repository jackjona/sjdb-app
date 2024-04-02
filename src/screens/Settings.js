import { useState } from "react";
import { Alert } from "react-native";
import * as Device from "expo-device";
import {
  ScrollView,
  Box,
  Text,
  VStack,
  Icon,
  Button,
  useColorModeValue,
  Pressable,
  Modal,
  FormControl,
  Input,
  IconButton,
  useColorMode,
} from "native-base";
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Navbar from "../components/navbar";
import Header from "../components/header";

const SettingsScreen = ({ navigation }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [nameInputValue, setNameInputValue] = useState("");
  const [idInputValue, setIdInputValue] = useState("");

  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [idModalVisible, setIdModalVisible] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  const appVersion = "2.1.1 (Miku)";

  const saveName = () => {
    if (nameInputValue) {
      AsyncStorage.setItem("student_name", nameInputValue);
      setNameModalVisible(!nameModalVisible);
      Alert.alert("Success", "Your Name Was Updated Successfully", [
        { text: "OK" },
      ]);
    } else {
      Alert.alert("Error", "Please Enter A Value", [{ text: "OK" }]);
    }
  };

  const saveId = () => {
    if (idInputValue) {
      AsyncStorage.setItem("studentID_number", idInputValue);
      setIdModalVisible(!idModalVisible);
      Alert.alert("Success", "Your Data Was Successfuly Saved", [
        { text: "OK" },
      ]);
    } else {
      Alert.alert("Error", "Please Enter A Value", [{ text: "OK" }]);
    }
  };

  const clearData = () => {
    try {
      /*       AsyncStorage.setItem("studentID_number", "100743222");
      AsyncStorage.setItem("student_name", "Miku H."); */
      AsyncStorage.setItem("studentID_number", "000000000");
      AsyncStorage.setItem("student_name", "Student");
      Alert.alert("Success", "Data Cleared Successfully", [{ text: "OK" }]);
    } catch (error) {
      Alert.alert("Error", "Please Enter A Value", [{ text: "OK" }]);
    }
  };

  const clearDataConfirmation = () =>
    Alert.alert(
      "Clear Data",
      "Are you sure you want to clear all local data?",
      [
        {
          text: "Cancel",
          style: "cancel",
          // onPress: () => console.log("Cancel Pressed"),
        },
        { text: "OK", onPress: () => clearData() },
      ]
    );

  const setTheme = () => {
    if (isLightMode) {
      AsyncStorage.setItem("@color-mode", "dark");
      setIsLightMode(false);
      toggleColorMode();
      //  console.log("dark mode set");
    } else if (!isLightMode) {
      AsyncStorage.setItem("@color-mode", "light");
      setIsLightMode(true);
      toggleColorMode();
      //     console.log("light mode set");
    } else {
      Alert.alert("Error", "An Error Has Occured", [{ text: "OK" }]);
    }
  };

  return (
    <Box
      flex={1}
      bg={useColorModeValue("warmGray.50", "warmGray.500")}
      w="full"
    >
      <Header title="Settings">
        <Navbar />
      </Header>

      {/* Name Modal */}
      <Modal
        isOpen={nameModalVisible}
        onClose={() => setNameModalVisible(false)}
        safeAreaTop={true}
        avoidKeyboard
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Edit Your Name</Modal.Header>
          <Modal.Body>
            <FormControl mb="3">
              <FormControl.Label>Full Name</FormControl.Label>
              <Input
                placeholder="Enter Your Full Name"
                placeholderTextColor={useColorModeValue(
                  "dark.500",
                  "warmGray.500"
                )}
                value={nameInputValue.replace(
                  /[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                  ""
                )}
                maxLength={30}
                // keyboardType="numeric"
                onChangeText={(data) =>
                  setNameInputValue(
                    data.replace(
                      /[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                      ""
                    )
                  )
                }
                clearButtonMode="always"
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="red"
                onPress={() => {
                  setNameModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="darkBlue"
                onPress={() => {
                  setNameModalVisible(false) & saveName();
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* ID Number Modal */}
      <Modal
        isOpen={idModalVisible}
        onClose={() => setIdModalVisible(false)}
        safeAreaTop={true}
        avoidKeyboard
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Edit Your Student Number</Modal.Header>
          <Modal.Body>
            <FormControl mb="3">
              <FormControl.Label>Student ID Number</FormControl.Label>
              <Input
                placeholder="Enter Your Student ID Number"
                placeholderTextColor={useColorModeValue(
                  "dark.500",
                  "warmGray.500"
                )}
                value={idInputValue.replace(/[^0-9]/g, "")}
                maxLength={9}
                keyboardType="numeric"
                onChangeText={(data) => setIdInputValue(data)}
                underlineColorAndroid="transparent"
                clearButtonMode="always"
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="red"
                onPress={() => {
                  setIdModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="darkBlue"
                onPress={() => {
                  setIdModalVisible(false) & saveId();
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue("warmGray.50", "primary.900")}
        mt="-30px"
        pt="30px"
        px={4}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => {
            setTheme();
          }}
        >
          {({ isHovered, isPressed }) => {
            return (
              <Box
                rounded={"lg"}
                py={5}
                px={4}
                borderBottomColor="dark.700"
                borderBottomWidth={0}
                bg={
                  isPressed
                    ? "darkBlue.700"
                    : isHovered
                    ? "dark.700"
                    : "darkBlue.800"
                }
                style={{
                  transform: [
                    {
                      scale: isPressed ? 0.96 : 1,
                    },
                  ],
                }}
                flex
                flexDirection={"row"}
              >
                <Box flex flexDirection={"row"} alignItems={"center"}>
                  <Icon
                    size="8"
                    as={MaterialCommunityIcons}
                    name="theme-light-dark"
                    color={useColorModeValue("dark.500", "primary.100")}
                  />
                  <Text
                    pl={2}
                    fontSize="lg"
                    color={useColorModeValue("dark.700", "white")}
                  >
                    {isLightMode ? "Dark Mode" : "Light Mode"}
                  </Text>
                </Box>
              </Box>
            );
          }}
        </Pressable>

        <VStack>
          <Text fontSize="lg" bold pt="4" pb="1">
            Student Information
          </Text>
          <Pressable
            onPress={() => {
              setNameModalVisible(true);
            }}
          >
            {({ isHovered, isPressed }) => {
              return (
                <Box
                  roundedTop={"lg"}
                  py={5}
                  px={4}
                  borderBottomColor="dark.700"
                  borderBottomWidth={1}
                  bg={
                    isPressed
                      ? "darkBlue.700"
                      : isHovered
                      ? "dark.700"
                      : "darkBlue.800"
                  }
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  flex
                  flexDirection={"row"}
                >
                  <Box flex flexDirection={"row"} alignItems={"center"}>
                    <Icon
                      size="8"
                      as={AntDesign}
                      name="user"
                      color={useColorModeValue("dark.500", "primary.100")}
                    />
                    <Text
                      pl={2}
                      fontSize="lg"
                      color={useColorModeValue("dark.700", "white")}
                    >
                      Edit Your Name
                    </Text>
                  </Box>
                  <Box>
                    <Icon
                      size="8"
                      as={Feather}
                      name="edit"
                      color={useColorModeValue("dark.500", "primary.100")}
                    />
                  </Box>
                </Box>
              );
            }}
          </Pressable>
          <Pressable
            onPress={() => {
              setIdModalVisible(true);
            }}
          >
            {({ isHovered, isPressed }) => {
              return (
                <Box
                  roundedBottom={"lg"}
                  py={5}
                  px={4}
                  borderBottomColor="dark.700"
                  borderBottomWidth={0}
                  bg={
                    isPressed
                      ? "darkBlue.700"
                      : isHovered
                      ? "dark.700"
                      : "darkBlue.800"
                  }
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  flex
                  flexDirection={"row"}
                >
                  <Box flex flexDirection={"row"} alignItems={"center"}>
                    <Icon
                      size="8"
                      as={AntDesign}
                      name="idcard"
                      color={useColorModeValue("dark.500", "primary.100")}
                    />
                    <Text
                      pl={2}
                      fontSize="lg"
                      color={useColorModeValue("dark.700", "white")}
                    >
                      Edit Your Student Number
                    </Text>
                  </Box>
                  <Box>
                    <Icon
                      size="8"
                      as={Feather}
                      name="edit"
                      color={useColorModeValue("dark.500", "primary.100")}
                    />
                  </Box>
                </Box>
              );
            }}
          </Pressable>

          <Text fontSize="lg" bold pt="4" pb="1">
            Information
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("OurSchool");
            }}
          >
            {({ isHovered, isPressed }) => {
              return (
                <Box
                  roundedTop={"lg"}
                  py={5}
                  px={4}
                  borderBottomColor="dark.700"
                  borderBottomWidth={1}
                  bg={
                    isPressed
                      ? "darkBlue.700"
                      : isHovered
                      ? "dark.700"
                      : "darkBlue.800"
                  }
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  flex
                  flexDirection={"row"}
                >
                  <Box flex flexDirection={"row"} alignItems={"center"}>
                    <Icon
                      size="6"
                      as={FontAwesome5}
                      name="school"
                      color={useColorModeValue("dark.500", "primary.100")}
                    />
                    <Text
                      pl={4}
                      fontSize="lg"
                      color={useColorModeValue("dark.700", "white")}
                    >
                      Our School
                    </Text>
                  </Box>
                  <Box>
                    <Icon
                      size="8"
                      as={MaterialIcons}
                      name="navigate-next"
                      color={useColorModeValue("dark.500", "primary.100")}
                    />
                  </Box>
                </Box>
              );
            }}
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Licenses");
            }}
          >
            {({ isHovered, isPressed }) => {
              return (
                <Box
                  roundedBottom={"lg"}
                  py={5}
                  px={4}
                  borderBottomColor="dark.700"
                  borderBottomWidth={0}
                  bg={
                    isPressed
                      ? "darkBlue.700"
                      : isHovered
                      ? "dark.700"
                      : "darkBlue.800"
                  }
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  flex
                  flexDirection={"row"}
                >
                  <Box flex flexDirection={"row"} alignItems={"center"}>
                    <Icon
                      size="8"
                      as={MaterialCommunityIcons}
                      name="license"
                      color={useColorModeValue("dark.500", "primary.100")}
                    />
                    <Text
                      pl={2}
                      fontSize="lg"
                      color={useColorModeValue("dark.700", "white")}
                    >
                      Third-Party Licenses
                    </Text>
                  </Box>
                  <Box>
                    <Icon
                      size="8"
                      as={MaterialIcons}
                      name="navigate-next"
                      color={useColorModeValue("dark.500", "primary.100")}
                    />
                  </Box>
                </Box>
              );
            }}
          </Pressable>

          <Text fontSize="lg" bold pt="4" pb="1">
            Debug Information
          </Text>
          <Pressable
            roundedTop={"lg"}
            py={5}
            px={4}
            borderBottomColor="dark.700"
            borderBottomWidth={1}
            bg="darkBlue.800"
          >
            <Box flex flexDirection={"row"} alignItems={"center"}>
              <Icon
                size="8"
                as={Ionicons}
                name="information-circle"
                color={useColorModeValue("dark.500", "primary.100")}
              />
              <Text
                pl={2}
                fontSize="lg"
                color={useColorModeValue("dark.700", "white")}
              >
                OS Name: <Text color="white">{Device.osName}</Text>
              </Text>
            </Box>
          </Pressable>
          <Pressable
            py={5}
            px={4}
            borderBottomColor="dark.700"
            borderBottomWidth={1}
            bg="darkBlue.800"
          >
            <Box flex flexDirection={"row"} alignItems={"center"}>
              <Icon
                size="8"
                as={Ionicons}
                name="information-circle"
                color={useColorModeValue("dark.500", "primary.100")}
              />
              <Text
                pl={2}
                fontSize="lg"
                color={useColorModeValue("dark.700", "white")}
              >
                OS Version: <Text color="white">{Device.osVersion}</Text>
              </Text>
            </Box>
          </Pressable>
          <Pressable
            py={5}
            px={4}
            borderBottomColor="dark.700"
            borderBottomWidth={1}
            bg="darkBlue.800"
          >
            <Box flex flexDirection={"row"} alignItems={"center"}>
              <Icon
                size="8"
                as={Ionicons}
                name="information-circle"
                color={useColorModeValue("dark.500", "primary.100")}
              />
              <Text
                pl={2}
                fontSize="lg"
                color={useColorModeValue("dark.700", "white")}
              >
                OS Build ID: <Text color="white">{Device.osBuildId}</Text>
              </Text>
            </Box>
          </Pressable>
          <Pressable
            py={5}
            px={4}
            borderBottomColor="dark.700"
            borderBottomWidth={1}
            bg="darkBlue.800"
          >
            <Box flex flexDirection={"row"} alignItems={"center"}>
              <Icon
                size="8"
                as={Ionicons}
                name="information-circle"
                color={useColorModeValue("dark.500", "primary.100")}
              />
              <Text
                pl={2}
                fontSize="lg"
                color={useColorModeValue("dark.700", "white")}
              >
                App Version: <Text color="white">{appVersion}</Text>
              </Text>
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              Alert.alert(
                "Developer Mode",
                "Developer tools have not been enabled for this device",
                [{ text: "OK" }]
              );
            }}
          >
            {({ isHovered, isPressed }) => {
              return (
                <Box
                  roundedBottom={"lg"}
                  py={5}
                  px={4}
                  borderBottomColor="dark.700"
                  borderBottomWidth={0}
                  bg={
                    isPressed
                      ? "darkBlue.700"
                      : isHovered
                      ? "dark.700"
                      : "darkBlue.800"
                  }
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  flex
                  flexDirection={"row"}
                >
                  <Box flex flexDirection={"row"} alignItems={"center"}>
                    <Icon
                      size="8"
                      as={MaterialIcons}
                      name="developer-mode"
                      color={useColorModeValue("dark.500", "primary.100")}
                    />
                    <Text
                      pl={3}
                      fontSize="lg"
                      color={useColorModeValue("dark.700", "white")}
                    >
                      Developer Tools
                    </Text>
                  </Box>
                </Box>
              );
            }}
          </Pressable>

          <Text fontSize="lg" bold pt="4" pb="1">
            Clear Data
          </Text>
          <Pressable
            mb="60px"
            onPress={() => {
              clearDataConfirmation();
            }}
          >
            {({ isHovered, isPressed }) => {
              return (
                <Box
                  rounded={"lg"}
                  py={5}
                  px={4}
                  borderBottomColor="dark.700"
                  borderBottomWidth={0}
                  bg={
                    isPressed
                      ? "darkBlue.700"
                      : isHovered
                      ? "dark.700"
                      : "darkBlue.800"
                  }
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  flex
                  flexDirection={"row"}
                >
                  <Box flex flexDirection={"row"} alignItems={"center"}>
                    <Icon
                      size="8"
                      as={AntDesign}
                      name="delete"
                      color={useColorModeValue("dark.500", "red.600")}
                    />
                    <Text
                      pl={3}
                      fontSize="lg"
                      color={useColorModeValue("red.600", "red.600")}
                    >
                      Clear All Data
                    </Text>
                  </Box>
                </Box>
              );
            }}
          </Pressable>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default SettingsScreen;
