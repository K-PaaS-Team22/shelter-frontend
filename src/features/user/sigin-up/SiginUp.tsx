import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Button from "@moeum/common/components/Button";
import Header from "@moeum/common/components/Header";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { signUpSchema } from "@moeum/shared/services/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";

export default function SignUp() {
  const methods = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userId: "",
      password: "",
      confirmPassword: "",
      nickname: ""
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log("회원가입 데이터:", data);
  };

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
              <View>
                <Header title="회원가입" />
                <Text style={styles.text}>
                  내 주변 <Text style={styles.bold}>안전한 대피소,{"\n"}</Text>빠르고 정확하게
                  안내해드릴게요.
                </Text>
              </View>

              <View style={{ gap: 20 }}>
                <FormInput
                  name="userId"
                  placeholder="아이디 입력 (8~16자)"
                  iconName="account-outline"
                />
                <FormInput
                  name="password"
                  placeholder="비밀번호 입력 (8~16자)"
                  iconName="lock-outline"
                  secure
                />
                <FormInput
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  iconName="lock-check-outline"
                  secure
                />
                <FormInput
                  name="nickname"
                  placeholder="닉네임 입력"
                  iconName="account-edit-outline"
                />
              </View>
            </ScrollView>

            <Button title="가입하기" onPress={handleSubmit(onSubmit)} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16
  },
  text: {
    lineHeight: 40,
    paddingBlock: 40,
    fontSize: 24,
    color: "#000"
  },
  bold: {
    fontSize: 28,
    fontWeight: "bold"
  }
});
