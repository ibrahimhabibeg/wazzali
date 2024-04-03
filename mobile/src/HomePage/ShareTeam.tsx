import { Card } from "react-native-paper";
import useStore from "../Store/useStore";
import {Text} from "react-native-paper";

const ShareTeam = () => {
  const teamCode = useStore(state => state.team?.code);
  return(
    <Card mode={"outlined"} style={{width:"85%", marginTop: 20}}>
      <Card.Content style={{width:"100%", alignItems:"center"}}>
        <Text variant={"titleMedium"} style={{marginTop:20}}>Your Team Code</Text>
        <Text variant={"headlineLarge"} style={{marginTop: 10, marginBottom:20}}>{teamCode}</Text>
      </Card.Content>
    </Card>
  );
}

export default ShareTeam;
