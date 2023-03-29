import { useState, useEffect } from "react";

//TODO: Change activity indicator
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

import { Box, Text, useColorModeValue, Pressable } from "native-base";
import Navbar from "../components/navbar";
import Header from "../components/header";

const Calendar = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const currentDate = new Date().toISOString().slice(0, 10);

  {
    /* 
      API Key is: AIzaSyCyBPIqrV96idsvBD1-V8rfMKNE2MLhbCY
      The scope must be restricted and the key should be put into an environment variable
      ---
      Testing API URL:
      https://www.googleapis.com/calendar/v3/calendars/sjdbh@ycdsb.ca/events?key=AIzaSyCyBPIqrV96idsvBD1-V8rfMKNE2MLhbCY&singleEvents=true&orderBy=startTime&timeMin=2023-01-22T00:00:00-07:00&maxResults=10
  */
  }
  const getEvents = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/sjdbh@ycdsb.ca/events?key=AIzaSyCyBPIqrV96idsvBD1-V8rfMKNE2MLhbCY&singleEvents=true&orderBy=startTime&timeMin=${currentDate}T00:00:00-07:00&maxResults=10`
      );
      const json = await response.json();
      setData(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshEvents = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/sjdbh@ycdsb.ca/events?key=AIzaSyCyBPIqrV96idsvBD1-V8rfMKNE2MLhbCY&singleEvents=true&orderBy=startTime&timeMin=${currentDate}T00:00:00-07:00&maxResults=10`
      );
      const json = await response.json();
      setData(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getMoreEvents = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/sjdbh@ycdsb.ca/events?key=AIzaSyCyBPIqrV96idsvBD1-V8rfMKNE2MLhbCY&singleEvents=true&orderBy=startTime&timeMin=${currentDate}T00:00:00-07:00&maxResults=50`
      );
      const json = await response.json();
      setData(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
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
    <Box
      flex={1}
      bg={useColorModeValue("warmGray.50", "warmGray.900")}
      w="full"
    >
      <Header title="Calendar">
        <Navbar />
      </Header>
      <Box
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue("warmGray.50", "primary.900")}
        mt="-30px"
        pt="30px"
        p={4}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            onRefresh={refreshEvents}
            refreshing={isRefreshing}
            onScrollEndDrag={getMoreEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Event", { eventID: item.id })
                }
                bg="darkBlue.700"
                p={5}
                my={4}
                mx={2}
                rounded="lg"
              >
                <View>
                  {/* TO DO: Make event bubble clickable to get more info OurSchool the event. */}
                  <Text fontSize="lg" color={"white"} bold px={2}>
                    {item.summary}
                  </Text>

                  {item.start.date ? (
                    <Text fontSize="sm" color={"white"} py={1} px={2}>
                      {item.start.date.replace(/-/g, "/")} -{" "}
                      {item.end.date.replace(/-/g, "/")}
                    </Text>
                  ) : (
                    <Text fontSize="sm" color={"white"} py={2} px={2}>
                      {item.start.dateTime.split("T")[0].replace(/-/g, "/")}
                      {"\n"}
                      {timeConvert(
                        item.start.dateTime.split("T")[1].split("-")[0]
                      )}
                      {" - "}
                      {timeConvert(
                        item.end.dateTime.split("T")[1].split("-")[0]
                      )}
                    </Text>
                  )}
                </View>
              </Pressable>
            )}
          />
        )}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#0d152d",
  },
  text: {
    color: "#EFEFEF",
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 20,
    marginLeft: 10,
  },
  eventBubble: {
    backgroundColor: "#121212",
    marginVertical: 12,
    marginHorizontal: 12,
    paddingVertical: 26,
    borderRadius: 4,
  },
  eventTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
  },
  eventDate: {
    fontSize: 10,
    paddingHorizontal: 20,
  },
});
export default Calendar;
