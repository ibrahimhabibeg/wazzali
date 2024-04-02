import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import CodeInput from "./CodeInput";
import { useContext } from "react";
import { ThemeContext } from "./Theme";
import { createTeam, joinTeam } from "./actions";

const JoinTeam = () => {
  const {theme} = useContext(ThemeContext);
  return(
    <SafeAreaView>
      <ScrollView contentContainerStyle={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Image source={require('../assets/logo.png')} style={{flex: 1,
          width:120, height:120,
          marginTop: 50
          }}/>
        <Text variant={"headlineLarge"} style={{marginTop:20}}>Wazzali</Text>
        <Text variant={"titleMedium"}>Teamwork Made Easy</Text>
        <View style={{marginTop:30, display:"flex", alignItems:"center"}}>
          <Text variant={"labelLarge"}>Join a team with code</Text>
          <CodeInput onSubmit={joinTeam} />
        </View>
        <Divider style={{width:"80%", marginTop:30}}></Divider>
        <View>
          <Button style={{ marginTop: 30 }} onPress={createTeam}>
            <Text variant={"titleMedium"} style={{ color: theme.colors.primary }}>
              Create New Team
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default JoinTeam;
