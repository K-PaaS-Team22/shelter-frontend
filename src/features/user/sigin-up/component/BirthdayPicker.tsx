import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormContext } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  name: string;
};

export default function BirthdayPicker({ name }: Props) {
  const {
    setValue,
    watch,
    formState: { errors }
  } = useFormContext();
  const selectedDate = watch(name);

  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  return (
    <>
      <View>
        <TouchableOpacity onPress={() => setShow(true)} style={styles.touchable}>
          <MaterialCommunityIcons
            name="calendar-outline"
            size={20}
            color="#BEC1D1"
            style={styles.icon}
          />
          <Text style={styles.dateText}>
            {selectedDate ? (
              <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>
            ) : (
              "생년월일 선택"
            )}
          </Text>
        </TouchableOpacity>
        {errors[name] && !selectedDate && (
          <Text style={{ color: "#FF0000", fontSize: 12, padding: 4 }}>
            {errors[name]?.message as string}
          </Text>
        )}
      </View>
      <Modal visible={show} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              maximumDate={new Date()}
              display="spinner"
              onChange={(_, date) => {
                if (date) setTempDate(date);
              }}
              locale="ko-KR"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShow(false)}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => {
                  setValue(name, tempDate.toISOString());
                  setShow(false);
                }}
              >
                <Text style={styles.buttonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: "row",
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BEC1D1",
    alignItems: "center"
  },
  icon: {
    marginRight: 10,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  dateText: {
    fontSize: 16,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    color: "#BEC1D1"
  },
  selectedDate: {
    color: "#000000"
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center"
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5
  },
  okButton: {
    backgroundColor: "#4880EE",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
