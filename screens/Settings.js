import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

import * as Device from "expo-device";

const Settings = ({ navigation }) => {
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
        <Text style={[styles.text, styles.heading]}>Info Page</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.item}>
          <Text style={[styles.text]}>Device Information</Text>
        </TouchableOpacity>
        {Device.isDevice && (
          <TouchableOpacity style={styles.item} s>
            <Text style={[styles.text]}>Real Device? Yes</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity activeOpacity={0.7} style={styles.item}>
          <Text style={[styles.text]}>
            Device Brand: <Text style={styles.text}>{Device.brand}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.item}>
          <Text style={[styles.text]}>
            Device Year:{" "}
            <Text style={styles.text}>{Device.deviceYearClass}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.item}>
          <Text style={[styles.text]}>
            Device Model Name:{" "}
            <Text style={styles.text}>{Device.modelName}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.item}>
          <Text style={[styles.text]}>
            Device Model ID: <Text style={styles.text}>{Device.modelId}</Text>
          </Text>
        </TouchableOpacity>
        <Text style={[styles.text, styles.heading]}>Hardware</Text>

        <TouchableOpacity activeOpacity={0.7} style={styles.item}>
          <Text style={[styles.text]}>
            Device CPU Architectures:{" "}
            <Text style={styles.text}>{Device.supportedCpuArchitectures}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.item}>
          <Text style={[styles.text]}>
            Device Memory: {formatBytes(Device.totalMemory)}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.text, styles.heading]}>Software Information</Text>

        <TouchableOpacity activeOpacity={0.7} style={styles.item}>
          <Text style={[styles.text]}>
            OS Name: <Text style={styles.text}>{Device.osName}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.item}>
          <Text style={[styles.text]}>
            OS Version: <Text style={styles.text}>{Device.osVersion}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.item}>
          <Text style={[styles.text]}>
            OS Build ID: <Text style={styles.text}>{Device.osBuildId}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Button title="Go Home" onPress={() => navigation.navigate("Home")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  itemList: {
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 16,
    paddingTop: 30,
    marginBottom: 20,
    textDecorationLine: "underline",
  },

  text: {
    color: "white",
    paddingLeft: 30,
    fontSize: 16,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#181818",
    width: "100%",
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 0.2,
    borderTopColor: "gray",
    borderBottomColor: "gray",
  },
});

export default Settings;
