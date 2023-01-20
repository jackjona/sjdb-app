import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

const Event = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  function timeConvert(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? "AM" : "PM";
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }

  const getEvent = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/sjdbh@ycdsb.ca/events/${route.params.eventID}?key=AIzaSyCyBPIqrV96idsvBD1-V8rfMKNE2MLhbCY`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
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
    getEvent();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.eventBubble}>
          {data.summary && (
            <>
              <Text style={[styles.text, styles.eventTitle]}>
                {data.summary}
              </Text>
              {data.start.dateTime ? (
                <Text style={[styles.text, styles.eventDate]}>
                  {data.start.dateTime.split("T")[0]}
                  {"\n"}
                  {timeConvert(
                    data.start.dateTime
                      .replace(":00", "")
                      .split("T")[1]
                      .split("-")[0]
                  )}
                  {" - "}
                  {timeConvert(
                    data.end.dateTime
                      .replace(":00", "")
                      .split("T")[1]
                      .split("-")[0]
                  )}
                </Text>
              ) : (
                <Text style={[styles.text, styles.eventDate]}>
                  {data.start.date} - {data.end.date}
                </Text>
              )}

              {data.description && data.description.includes("https") ? (
                <Text
                  style={[styles.text, styles.eventDescription, styles.link]}
                  onPress={() => Linking.openURL(data.description)}
                >
                  {data.description}
                </Text>
              ) : (
                <Text style={[styles.text, styles.eventDescription]}>
                  {data.description}
                </Text>
              )}
            </>
          )}
        </View>
      )}
    </SafeAreaView>
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
    color: "#FFFFFF",
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
  },
  eventBubble: {
    backgroundColor: "#2C2C2E",
    borderRadius: 4,
    paddingHorizontal: 40,
    width: "90%",
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 10,
    marginBottom: 20,
  },
  eventDescription: {
    fontSize: 15,
    marginBottom: 20,
  },
  link: {
    color: "#6495ED",
  },
});

export default Event;
