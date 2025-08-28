import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useForegroundPermissions } from "expo-location";
import { Shelter, fetchNearbyShelters, ShelterBottomSheet } from "../../shelter";
import { Weather, fetchTodayWeather, WeatherDetailModal } from "../../weather";

interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const LocationTracker: React.FC = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isLoadingShelters, setIsLoadingShelters] = useState(false);

  const [weather, setWeather] = useState<Weather | null>(null);
  const [isWeatherModalVisible, setIsWeatherModalVisible] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  const [locationPermission, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const permission = await requestPermission();

        if (permission.granted) {
          const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation
          });

          const { latitude, longitude } = currentLocation.coords;

          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          });

          // 위치를 가져온 후 근처 쉼터와 날씨 조회
          await Promise.all([
            fetchNearbySheltersData(latitude, longitude),
            fetchWeatherData(latitude, longitude)
          ]);
        }
      } catch (error) {
        console.error("위치 초기화 실패:", error);
      }
    };

    initializeLocation();
  }, []);

  const fetchNearbySheltersData = async (lat: number, lot: number) => {
    try {
      setIsLoadingShelters(true);
      const sheltersData = await fetchNearbyShelters(lat, lot);
      setShelters(sheltersData);
    } catch (error) {
      console.error("쉼터 데이터 조회 실패:", error);
      Alert.alert("오류", "근처 쉼터 정보를 가져오는데 실패했습니다. 다시 시도해주세요.", [
        { text: "확인" }
      ]);
    } finally {
      setIsLoadingShelters(false);
    }
  };

  const fetchWeatherData = async (lat: number, lot: number) => {
    try {
      setIsLoadingWeather(true);
      const weatherData = await fetchTodayWeather(lat, lot);
      setWeather(weatherData);
    } catch (error) {
      console.error("날씨 데이터 조회 실패:", error);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const onRegionChange = (newRegion: Location) => {
    setLocation(newRegion);
  };

  const onShelterPress = (shelter: Shelter) => {
    // 쉼터 위치로 지도 이동
    setLocation({
      latitude: shelter.LA,
      longitude: shelter.LO,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    });
    setIsBottomSheetVisible(false);
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  const toggleWeatherModal = () => {
    setIsWeatherModalVisible(!isWeatherModalVisible);
  };

  const refreshData = async () => {
    if (location.latitude !== 37.5665 && location.longitude !== 126.978) {
      await Promise.all([
        fetchNearbySheltersData(location.latitude, location.longitude),
        fetchWeatherData(location.latitude, location.longitude)
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={location}
        region={location}
        onRegionChangeComplete={onRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {/* 쉼터 마커들 */}
        {shelters.map(shelter => (
          <Marker
            key={shelter.RSTR_FCLTY_NO}
            coordinate={{
              latitude: shelter.LA,
              longitude: shelter.LO
            }}
            title={shelter.RSTR_NM}
            description={`${shelter.distance.toFixed(1)}km 거리`}
            pinColor="red"
          />
        ))}
      </MapView>

      {/* 날씨 버튼 */}
      <TouchableOpacity style={styles.weatherButton} onPress={toggleWeatherModal}>
        <Text style={styles.weatherButtonText}>{isLoadingWeather ? "로딩 중..." : "🌤️ 날씨"}</Text>
      </TouchableOpacity>

      {/* 쉼터 버튼 */}
      <TouchableOpacity style={styles.shelterButton} onPress={toggleBottomSheet}>
        <Text style={styles.shelterButtonText}>
          {isLoadingShelters ? "로딩 중..." : `근처 쉼터 (${shelters.length}개)`}
        </Text>
      </TouchableOpacity>

      {/* 새로고침 버튼 */}
      <TouchableOpacity style={styles.refreshButton} onPress={refreshData}>
        <Text style={styles.refreshButtonText}>🔄</Text>
      </TouchableOpacity>

      {/* 쉼터 바텀시트 */}
      <ShelterBottomSheet
        shelters={shelters}
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        onShelterPress={onShelterPress}
      />

      {/* 날씨 상세 모달 */}
      <WeatherDetailModal
        weather={weather}
        isVisible={isWeatherModalVisible}
        onClose={() => setIsWeatherModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  weatherButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#FF9800",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  weatherButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600"
  },
  shelterButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#2196F3",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  shelterButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600"
  },
  refreshButton: {
    position: "absolute",
    top: 120,
    left: 20,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  refreshButtonText: {
    fontSize: 18
  }
});

export default LocationTracker;
