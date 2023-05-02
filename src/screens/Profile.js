import { useEffect, useState } from "react";
import { Modal, StyleSheet, Pressable } from "react-native";
import {
  View,
  Box,
  Heading,
  Text,
  Button,
  Image,
  useColorModeValue,
} from "native-base";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/navbar";
import Header from "../components/header";
import Barcode from "../components/barcode";

const ProfileScreen = ({ navigation }) => {
  const [nameValue, setNameValue] = useState("");
  const [idValue, setIdValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    isFocused && getData();
  }, [isFocused]);

  const getData = async () => {
    try {
      const studentName = await AsyncStorage.getItem("student_name");
      const idNumber = await AsyncStorage.getItem("studentID_number");

      if (studentName || idNumber !== null) {
        setNameValue(studentName);
        setIdValue(idNumber);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      flex={1}
      bg={useColorModeValue("warmGray.50", "warmGray.900")}
      w="full"
    >
      <Header title="Student ID">
        <Navbar />
      </Header>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Box
          width={"full"}
          bg={useColorModeValue("warmGray.50", "darkBlue.800")}
          h="100%"
          justifyContent={"center"}
          alignItems="center"
        >
          <Pressable>
            <Box w="20%" marginVertical={10}>
              <Button
                _pressed={{ backgroundColor: "red.300" }}
                title="Close"
                bg={useColorModeValue("red.200", "red.800")}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text color={useColorModeValue("red.600", "white")}>Close</Text>
              </Button>
            </Box>

            <View style={[styles.card, styles.cardShadow]}>
              <View style={styles.cardHeader}>
                <Image
                  style={styles.logoImage}
                  source={require("../assets/logo.png")}
                  alt="St. Jean de Brebeuf logo"
                />
                <Text style={[styles.text, styles.schoolName]}>
                  St. Jean de Brebeuf Catholic High School
                </Text>
              </View>
              <Image
                source={require("../assets/cardImage.jpeg")}
                style={styles.cardImage}
                alt="St. Jean de Brebeuf school"
              />
              <View style={styles.cardContent}>
                <Heading style={[styles.text, styles.studentName]}>
                  {nameValue ? nameValue : "Student"}
                </Heading>
                <Text style={[styles.text, styles.position]}>Student</Text>
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Student #: </Text>
                  <Text style={styles.studentInfo}>
                    {idValue ? idValue : "000000000"}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>Valid: </Text>
                  <Text style={styles.studentInfo}>
                    {new Date().getFullYear() - 1}/{new Date().getFullYear()}
                  </Text>
                </Text>
              </View>
              <View style={styles.barcode}>
                <View style={styles.barcodeImage}>
                  <Barcode
                    value={idValue ? idValue : "000000000"}
                    options={{ format: "CODE39", background: "white" }}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        </Box>
      </Modal>
      <Box
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue("warmGray.50", "primary.900")}
        mt="-30px"
        p={4}
        h="full"
      >
        <Pressable onPress={() => setModalVisible(true)}>
          <View style={[styles.card, styles.cardShadow]}>
            <View style={styles.cardHeader}>
              <Image
                style={styles.logoImage}
                source={require("../assets/logo.png")}
                alt="St. Jean de Brebeuf logo"
              />
              <Text style={[styles.text, styles.schoolName]}>
                St. Jean de Brebeuf Catholic High School
              </Text>
            </View>
            <Image
              source={require("../assets/cardImage.jpeg")}
              style={styles.cardImage}
              alt="St. Jean de Brebeuf school"
            />
            <View style={styles.cardContent}>
              <Heading style={[styles.text, styles.studentName]}>
                {nameValue ? nameValue : "Student"}
              </Heading>
              <Text style={[styles.text, styles.position]}>Student</Text>
            </View>
            <View style={styles.cardDetails}>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Student #: </Text>
                <Text style={styles.studentInfo}>
                  {idValue ? idValue : "000000000"}
                </Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Valid: </Text>
                <Text style={styles.studentInfo}>
                  {new Date().getFullYear() - 1}/{new Date().getFullYear()}
                </Text>
              </Text>
            </View>
            <View style={styles.barcode}>
              <View style={styles.barcodeImage}>
                <Barcode
                  value={idValue ? idValue : "000000000"}
                  options={{ format: "CODE39", background: "white" }}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d152d",
  },
  text: {
    color: "#EFEFEF",
  },

  boldText: {
    fontSize: 16.5,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#121212",
    width: 350,
    height: 600,
    borderRadius: 20,
    marginTop: "12%",
  },
  cardShadow: {
    shadowOffset: { width: -5, height: 5 },
    shadowColor: "#121212",
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  cardImage: {
    width: 350,
    height: 130,
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  cardHeader: {
    margin: 20,
    marginVertical: 14,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  schoolName: {
    fontFamily: "AppleSDGothicNeo-Regular",
    // fontFamily: "Optima-Regular, Palatin, Trebuchet MSo",
    fontSize: 20,
    fontWeight: "900",
    marginLeft: 10,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  cardContent: {
    paddingTop: 40,
    alignItems: "center",
    textAlign: "center",
  },
  cardDetails: {
    marginTop: 10,
    alignItems: "center",
  },
  studentName: {
    fontSize: 30,
    fontWeight: "500",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  position: {
    padding: 6,
    fontSize: 18,
    fontWeight: "500",
    color: "#DCDCDC",
  },
  studentInfo: {
    fontSize: 16.5,
  },
  barcode: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 24,
  },
  barcodeImage: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: 300,
    height: 114,
    borderRadius: 6,
  },
});

export default ProfileScreen;
