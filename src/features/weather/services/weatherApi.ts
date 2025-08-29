import { Weather } from "../types/weather";

const API_BASE_URL = process.env.API_BASE_URL || "http://shelter.14-63-176-141.nip.io";

export const fetchTodayWeather = async (userLat: number, userLot: number): Promise<Weather> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather/today?userLat=${userLat}&userLot=${userLot}`,
      {
        method: "GET",
        headers: {
          accept: "*/*"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};
