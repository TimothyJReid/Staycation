import { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";

const ReservationScreen = () => {
  const [people, setPeople] = useState(1);
  const [flyIn, setFlyIn] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  //const [showModal, setShowModal] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(Platform.OS === "ios");
    setDate(currentDate);
  };

  const resetForm = () => {
    setPeople(1);
    setFlyIn(false);
    setDate(new Date());
    setShowCalendar(false);
  };

  const handleReservation = () => {
    // console.log("people:", people);
    // console.log("flyIn:", flyIn);
    // console.log("date:", date);
    // setShowModal(!showModal);
    Alert.alert(
      "Begin Search?",
      `Number of People: ${people}.\n'Fly In? true' \nDate: ${date.toLocaleDateString(
        "en-US"
      )}`,
      [
        {
          text: "Cancel",
          onPress: () => resetForm({ people }),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            presentLocalNotification(date.toLocaleDateString("en-US"));
            resetForm();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const presentLocalNotification = async (reservationDate) => {
    const sendNotification = () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      Notifications.scheduleNotificationAsync({
        content: {
          title: "Your Beachsite Reservation Search",
          body: `Search for ${reservationDate} requested`,
        },
        trigger: null,
      });
    };

    let permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
      permissions = await Notifications.requestPermissionsAsync();
    }
    if (permissions.granted) {
      sendNotification();
    }
  };

  return (
    <ScrollView>
      <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of people:</Text>
          <Picker
            style={styles.formItem}
            selectedValue={people}
            onValueChange={(itemValue) => setPeople(itemValue)}
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Fly In?</Text>
          <Switch
            style={styles.formItem}
            value={flyIn}
            trackColor={{ true: "#FFC600", false: null }}
            onValueChange={(value) => setFlyIn(value)}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date:</Text>
          <Button
            onPress={() => setShowCalendar(!showCalendar)}
            title={date.toLocaleDateString("en-US")}
            color="#FFC600"
            accessibilityLabel="Tap me to select a reservation date"
          />
        </View>
        {showCalendar && (
          <DateTimePicker
            style={styles.formItem}
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <View style={styles.formRow}>
          <Button
            onPress={() => handleReservation()}
            title="Search Availability"
            color="#FFC600"
            accessibilityLabel="Tap me to search for available beachsites to reserve"
          />
        </View>
      </Animatable.View>

      {/* <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Search Beachsite Reservations</Text>
          <Text style={styles.modalText}>Number of People: {people}</Text>
          <Text style={styles.modalText}>
            Fly-In?: {flyIn ? "Yes" : "No"}
          </Text>
          <Text style={styles.modalText}>
            Date: {date.toLocaleDateString("en-US")}
          </Text>
          <Button
            onPress={() => {
              setShowModal(!showModal);
              resetForm();
            }}
            color="#FFC600"
            title="Close"
          />
        </View>
      </Modal> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#FFC600",
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default ReservationScreen;
