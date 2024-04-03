import useStore from "./useStore";
import { FlatList, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { ThemeContext } from "./Theme";

const Home = () => {
  const me = useStore(state => state.me);
  const team = useStore(state => state.team);
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ display: "flex", alignItems: "center" }}>
      <View style={{ width: "85%", marginTop:20 }}>
        <View style={{ width: "100%", backgroundColor: theme.colors.primary, borderRadius:10, flexDirection:"row", alignItems:"center", paddingVertical:5, paddingHorizontal:10 }}>
          <Text style={{ color: theme.colors.onPrimary }} variant={"titleLarge"}>Buddies:</Text>
        </View>
        <FlatList
          style={{marginTop:10}}
          horizontal={true}
          data={team?.users}
          renderItem={item => (
            <Card style={{height:150, marginRight: 10, width:300}}>
              <Card.Content>
                <View style={{flexDirection:"row", height:"50%", alignItems:"center"}}>
                  <Avatar.Icon icon={"book"} size={30}/>
                  <Text variant={"titleMedium"} style={{marginLeft:10}} ellipsizeMode={"tail"} numberOfLines={1}>
                    {item.item.username}
                  </Text>
                </View>
                <View style={{height:"50%", justifyContent:"center"}}>
                  <Text ellipsizeMode={"tail"} numberOfLines={1}>{item.item.description}</Text>
                </View>
              </Card.Content>
            </Card>
          )} />
      </View>
      <Text style={{ marginTop: 20 }}>{team?.code}</Text>
    </SafeAreaView>
  );
};

export default Home;
