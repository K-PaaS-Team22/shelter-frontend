import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { Shelter } from "../types/shelter";

interface ShelterBottomSheetProps {
  shelters: Shelter[];
  isVisible: boolean;
  onClose: () => void;
  onShelterPress: (shelter: Shelter) => void;
}

const { height } = Dimensions.get("window");

const ShelterBottomSheet: React.FC<ShelterBottomSheetProps> = ({
  shelters,
  isVisible,
  onClose,
  onShelterPress
}) => {
  if (!isVisible) return null;

  const renderShelterItem = ({ item }: { item: Shelter }) => (
    <TouchableOpacity style={styles.shelterItem} onPress={() => onShelterPress(item)}>
      <Text style={styles.shelterName}>{item.RSTR_NM}</Text>
      <Text style={styles.shelterAddress}>
        {item.RN_DTL_ADRES} {item.DTL_ADRES}
      </Text>
      <View style={styles.shelterInfo}>
        <Text style={styles.distance}>{item.distance.toFixed(1)}km</Text>
        <Text style={styles.capacity}>수용인원: {item.USE_PSBL_NMPR}명</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>근처 쉼터 ({shelters.length}개)</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shelters}
        renderItem={renderShelterItem}
        keyExtractor={item => item.RSTR_FCLTY_NO.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: height * 0.6
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  closeButton: {
    padding: 8
  },
  closeButtonText: {
    color: "#666",
    fontSize: 16
  },
  list: {
    flex: 1
  },
  shelterItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  shelterName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2196F3", // 파란 굵은 글씨
    marginBottom: 4
  },
  shelterAddress: {
    fontSize: 14,
    color: "#666", // 회색 글씨
    marginBottom: 8
  },
  shelterInfo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  distance: {
    fontSize: 12,
    color: "#999"
  },
  capacity: {
    fontSize: 12,
    color: "#999"
  }
});

export default ShelterBottomSheet;
