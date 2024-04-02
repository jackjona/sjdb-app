import { useState, useEffect, memo } from "react";
import {
  useColorModeValue,
  FlatList,
  Text,
  View,
  Pressable,
  Box,
  Spinner,
} from "native-base";
import Header from "../components/header";
import NavBar from "../components/navbar";

import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuickLinks from "../components/quick-links";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation, route }) {
  const { width } = useWindowDimensions(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [nameValue, setNameValue] = useState("");

  const isFocused = useIsFocused();

  const RenderContent = memo(RenderHtml);

  useEffect(() => {
    getPosts();
    getData();
  }, []);

  useEffect(() => {
    isFocused && getData();
  }, [isFocused]);

  const getData = async () => {
    try {
      const studentName = await AsyncStorage.getItem("student_name");

      if (studentName) {
        setNameValue(studentName);
      }
    } catch (error) {
      // See Line 62 in Settings.js - use the commented lines in production
      console.error(error);
    }
  };

  function timeConvert(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      /* Show AM or PM based on time value */
      time[5] = +time[0] < 12 ? "AM" : "PM";
      /* Hide seconds */
      time[3] = time[3] && "";
      /* Convert from 24hr time to 12 hour time */
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://sjdbh.ycdsb.ca/wp-json/wp/v2/posts?_fields=id,slug,date,title.rendered,post_excerpt_stackable&per_page=20"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPosts = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        "https://sjdbh.ycdsb.ca/wp-json/wp/v2/posts?_fields=id,slug,date,title.rendered,post_excerpt_stackable&per_page=20"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };
  const getMorePosts = async () => {
    try {
      const response = await fetch(
        "https://sjdbh.ycdsb.ca/wp-json/wp/v2/posts?_fields=id,slug,date,title.rendered,post_excerpt_stackable&per_page=50"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const tagsStyles = {
    body: {
      color: "#fafafa",
      maxHeight: "140px",
    },
    img: {
      borderRadius: "200px",
    },
  };

  return (
    <View h="full" bg={useColorModeValue("warmGray.50", "darkBlue.800")}>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#004282" }} />
      <FlatList
        ListHeaderComponent={() => (
          <>
            <Header name={nameValue} home>
              <NavBar home={true} />
            </Header>
            <QuickLinks />

            {isLoading && <Spinner m={20} accessibilityLabel="Loading posts" />}
          </>
        )}
        data={data}
        initialNumToRender={6}
        onRefresh={refreshPosts}
        refreshing={isRefreshing}
        onScrollEndDrag={getMorePosts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Pressable
            rounded="8"
            overflow="hidden"
            borderWidth="1"
            borderColor="darkBlue.800"
            maxW="96"
            shadow="3"
            bg="darkBlue.700"
            p="4"
            mx="4"
            my="4"
            onPress={() => navigation.navigate("Post", { slug: item.slug })}
          >
            <Box>
              <Text fontSize="lg" fontWeight="bold" color="light.100">
                {item.title.rendered
                  .replace("&#8211;", "-")
                  .replace("&#8217;", "'")}
              </Text>
              <Text fontSize="sm" color="light.100">
                {item.date.replace(/-/g, "/").split("T")[0]}{" "}
                {timeConvert(item.date.split("T")[1])}
              </Text>
            </Box>
            <RenderContent
              contentWidth={width}
              source={{
                html: `${item.post_excerpt_stackable}`,
              }}
              tagsStyles={tagsStyles}
            />
          </Pressable>
        )}
      />
    </View>
  );
}
