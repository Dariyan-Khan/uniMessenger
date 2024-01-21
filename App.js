import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
import { UserContext } from "./UserContext";
import { AuthContextProvider } from "./context/AuthContext"
  import { FSContextProvider } from "./context/FSContext";

export default function App() {
  return (
    <>
      {/* <UserContext> */}
      <AuthContextProvider>
          <StackNavigator />
      </AuthContextProvider>
        
      {/* </UserContext> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});