import { ScrollView, Text } from "react-native";
import { Avatar, Card, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "../components/LoadingComponent";
import * as Animatable from "react-native-animatable";

function Mission() {
  return (
    <Card>
      <Card.Title>Our Mission</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10 }}>
        At Stay-cation, we believe that working is the best vacation. The beach
        is the best place to be creative and productive. We've found that
        working on the beach helps people to be focus and more productive.
        That’s why we created Stay-cation: a place for work and play. Our staff
        will help you find the perfect place to work, whether it’s at a poolside
        cabana or in one of our beachfront bungalows. All of our beachsite
        resorts offer lightning-speed WiFi, free coffee and snacks to keep you
        fueled as well as amenities such as towels and sunscreen. Why work to
        live when you can work to vacation!
      </Text>
    </Card>
  );
}

const AboutScreen = () => {
  const partners = useSelector((state) => state.partners);

  if (partners.isLoading) {
    return (
      <ScrollView>
        <Mission />
        <Card>
          <Card.Title>International Partners</Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      </ScrollView>
    );
  }
  if (partners.errMess) {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Mission />
          <Card>
            <Card.Title>International Partners</Card.Title>
            <Card.Divider />
            <Text>{partners.errMess}</Text>
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
  return (
    <ScrollView>
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Mission />
        <Card>
          <Card.Title>International Partners</Card.Title>
          <Card.Divider />
          {partners.partnersArray.map((partner) => (
            <ListItem key={partner.id}>
              <Avatar rounded source={{ uri: baseUrl + partner.image }} />
              <ListItem.Content>
                <ListItem.Title>{partner.name}</ListItem.Title>
                <ListItem.Subtitle>{partner.description}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>
      </Animatable.View>
    </ScrollView>
  );
};

export default AboutScreen;
