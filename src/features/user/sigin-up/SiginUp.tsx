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
import Input from "@moeum/common/components/Input";
import Button from "@moeum/common/components/Button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "@moeum/common/components/Header";

export default function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  return (
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

            <View>
              <View style={styles.fieldWrapper}>
                <Input
                  Icon={props => (
                    <MaterialCommunityIcons name="account-outline" size={20} color="#BEC1D1" />
                  )}
                  placeholder="아이디 입력 (8~16자)"
                  value={id}
                  onChangeText={setId}
                />
                <Text style={styles.errorText}>사용할 수 없는 아이디입니다.</Text>
              </View>

              <View style={styles.fieldWrapper}>
                <Input
                  Icon={props => (
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#BEC1D1" />
                  )}
                  placeholder="비밀번호 입력 (8~16자)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <Text style={styles.errorText}>16자 이내의 비밀번호를 입력해주세요.</Text>
              </View>

              <View style={styles.fieldWrapper}>
                <Input
                  Icon={props => (
                    <MaterialCommunityIcons name="lock-check-outline" size={20} color="#BEC1D1" />
                  )}
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
                <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
              </View>

              <View style={styles.fieldWrapper}>
                <Input
                  Icon={props => (
                    <MaterialCommunityIcons name="account-edit-outline" size={20} color="#BEC1D1" />
                  )}
                  placeholder="닉네임 입력"
                  value={nickname}
                  onChangeText={setNickname}
                />
                <Text style={styles.errorText}>사용 불가한 닉네임입니다.</Text>
              </View>
            </View>
          </ScrollView>

          <Button title="가입하기" onPress={() => console.log("가입하기")} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16
  },
  fieldWrapper: {
    marginBottom: 16
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
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
