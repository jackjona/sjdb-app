import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Modal,
  Alert,
} from "react-native";

import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {
  const [nameInputValue, setNameInputValue] = useState("");
  const [idInputValue, setIdInputValue] = useState("");
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [idModalVisible, setIdModalVisible] = useState(false);

  const saveName = () => {
    if (nameInputValue) {
      AsyncStorage.setItem("student_name", nameInputValue);
      setNameModalVisible(!nameModalVisible);
      Alert.alert("Success", "Your Data Was Successfuly Saved", [
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
      /*       
      AsyncStorage.setItem("studentID_number", "000000000");
      AsyncStorage.setItem("student_name", "Student"); 
      */
      AsyncStorage.setItem("studentID_number", "100743222");
      AsyncStorage.setItem("student_name", "Miku H.");
      Alert.alert("Success", "Your Data Was Cleared", [{ text: "OK" }]);
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
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => clearData() },
      ]
    );

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.itemList}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={nameModalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
            setNameModalVisible(!nameModalVisible);
          }}
        >
          <View style={styles.modelContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={[styles.text, styles.input]}
                placeholder="Enter Your Full Name"
                placeholderTextColor="#fafafa"
                value={nameInputValue.replace(
                  /[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                  ""
                )}
                maxLength={30}
                // keyboardType="numeric"
                onChangeText={(data) => setNameInputValue(data)}
                underlineColorAndroid="transparent"
                clearButtonMode="always"
              />
              <TouchableOpacity onPress={saveName}>
                <Text style={[styles.text, styles.modalButton]}>
                  {" "}
                  Save Value{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setNameModalVisible(!nameModalVisible)}
              >
                <Text style={[styles.text, styles.modalButton]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={idModalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
            setIdModalVisible(!idModalVisible);
          }}
        >
          <View style={styles.modelContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={[styles.text, styles.input]}
                placeholder="Enter Your Student ID "
                placeholderTextColor="#fafafa"
                value={idInputValue.replace(/[^0-9]/g, "")}
                maxLength={9}
                keyboardType="numeric"
                onChangeText={(data) => setIdInputValue(data)}
                underlineColorAndroid="transparent"
                clearButtonMode="always"
              />
              <TouchableOpacity onPress={saveId}>
                <Text style={[styles.text, styles.modalButton]}>
                  {" "}
                  Save Value{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIdModalVisible(!idModalVisible)}
              >
                <Text style={[styles.text, styles.modalButton]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={(nameModalVisible || idModalVisible) && styles.overlay}>
          <Text style={[styles.text, styles.heading]}>User Information</Text>

          <View>
            <TouchableOpacity
              style={styles.item}
              onPress={() => setNameModalVisible(true)}
            >
              <Text style={[styles.text, styles.itemText]}>Edit Your Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => setIdModalVisible(true)}
            >
              <Text style={[styles.text, styles.itemText]}>
                Edit Your Student ID
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, styles.heading]}>Acknowledgements</Text>

          {/* TODO: Build Acknowledgement Screen */}
          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>
              Third-Pary Libraries
            </Text>
          </TouchableOpacity>

          <Text style={[styles.text, styles.heading]}>Debug Information</Text>

          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>
              OS Name: <Text style={styles.text}>{Device.osName}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>
              OS Version: <Text style={styles.text}>{Device.osVersion}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>
              OS Build ID: <Text style={styles.text}>{Device.osBuildId}</Text>
            </Text>
          </TouchableOpacity>
          {/* TODO: Wink ;) */}
          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>Developer Tools</Text>
          </TouchableOpacity>

          {/*           
          <Text style={[styles.text, styles.heading]}>Hardware</Text>
          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>
              Device Brand: <Text style={styles.text}>{Device.brand}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>
              Device Year:{" "}
              <Text style={styles.text}>{Device.deviceYearClass}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>
              Device Model Name:{" "}
              <Text style={styles.text}>{Device.modelName}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>
              Device Model ID: <Text style={styles.text}>{Device.modelId}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>
              Device CPU Architectures:{" "}
              <Text style={styles.text}>
                {Device.supportedCpuArchitectures}
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.item}>
            <Text style={[styles.text, styles.itemText]}>
              Device Memory: {formatBytes(Device.totalMemory)}
            </Text>
          </TouchableOpacity> 
          */}

          <Text style={[styles.text, styles.heading]}>
            {/* Erase All Data */}
          </Text>
          <TouchableOpacity onPress={clearDataConfirmation} style={styles.item}>
            <Text style={[styles.text, styles.itemText, styles.clearText]}>
              Clear All Data
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /*   centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#121212",
    color: "#ffffff",
    borderRadius: 10,
    paddingVertical: 90,
    paddingHorizontal: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }, */

  container: {
    flex: 1,
    backgroundColor: "#0d152d",
  },

  itemList: {
    marginTop: 20,
  },

  overlay: {
    opacity: 0.2,
  },

  heading: {
    fontSize: 16,
    marginTop: 40,
    marginBottom: 12,
    marginLeft: 26,
    color: "#DCDCDC",
  },

  text: {
    color: "#EFEFEF",
    fontSize: 16,
  },

  modelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#142044",
    borderRadius: 10,
    width: 310,
    height: 300,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  input: {
    height: 50,
    width: 180,
    marginHorizontal: 12,
    marginBottom: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fafafa",
    borderRadius: 4,
  },

  modalButton: {
    textAlign: "center",
    height: 40,
    width: 150,
    margin: 10,
    padding: 10,
    backgroundColor: "#0d152d",
    borderWidth: 1,
    borderColor: "#fafafa",
    borderRadius: 6,
  },

  item: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#141926",
    width: "100%",
    margin: 0,
    paddingVertical: 16,
    borderWidth: 0.2,
    borderTopColor: "gray",
    borderBottomColor: "gray",
  },

  itemText: {
    paddingLeft: 30,
  },

  clearText: {
    color: "#D22B2B",
  },
});

export default Settings;
