import { ScrollView, Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

const ContactScreen = () => {
  const sendMail = () => {
    MailComposer.composeAsync({
      recipients: ["beachsites@Stay-cation.fake"],
      subject: "Inquiry",
      body: "To whom it may concern:",
    });
  };

  return (
    <ScrollView>
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card wrapperStyle={{ margin: 20 }}>
          <Card.Title>Contact Information</Card.Title>
          <Card.Divider />
          <Text>Stay-cation</Text>
          <Text>123 Stay-cation lane</Text>
          <Text>Toronto, Ontario</Text>
          <Text style={{ marginBottom: 10 }}>Canada</Text>
          <Text>Phone: 1-905-555-1234</Text>
          <Text>Email: beachsites@Stay-cation.fake</Text>
          <Button
            title="Send Email"
            buttonStyle={{ backgroundColor: "#FFC600", margin: 40 }}
            icon={
              <Icon
                name="envelope-o"
                type="font-awesome"
                color="#fff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            onPress={() => sendMail()}
          />
        </Card>
      </Animatable.View>
    </ScrollView>
  );
};

export default ContactScreen;
