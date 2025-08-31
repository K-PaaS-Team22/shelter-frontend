import React, { useState } from "react";
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
import { useForm, FormProvider } from "react-hook-form";
import { signUpSchema } from "@moeum/shared/services/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./component/FormInput";
import FormCheckBox from "./component/FormCheckBox";
import BirthdayPicker from "./component/BirthdayPicker";
import { useSignUp } from "@moeum/shared/services/mutations/useUser";
import ModalComponent from "@moeum/common/components/Modal";
import LogoIcon from "assets/icons/logo.svg";
import { router } from "expo-router";

export default function SignUp() {
  const methods = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      memberId: "",
      memberPassword: "",
      confirmPassword: "",
      memberName: "",
      birthday: "",
      gender: ""
    }
  });

  const { handleSubmit } = methods;

  const { mutate: signUp } = useSignUp(() => {
    console.log("회원가입 성공");
  });

  const onSubmit = (data: any) => {
    const { confirmPassword, ...payload } = data;
    signUp(payload);
    console.log(payload);
    setModalVisible(true);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, gap: 30 }}
            >
              <Header title="회원가입" />
              <Text style={styles.text}>
                내 주변 <Text style={styles.bold}>안전한 대피소,{"\n"}</Text>빠르고 정확하게
                안내해드릴게요.
              </Text>
              <View style={{ gap: 15 }}>
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
                <FormInput
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  iconName="lock-check-outline"
                  secure
                />
                <FormInput name="memberName" placeholder="이름 입력" iconName="face-man" />
                <BirthdayPicker name="birthday" />
                <FormCheckBox
                  name="gender"
                  options={[
                    { label: "남", value: "male" },
                    { label: "여", value: "female" }
                  ]}
                />
              </View>
            </ScrollView>
            <Button title="가입하기" onPress={handleSubmit(onSubmit)} style={{ marginTop: 5 }} />
          </View>
          {isModalVisible && (
            <ModalComponent visible={isModalVisible} onClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View>
                  <Text style={styles.modalTitle}>회원가입 완료</Text>
                  <LogoIcon width={100} height={100} />
                </View>
                <Text style={styles.modalText}>
                  지금 바로 로그인 하고{"\n"}주변 대피소를 찾아보세요!
                </Text>
                <Button
                  title="확인"
                  onPress={() => {
                    setModalVisible(false);
                    router.push("/");
                  }}
                  style={styles.modalButton}
                />
              </View>
            </ModalComponent>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "space-between"
  },
  text: { lineHeight: 40, fontSize: 24, color: "#000" },
  bold: { fontSize: 28, fontWeight: "bold" },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    width: "100%",
    gap: 16
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 17,
    textAlign: "center"
  },
  modalText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 7
  },
  modalButton: {
    width: "100%",
    backgroundColor: "#4A7DFF",
    borderRadius: 8
  }
});
