import React, { useState } from "react";
import LogoIcon from "assets/icons/logo.svg";
import { router } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Input from "@moeum/common/components/Input";
import Button from "@moeum/common/components/Button";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    console.log("로그인 시도:", id, password);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("로그인 완료!");
    setIsLoggingIn(false);
  };

  const handleSignUp = () => {
    console.log("회원가입 페이지로 이동");
    router.push("/signup");
  };

  const handleGuestLogin = () => {
    console.log("로그인 없이 둘러보기");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: 26 }}>
            <View style={styles.logoContainer}>
              <LogoIcon width={90} height={106} />
              <Text style={styles.logoText}>LOGO</Text>
            </View>

            <View style={{ width: "100%", gap: 12, marginTop: 20 }}>
              <Input
                Icon={() => (
                  <MaterialCommunityIcons name="account-outline" size={20} color="#BEC1D1" />
                )}
                placeholder="아이디"
                value={id}
                onChangeText={setId}
              />
              <Input
                Icon={() => (
                  <MaterialCommunityIcons name="lock-outline" size={20} color="#BEC1D1" />
                )}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            <View style={{ width: "100%", gap: 12, marginTop: 20 }}>
              <Button title="로그인" onPress={handleLogin} />
              <Button
                title="회원가입"
                onPress={handleSignUp}
                style={{ backgroundColor: "#F1F4F8" }}
                textStyle={{ color: "#65686F" }}
              />
            </View>

            <TouchableOpacity onPress={handleGuestLogin} style={{ marginTop: 20 }}>
              <Text style={styles.guestLoginText}>로그인 없이 둘러보기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  logoContainer: {
    alignItems: "center"
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3A7DFF",
    marginTop: 10
  },
  guestLoginText: {
    color: "#494F54",
    fontSize: 14,
    textAlign: "center"
  }
});
