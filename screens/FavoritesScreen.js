import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import Loading from "../components/LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { SwipeRow } from "react-native-swipe-list-view";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import * as Animatable from "react-native-animatable";

const FavoritesScreen = ({ navigation }) => {
  const { beachsitesArray, isLoading, errMess } = useSelector(
    (state) => state.beachsites
  );
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const renderFavoriteItem = ({ item: beachsite }) => {
    return (
      <SwipeRow rightOpenValue={-100}>
        <View style={styles.deleteView}>
          <TouchableOpacity
            style={styles.deleteTouchable}
            onPress={() =>
              Alert.alert(
                "Delete Favorite?",
                "Are you sure you wish to delete the favorite beachsite " +
                  beachsite.name +
                  "?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log(beachsite.name + "Not Deleted"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => dispatch(toggleFavorite(beachsite.id)),
                  },
                ],
                { cancelable: false }
              )
            }
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ListItem
            onPress={() =>
              navigation.navigate("Directory", {
                screen: "BeachsiteInfo",
                params: { beachsite },
              })
            }
          >
            <Avatar rounded source={{ uri: baseUrl + beachsite.image }} />
            <ListItem.Content>
              <ListItem.Title>{beachsite.name}</ListItem.Title>
              <ListItem.Subtitle>{beachsite.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      </SwipeRow>
    );
  };

  if (isLoading) {
    return <Loading />;
  }
  if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  }
  return (
    <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000}>
      <FlatList
        data={beachsitesArray.filter((beachsite) =>
          favorites.includes(beachsite.id)
        )}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  deleteView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  deleteTouchable: {
    backgroundColor: "red",
    height: "100%",
    justifyContent: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
    width: 100,
  },
});

export default FavoritesScreen;
