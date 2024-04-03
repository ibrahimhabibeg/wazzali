import useStore from "../Store/useStore";
import { SafeAreaView } from "react-native-safe-area-context";
import UsersList from "./UsersList";
import Me from "./Me";
import ShareTeam from "./ShareTeam";

const Home = () => {
  const team = useStore(state => state.team);

  return (
    <SafeAreaView style={{ display: "flex", alignItems: "center" }}>
      <Me/>
      <UsersList/>
      <ShareTeam />
    </SafeAreaView>
  );
};

export default Home;
