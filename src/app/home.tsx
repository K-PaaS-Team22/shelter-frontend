import { View, Text, StyleSheet } from "react-native";
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>홈</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center"
  },
  text: { lineHeight: 40, fontSize: 24, color: "#000" }
});
