import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Barcode from "../components/Barcode";

const Profile = ({ navigation }) => {
  const [nameValue, setNameValue] = useState("");
  const [idValue, setIdValue] = useState("");
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
      /* console.error(error); */
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.cardShadow]}>
        <View style={styles.cardHeader}>
          <Image
            style={styles.logoImage}
            source={require("../assets/logo.png")}
          />
          <Text style={[styles.text, styles.schoolName]}>
            St. Jean de Brebeuf Catholic High School
          </Text>
        </View>
        <Image
          source={require("../assets/cardImage.jpeg")}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={[styles.text, styles.studentName]}>
            {nameValue ? nameValue : "Student"}
          </Text>
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
    </View>
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
    marginTop: 30,
    alignItems: "center",
    textAlign: "center",
  },
  cardDetails: {
    marginTop: 24,
    alignItems: "center",
  },
  studentName: {
    fontSize: 30,
    fontWeight: "500",
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
export default Profile;
