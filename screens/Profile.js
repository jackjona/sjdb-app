import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const Profile = ({ navigation }) => {
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
          <Text style={[styles.text, styles.studentName]}>Miku H.</Text>
          <Text style={[styles.text, styles.position]}>Student</Text>
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Student #: </Text>
            <Text style={styles.studentInfo}>100742849</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Valid: </Text>
            <Text style={styles.studentInfo}>2022/2023</Text>
          </Text>
        </View>
        <View style={styles.barcode}>
          {/* TO DO: Dynamically Generate Barcode */}
          <Image
            style={styles.barcodeImage}
            source={require("../assets/barcode.png")}
          />
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
    backgroundColor: "#04234F",
  },
  text: {
    color: "#ffffff",
  },
  text: {
    color: "#ffffff",
  },
  boldText: {
    fontSize: 16.5,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#121212",
    width: 350,
    height: 560,
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
    /* fontFamily: "Optima-Regular, Palatin, Trebuchet MSo",*/
    fontSize: 20,
    fontWeight: "900",
    marginLeft: 10,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  cardContent: {
    paddingTop: 50,
    alignItems: "center",
    textAlign: "center",
  },
  cardDetails: {
    paddingTop: 24,
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
    alignItems: "center",
  },
  barcodeImage: {
    marginTop: 10,
    width: 180,
    height: 80,
    backgroundColor: "#ffffff",
  },
});
export default Profile;
