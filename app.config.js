import "dotenv/config";

export default {
  expo: {
    name: "RNBoilerplate",
    slug: "RNBoilerplate",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    runtimeVersion: {
      policy: "sdkVersion"
    },
    updates: {
      url: "https://u.expo.dev/f345cdac-62b0-41d8-b7a4-5450aca69da5"
    },
    ios: {
      bundleIdentifier: "com.kr.moeum",
      buildNumber: "1",
      supportsTablet: true,
      entitlements: {
        "com.apple.developer.networking.wifi-info": true
      }
    },
    android: {
      package: "co.kr.moeum",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    plugins: [
      "expo-asset",
      "expo-font",
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      "expo-build-properties"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "f345cdac-62b0-41d8-b7a4-5450aca69da5"
      }
    },
    owner: "moeum"
  }
};
