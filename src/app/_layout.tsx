import { SplashScreen, Tabs } from "expo-router";
import { useSystemFont } from "@moeum/common/hooks/useSystemFont";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useSystemFont();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" options={{ title: "home" }} />
        <Tabs.Screen name="setting" options={{ title: "setting" }} />
      </Tabs>
    </SafeAreaView>
  );
}
