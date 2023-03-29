import React from "react";
import { ScrollView, Box, Text, useColorModeValue, VStack } from "native-base";
import Navbar from "../components/navbar";
import Header from "../components/header";
import { Linking } from "react-native";

const OurSchoolScreen = () => {
  return (
    <Box
      flex={1}
      bg={useColorModeValue("warmGray.50", "warmGray.900")}
      w="full"
    >
      <Header title="Our School" subscreen={true} />
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue("warmGray.50", "primary.900")}
        mt="-30px"
        pt="30px"
        p={4}
      >
        <Box py={2}>
          <Text py={2} fontSize="lg">
            St. Jean de Brebeuf Catholic High School is a Learning Community
            called to educate the mind and nurture the soul with Jesus Christ as
            inspiration. Success in academics, development of character, and
            dedication to service will be achieved with support from the home,
            Church, and school.{"\n"}
          </Text>

          <Text py={2} fontSize="lg">
            <Text fontSize="xl" bold>
              St. Jean de Brebeuf CHS Founding Principles{"\n"}
            </Text>
            St. Jean de Brebeuf Catholic High School is a unique Catholic
            learning community where the primary focus is on personal growth and
            academic success in the context of quality education. Our Catholic
            learning community is founded on four principles:
          </Text>
        </Box>
        <Box>
          <Text py={2} fontSize="md">
            &#x2022; Student Success
          </Text>
          <Text py={2} fontSize="md">
            &#x2022; Learning as a Focus
          </Text>
          <Text py={2} fontSize="md">
            &#x2022; Catholic Character Development
          </Text>
          <Text py={2} fontSize="md">
            &#x2022; Collaborative Catholic Education
          </Text>
        </Box>
        <Box py={2}>
          <Text py={2} fontSize="lg">
            <Text fontSize="xl" bold>
              St. Jean de Brebeuf CHS Catholic Graduate Outcomes{"\n"}
            </Text>
            The ultimate goal of the educational thrust at St. Jean de Brebeuf
            Catholic High School is to develop the mind and also to nurture the
            soul of our students. Our graduates will attain the skills and
            knowledge needed for success in post-secondary study and employment
            in our technological society. Equally important, our graduates will
            have the “character” of a Catholic citizen with an understanding of
            values, attitudes, morals and duty expected of our young catholic
            adults.
          </Text>
        </Box>

        <Box py={2}>
          <Text py={2} fontSize="lg">
            The expectations of a graduate of St. Jean de Brebeuf are summarized
            as follows:
          </Text>
          <Box>
            <Text py={2} fontSize="md">
              &#x2022; A student who is successful academically;
            </Text>
            <Text py={2} fontSize="md">
              &#x2022; A discerning believer formed in the Catholic Faith
              community who celebrates the signs and sacred mystery of
              God&apos;s presence through word, sacrament, prayer, forgiveness,
              reflection and moral living;
            </Text>
            <Text py={2} fontSize="md">
              &#x2022; An effective communicator, who speaks, writes and listens
              honestly and sensitively, responding critically in light of gospel
              values;
            </Text>
            <Text py={2} fontSize="md">
              &#x2022; A self-directed, responsible, lifelong learner who
              develops and demonstrates his/her God-given potential;
            </Text>
            <Text py={2} fontSize="md">
              &#x2022; A collaborative contributor who finds meaning, dignity
              and vocation in work which respects the rights of all and
              contributes to the common good;
            </Text>
            <Text py={2} fontSize="md">
              &#x2022; A caring family member who attends to the needs of
              family, school, parish, and the wider community; and
            </Text>
            <Text py={2} fontSize="md">
              &#x2022; A responsible citizen who gives witness to Catholic
              social teaching by promoting peace, justice and sacredness of
              human life.
            </Text>
          </Box>
        </Box>
        <Box py={2}>
          <Text py={2} fontSize="lg">
            <Text fontSize="xl" bold>
              Cross Disciplinary Focus{"\n"}
            </Text>
            St. Jean de Brebeuf Catholic High School will endeavour to identify
            the core knowledge, skills and attitudes that all secondary school
            graduates are expected to have to succeed in the world of work or
            post-secondary education. These outcomes are summarized under the
            headings of Literacy, Numeracy, Research Methodologies, Critical
            Thinking, Personal Life Management, Citizenship, Global Perspectives
            and Technological Competence.
          </Text>
        </Box>
        <Box py={2}>
          <Text py={2} fontSize="lg">
            <Text fontSize="xl" bold>
              Equal Education Opportunity{"\n"}
            </Text>
            The policy of the Government of Ontario on multiculturalism and race
            relations requires schools to have programs, policies and services
            that help prepare all students to live in a multicultural and
            multiracial society. Our school is committed to establishing an
            environment free of sex role stereotyping or any other prejudices
            which may limit the development of the individual student. Provision
            is made for the individual, cultural, emotional and spiritual needs
            of students and helpful guidance is given concerning varying needs
            and future education.
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default OurSchoolScreen;
