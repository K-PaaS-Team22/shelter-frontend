import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFormContext, Controller } from "react-hook-form";

interface FormCheckBoxProps {
  name: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
}

export default function FormCheckBox({ name, options, disabled }: FormCheckBoxProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={styles.container}>
            {options.map(option => {
              const selected = value === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.option, selected && styles.selectedOption]}
                  disabled={disabled}
                  onPress={() => onChange(option.value)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.label, selected && styles.selectedLabel]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      />
      {errors[name] && (
        <Text style={{ color: "red", fontSize: 12, padding: 4 }}>
          {errors[name]?.message as string}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10
  },
  option: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BEC1D1",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  selectedOption: {
    borderColor: "#4880EE",
    backgroundColor: "#EAF0FF"
  },
  label: {
    fontSize: 16,
    color: "#BEC1D1"
  },
  selectedLabel: {
    color: "#275AEC",
    fontWeight: "600"
  }
});
