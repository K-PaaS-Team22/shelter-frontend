import React from "react";
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
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@moeum/common/components/Button";
import { useLogin } from "@moeum/shared/services/mutations/useUser";
import { loginSchema } from "@moeum/shared/services/schemas/loginSchema";
import FormInput from "../sigin-up/component/FormInput";

export default function Login() {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      memberId: "",
      memberPassword: ""
    }
  });
  const { handleSubmit } = methods;

  const { mutate: login } = useLogin(() => {
    console.log("로그인 성공");
    router.push("/home");
  });

  const onSubmit = (data: any) => {
    login(data);
    console.log(data);
  };

  const handleSignUp = () => {
    console.log("회원가입 페이지로 이동");
    router.push("/signup");
  };

  const handleGuestLogin = () => {
    console.log("로그인 없이 둘러보기");
    router.push("/home");
  };

  return (
    <FormProvider {...methods}>
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

              <View style={{ width: "100%", gap: 15, marginTop: 20 }}>
                <FormInput
                  name="memberId"
                  placeholder="아이디 입력 (8~16자)"
                  iconName="account-outline"
                />
                <FormInput
                  name="memberPassword"
                  placeholder="비밀번호 입력 (8~16자)"
                  iconName="lock-outline"
                  secure
                />
              </View>

              <View style={{ width: "100%", gap: 12, marginTop: 20 }}>
                <Button title="로그인" onPress={handleSubmit(onSubmit)} />
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
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 20 },
  logoContainer: { alignItems: "center" },
  logoText: { fontSize: 24, fontWeight: "bold", color: "#3A7DFF", marginTop: 10 },
  guestLoginText: { color: "#494F54", fontSize: 14, textAlign: "center" }
});
