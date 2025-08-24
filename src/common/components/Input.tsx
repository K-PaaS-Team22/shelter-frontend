import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SvgProps } from "react-native-svg";

interface InputProps {
  Icon?: React.FC<SvgProps>;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export default function Input({
  Icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry: secureEntryProp
}: InputProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(secureEntryProp ?? false);

  return (
    <View style={styles.inputWrapper}>
      {Icon && (
        <View style={styles.leftIcon}>
          <Icon width={20} height={20} />
        </View>
      )}
      <TextInput
        style={[styles.input, Icon ? { paddingLeft: 0 } : {}]}
        placeholder={placeholder}
        placeholderTextColor="#BEC1D1"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        selectionColor="#000"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={secureEntryProp ? "default" : "email-address"}
        underlineColorAndroid="transparent"
      />
      {secureEntryProp && (
        <TouchableOpacity
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          activeOpacity={0.7}
          style={styles.toggleButton}
        >
          <MaterialCommunityIcons
            name={secureTextEntry ? "eye-off" : "eye"}
            size={22}
            color="#BEC1D1"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BEC1D1",
    paddingHorizontal: 12,
    backgroundColor: "white"
  },
  leftIcon: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    color: "#000"
  },
  toggleButton: {
    marginLeft: 10,
    padding: 4,
    justifyContent: "center",
    alignItems: "center"
  }
});
