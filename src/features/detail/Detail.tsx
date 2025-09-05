import React from "react";
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import Header from "@moeum/common/components/Header";
import Button from "@moeum/common/components/Button";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { Shelter } from "@moeum/features/shelter";
import { formatTime } from "@moeum/shared/utils/formatTime";

export default function Detail() {
  const params = useLocalSearchParams<{ shelter: string }>();
  const shelter: Shelter | null = params.shelter ? JSON.parse(params.shelter) : null;

  if (!shelter) return <Text>쉼터 정보가 없습니다.</Text>;

  const onClick = () => {
    console.log("경로보기");
  };

  const details = [
    {
      icon: "people-outline" as const,
      color: "#0a84ff",
      text: `최대 ${shelter.USE_PSBL_NMPR}명까지 수용할 수 있어요.`
    },
    {
      icon: "time-outline" as const,
      color: "#ff3b30",
      text: `평일 운영시간: ${formatTime(shelter.WKDAY_OPER_BEGIN_TIME)} ~ ${formatTime(shelter.WKDAY_OPER_END_TIME)}`
    },
    {
      icon: "time-outline" as const,
      color: "#ff9500",
      text: `주말 운영시간: ${
        shelter.WKEND_HDAY_OPER_BEGIN_TIME && shelter.WKEND_HDAY_OPER_END_TIME
          ? `${formatTime(shelter.WKEND_HDAY_OPER_BEGIN_TIME)} ~ ${formatTime(shelter.WKEND_HDAY_OPER_END_TIME)}`
          : "정보 미제공"
      }`
    },
    {
      icon: "people-outline" as const,
      color: "#0a84ff",
      text: `냉/난방 장치 개수: ${shelter.COLR_HOLD_ARCNDTN ?? "정보 없음"}개`
    },
    {
      icon: "map" as const,
      color: "#007aff",
      text: `면적: ${shelter.AR ?? "정보 없음"}㎡`
    },
    {
      icon: "checkmark-circle-outline" as const,
      color: "#34c759",
      text: `숙박 가능 여부: ${shelter.CHCK_MATTER_STAYNG_PSBL_AT === "Y" ? "가능" : "불가"}`
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={{ gap: 20 }}>
            <Header title="" />
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: shelter.LA,
                longitude: shelter.LO,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
            >
              <Marker
                coordinate={{ latitude: shelter.LA, longitude: shelter.LO }}
                title={shelter.RSTR_NM}
                description={`${shelter.RN_DTL_ADRES} ${shelter.DTL_ADRES}`}
              />
            </MapView>

            <View style={styles.infoSection}>
              <Text style={styles.title}>{shelter.RSTR_NM}</Text>
              <Text style={styles.address}>
                {shelter.RN_DTL_ADRES} {shelter.DTL_ADRES}
              </Text>
            </View>
          </View>

          <View style={styles.detailSection}>
            {details.map((item, index) => (
              <View key={index} style={styles.row}>
                <Ionicons name={item.icon} size={20} color={item.color} />
                <Text style={styles.detailText}>{item.text}</Text>
              </View>
            ))}
          </View>

          <Button title="경로 보기" onPress={onClick} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "space-between", padding: 16 },
  map: { width: "100%", height: 220, borderRadius: 20, alignSelf: "center" },
  infoSection: { alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", color: "#000" },
  address: { fontSize: 18, color: "#666", marginTop: 4 },
  detailSection: { paddingHorizontal: 20, paddingVertical: 8, gap: 20 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  detailText: { fontSize: 20, color: "#000", fontWeight: "600" }
});
