import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { Weather } from "../types/weather";
import { formatDate, formatTime, formatForecastTime } from "../../../shared/utils/dateTimeUtils";

interface WeatherDetailModalProps {
  weather: Weather | null;
  isVisible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get("window");

const WeatherDetailModal: React.FC<WeatherDetailModalProps> = ({ weather, isVisible, onClose }) => {
  if (!weather) return null;

  const getSkyDescription = (sky: string): string => {
    switch (sky) {
      case "1":
        return "맑음";
      case "3":
        return "구름많음";
      case "4":
        return "흐림";
      default:
        return "알 수 없음";
    }
  };

  const getPrecipitationType = (pty: string): string => {
    switch (pty) {
      case "0":
        return "없음";
      case "1":
        return "비";
      case "2":
        return "비/눈";
      case "3":
        return "눈";
      case "4":
        return "소나기";
      default:
        return "알 수 없음";
    }
  };

  const getWindDirection = (vec: string): string => {
    const direction = parseInt(vec);
    if (direction >= 337.5 || direction < 22.5) return "북";
    if (direction >= 22.5 && direction < 67.5) return "북동";
    if (direction >= 67.5 && direction < 112.5) return "동";
    if (direction >= 112.5 && direction < 157.5) return "남동";
    if (direction >= 157.5 && direction < 202.5) return "남";
    if (direction >= 202.5 && direction < 247.5) return "남서";
    if (direction >= 247.5 && direction < 292.5) return "서";
    if (direction >= 292.5 && direction < 337.5) return "북서";
    return "알 수 없음";
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>오늘의 날씨</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.mainInfo}>
              <Text style={styles.location}>{weather.locationName}</Text>
              <Text style={styles.temperature}>{weather.tmp}°C</Text>
              <Text style={styles.sky}>{getSkyDescription(weather.sky)}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>상세 정보</Text>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>강수 형태</Text>
                <Text style={styles.detailValue}>{getPrecipitationType(weather.pty)}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>강수 확률</Text>
                <Text style={styles.detailValue}>{weather.pop}%</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>1시간 강수량</Text>
                <Text style={styles.detailValue}>{weather.pcp}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>풍속</Text>
                <Text style={styles.detailValue}>{weather.wsd} m/s</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>풍향</Text>
                <Text style={styles.detailValue}>
                  {getWindDirection(weather.vec)} ({weather.vec}°)
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>풍속 성분</Text>
                <Text style={styles.detailValue}>
                  동서: {weather.uuu} m/s, 남북: {weather.vvv} m/s
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>파고</Text>
                <Text style={styles.detailValue}>
                  {weather.wav === "-999" ? "해당없음" : `${weather.wav} m`}
                </Text>
              </View>
            </View>

            <View style={styles.timeInfo}>
              <Text style={styles.sectionTitle}>관측 정보</Text>
              <Text style={styles.timeText}>
                기준 시간: {formatDate(weather.baseDate)} {formatTime(weather.baseTime)}
              </Text>
              <Text style={styles.timeText}>예보 시간: {formatForecastTime(weather.fcstTime)}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: width * 0.98,
    height: height * 0.65,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f8f9fa"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333"
  },
  closeButton: {
    padding: 10
  },
  closeButtonText: {
    fontSize: 26,
    color: "#666"
  },
  content: {
    flex: 1,
    padding: 25
  },
  mainInfo: {
    alignItems: "center",
    marginBottom: 35,
    paddingVertical: 30,
    backgroundColor: "#f8f9fa",
    borderRadius: 20
  },
  location: {
    fontSize: 24,
    color: "#666",
    marginBottom: 20
  },
  temperature: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#006CFF",
    marginBottom: 20
  },
  sky: {
    fontSize: 28,
    color: "#333",
    fontWeight: "600"
  },
  tempRange: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#e0f7fa",
    borderRadius: 10
  },
  tempRangeText: {
    fontSize: 18,
    color: "#00796b",
    fontWeight: "600"
  },
  detailSection: {
    marginBottom: 35
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 25
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  detailLabel: {
    fontSize: 20,
    color: "#666"
  },
  detailValue: {
    fontSize: 20,
    color: "#333",
    fontWeight: "600"
  },
  timeInfo: {
    marginBottom: 25
  },
  timeText: {
    fontSize: 18,
    color: "#999",
    marginBottom: 10
  }
});

export default WeatherDetailModal;
