import { useState, useEffect, memo } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import {
  View,
  Box,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import Header from "../components/header";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";
import WebView from "react-native-webview";
import { useIsFocused } from "@react-navigation/native";

const Post = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const isFocused = useIsFocused();

  const RenderContent = memo(RenderHtml);

  const getPosts = async () => {
    try {
      const response = await fetch(
        `https://sjdbh.ycdsb.ca/wp-json/wp/v2/posts/?slug=${route.params.slug}`
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    isFocused && getPosts();
  }, [isFocused]);

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

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };

  const tagsStyles = {
    body: {
      fontSize: 16,
      color: useColorModeValue("#000000", "#fafafa"),
    },
    img: {
      padding: 20,
      borderRadius: 10,
    },
    iframe: {
      paddingRight: 50,
    },
  };

  return (
    <Box bg="darkBlue.900">
      <Header title="Post" subscreen={true} />
      <View
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue("warmGray.50", "primary.900")}
        mt="-30px"
        pt="30px"
        p={6}
        h="full"
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 400 }}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <>
                <Box pt={4} pb={4}>
                  <Text fontSize="4xl" bold>
                    {item.title.rendered
                      .replace("&#8211;", "-")
                      .replace("&#8217;", "'")}
                  </Text>
                  <Text fontSize="md" pt={2}>
                    {item.date.replace(/-/g, "/").split("T")[0]}{" "}
                    {timeConvert(item.date.split("T")[1])}
                  </Text>
                </Box>
                <RenderContent
                  renderers={renderers}
                  WebView={WebView}
                  customHTMLElementModels={customHTMLElementModels}
                  style={[styles.text]}
                  contentWidth={width}
                  source={{
                    html: `${item.content.rendered}`,
                  }}
                  tagsStyles={tagsStyles}
                  defaultTextProps={{selectable: true}}
                  defaultWebViewProps={
                    {
                      /* Any prop you want to pass to all WebViews */
                    }
                  }
                  renderersProps={{
                    iframe: {
                      scalesPageToFit: true,
                      webViewProps: {
                        /* Any prop you want to pass to iframe WebViews */
                      },
                    },
                  }}
                />
              </>
            )}
          />
        )}
      </View>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#273f87",
  },
  text: {
    color: "#EFEFEF",
  },
  contentContainer: {
    backgroundColor: "#0d152d",
    height: "100%",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    padding: 16,
    marginTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#EFEFEF",
    marginTop: 20,
    marginBottom: 10,
  },
  date: {
    fontSize: 11,
    color: "#98A1BD",
  },
});

export default Post;
