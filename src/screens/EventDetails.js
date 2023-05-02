import {
  Box,
  ScrollView,
  Text,
  HStack,
  useColorModeValue,
  IconButton,
  Pressable,
} from "native-base";
import { useState, useEffect } from "react";
import { ActivityIndicator, Linking } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Header from "../components/header";

//TODO: "Fix React has detected a change in the order of Hooks" warning
const EventDetails = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const isFocused = useIsFocused();

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

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    isFocused && getEvent();
  }, [isFocused]);

  return (
    <Box
      flex={1}
      bg={useColorModeValue("warmGray.50", "warmGray.900")}
      w="full"
    >
      <Header title="Event Details" subscreen={true} />
      <ScrollView
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
          <Box alignItems="center" justifyContent="center">
            {data.summary && (
              <>
                <Text fontSize="4xl" bold textAlign="center">
                  {data.summary}
                </Text>
                {data.start.dateTime ? (
                  <Text fontSize="md" textAlign={"center"}>
                    {data.start.dateTime.split("T")[0]}
                    {"\n"}
                    {timeConvert(
                      data.start.dateTime.split("T")[1].split("-")[0]
                    )}
                    {" - "}
                    {timeConvert(data.end.dateTime.split("T")[1].split("-")[0])}
                  </Text>
                ) : (
                  <Text fontSize="md">
                    {data.start.date.replace(/-/g, "/")} -{" "}
                    {data.end.date.replace(/-/g, "/")}
                  </Text>
                )}

                {data.description && data.description.includes("<a href=") ? (
                  <Text
                    color="blue.600"
                    fontSize="md"
                    textAlign="center"
                    my={8}
                    onPress={() =>
                      Linking.openURL(
                        data.description.substring(
                          data.description.indexOf('"') + 1,
                          data.description.lastIndexOf('"')
                        )
                      )
                    }
                  >
                    {data.description.substring(
                      data.description.indexOf('"') + 1,
                      data.description.lastIndexOf('"')
                    )}
                  </Text>
                ) : data.description && data.description.includes("https") ? (
                  <Text
                    color="blue.600"
                    fontSize="md"
                    textAlign="center"
                    my={8}
                    onPress={() => Linking.openURL(data.description)}
                  >
                    {data.description}
                  </Text>
                ) : (
                  <Text color="white">{data.description}</Text>
                )}

                {data.htmlLink && (
                  <Pressable
                    bg={useColorModeValue("darkBlue.500", "darkBlue.500")}
                    py={4}
                    px={4}
                    mt={4}
                    rounded="lg"
                    onPress={() => Linking.openURL(data.htmlLink)}
                  >
                    <Text fontSize="md" color="gray.50">
                      View On Google Calendar
                    </Text>
                  </Pressable>
                )}
              </>
            )}
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};

export default EventDetails;
