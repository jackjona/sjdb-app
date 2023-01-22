import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";
import WebView from "react-native-webview";

const Post = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

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
      color: "lightgray",
      fontSize: 16,
    },
    img: {
      padding: 20,
      borderRadius: 10,
    },
    iframe: {
      marginTop: width / 8,
      paddingRight: 50,
    },
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ flex: 1, padding: 24 }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View style={styles.postsContainer}>
                  <Text style={[styles.text]}>
                    <View>
                      <Text style={styles.title}>
                        {item.title.rendered
                          .replace("&#8211;", "-")
                          .replace("&#8217;", "'")}
                      </Text>
                      <Text style={styles.date}>
                        {item.date.replace(/-/g, "/").split("T")[0]}{" "}
                        {timeConvert(item.date.split("T")[1])}
                      </Text>
                    </View>
                    <RenderHtml
                      renderers={renderers}
                      WebView={WebView}
                      customHTMLElementModels={customHTMLElementModels}
                      style={[styles.text]}
                      contentWidth={width}
                      source={{
                        html: `${item.content.rendered}`,
                      }}
                      tagsStyles={tagsStyles}
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
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4C53A6",
  },
  text: {
    color: "white",
  },
  contentContainer: {
    backgroundColor: "#04234F",
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
    color: "#E6E7F2",
    marginTop: 20,
    marginBottom: 10,
  },
  date: {
    fontSize: 11,
    color: "#98A1BD",
  },
});

export default Post;
