import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from "react-native";

const Event = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

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
                  {timeConvert(data.start.dateTime.split("T")[1].split("-")[0])}
                  {" - "}
                  {timeConvert(data.end.dateTime.split("T")[1].split("-")[0])}
                </Text>
              ) : (
                <Text style={[styles.text, styles.eventDate]}>
                  {data.start.date.replace(/-/g, "/")} -{" "}
                  {data.end.date.replace(/-/g, "/")}
                </Text>
              )}

              {data.description && data.description.includes("https") ? (
                <Text
                  style={[
                    styles.text,
                    styles.eventDescription,
                    styles.eventLink,
                  ]}
                  onPress={() => Linking.openURL(data.description)}
                >
                  {data.description}
                </Text>
              ) : (
                <Text style={[styles.text, styles.eventDescription]}>
                  {data.description}
                </Text>
              )}

              {data.htmlLink && (
                <TouchableOpacity
                  style={styles.openGCal}
                  activeOpacity={0.6}
                  onPress={() => Linking.openURL(data.htmlLink)}
                >
                  <Text style={[styles.text, styles.openGCalText]}>
                    View On Google Calendar
                  </Text>
                </TouchableOpacity>
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
    backgroundColor: "#0d152d",
  },
  text: {
    color: "#EFEFEF",
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
  },
  eventBubble: {
    backgroundColor: "#121212",
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
  eventLink: {
    color: "#6495ED",
  },
  openGCal: {
    alignItems: "center",
    marginBottom: 20,
    fontSize: 14,
    borderRadius: 6,
    backgroundColor: "gray",
    width: "70%",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  openGCalText: {
    fontSize: 14,
  },
});

export default Event;
