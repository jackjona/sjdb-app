import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

const Home = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const name = "Miku H.";

  const currentTime = new Date().getHours();

  function Greeting(props) {
    const time = props.time;
    if (time < 12) {
      return "Good Morning,";
    } else if (time >= 12 && time <= 17) {
      return "Good Afternoon,";
    } else if (time >= 17 && time <= 24) {
      return "Good Evening,";
    }
    return "Welcome!";
  }

  useEffect(() => {
    getPosts();
  }, []);

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
      color: "#121212",
      maxHeight: "140px",
    },
    img: {
      borderRadius: "200px",
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingBG}>
        <View style={styles.greetingContainer}>
          <View>
            <Text style={[styles.text, styles.greetingText]}>
              <Greeting time={currentTime} />
            </Text>
            <Text style={[styles.text, styles.greetingName]}>{name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.logoWrapper}
          >
            <Image
              style={styles.logoImage}
              source={require("../assets/logo.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        {/*  <Text style={[styles.text, styles.postsHeading]}>School News:</Text> */}
        <View style={{ flex: 1, padding: 24 }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              initialNumToRender={6}
              onRefresh={refreshPosts}
              refreshing={isRefreshing}
              onScrollEndDrag={getMorePosts}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() =>
                    navigation.navigate("Post", { slug: item.slug })
                  }
                  underlayColor="white"
                  style={styles.postsContainer}
                >
                  <Text style={[styles.text]}>
                    <View>
                      <Text style={styles.title}>
                        {item.title.rendered
                          .replace("&#8211;", "-")
                          .replace("&#8217;", "'")}
                      </Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <RenderHtml
                      style={[styles.text]}
                      contentWidth={width}
                      source={{
                        html: `${item.post_excerpt_stackable}`,
                      }}
                      tagsStyles={tagsStyles}
                    />
                  </Text>
                </TouchableHighlight>
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
  greetingBG: {
    backgroundColor: "#04234F",
  },
  greetingContainer: {
    backgroundColor: "#4C53A6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 22,
    paddingBottom: 45,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  greetingName: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  logoWrapper: {
    marginTop: 4,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 60,
  },
  logoImage: {
    width: 72,
    height: 72,
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
  postsHeading: {
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 16,
    paddingTop: 30,
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  postsContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#364356",
    marginBottom: 10,
  },
  date: {
    fontSize: 10,
    color: "#636D77",
  },
});

export default Home;
