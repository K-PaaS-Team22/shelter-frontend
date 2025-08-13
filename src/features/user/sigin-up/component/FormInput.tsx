import { useFormContext, Controller } from "react-hook-form";
import { View, Text } from "react-native";
import Input from "@moeum/common/components/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FormInput({ name, placeholder, iconName, secure }: any) {
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
          <Input
            Icon={() => <MaterialCommunityIcons name={iconName} size={20} color="#BEC1D1" />}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            secureTextEntry={secure}
          />
        )}
      />
      {errors[name] && (
        <Text style={{ color: "#FF0000", fontSize: 12, padding: 4 }}>
          {errors[name]?.message as string}
        </Text>
      )}
    </View>
  );
}
