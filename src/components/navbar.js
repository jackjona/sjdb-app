import React from "react";
import { Alert } from "react-native";
import { HStack, IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavBar = ({ home }) => {
  const navigation = useNavigation();
  // Placeholder text for now
  const handlePressHomeButton = () =>
    Alert.alert("Notifications", "No New Notifications", [{ text: "OK" }]);

  return (
    <>
      {home ? (
        <HStack
          w="full"
          mt={0}
          mb={0}
          alignItems="center"
          alignContent="center"
          px={4}
        >
          <IconButton
            onPress={handlePressHomeButton}
            borderRadius={100}
            _icon={{
              as: Ionicons,
              name: "notifications",
              size: 6,
              color: "white",
            }}
          />
        </HStack>
      ) : (
        <HStack
          w="full"
          mt={16}
          alignItems="center"
          alignContent="center"
          px={4}
        >
          <IconButton
            onPress={handlePressHomeButton}
            borderRadius={100}
            _icon={{
              as: Ionicons,
              name: "notifications",
              size: 6,
              color: "white",
            }}
          />
        </HStack>
      )}
    </>
  );
};

export default NavBar;
