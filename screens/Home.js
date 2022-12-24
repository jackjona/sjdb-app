import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Post Screen"
        onPress={() => navigation.navigate("Post")}
      />
      <Button
        title="Go to Calendar Screen"
        onPress={() => navigation.navigate("Calendar")}
      />
      <Button
        title="Go to Profile Screen"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Go to Settings Screen"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
