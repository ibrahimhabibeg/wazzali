import useStore from "./useStore";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import UsersList from "./UsersList";
import Me from "./Me";

const Home = () => {
  const team = useStore(state => state.team);

  return (
    <SafeAreaView style={{ display: "flex", alignItems: "center" }}>
      <Me/>
      <UsersList/>
      <Text style={{ marginTop: 20 }}>{team?.code}</Text>
    </SafeAreaView>
  );
};

export default Home;
