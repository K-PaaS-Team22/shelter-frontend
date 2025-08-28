import React from "react";
import { StyleSheet, View } from "react-native";
import { LocationTracker } from "../features/location";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LocationTracker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
