import { FlatList, Text, View } from "react-native";
import { Tile } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "../components/LoadingComponent";
import * as Animatable from "react-native-animatable";

const DirectoryScreen = ({ navigation }) => {
  const beachsites = useSelector((state) => state.beachsites);

  if (beachsites.isLoading) {
    return <Loading />;
  }
  if (beachsites.errMess) {
    return (
      <View>
        <Text>{beachsites.errMess}</Text>
      </View>
    );
  }

  const renderDirectoryItem = ({ item: beachsite }) => {
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000}>
        <Tile
          title={beachsite.name}
          titleStyle={{
            textShadowColor: "rgba(0, 0, 0, 1)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 20,
          }}
          caption={beachsite.description}
          captionStyle={{
            fontSize: 14,
            // fontWeight: "bold",
            // marginTop: 120,
            textShadowColor: "rgba(0, 0, 0, 1)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 20,
          }}
          featured
          onPress={() => navigation.navigate("BeachsiteInfo", { beachsite })}
          imageSrc={{ uri: baseUrl + beachsite.image }}
        />
      </Animatable.View>
    );
  };
  return (
    <FlatList
      data={beachsites.beachsitesArray}
      renderItem={renderDirectoryItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default DirectoryScreen;
