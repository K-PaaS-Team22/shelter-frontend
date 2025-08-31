import { Shelter } from "../types/shelter";

const API_BASE_URL = process.env.API_BASE_URL || "http://shelter.14-63-176-141.nip.io";

export const fetchNearbyShelters = async (userLat: number, userLot: number): Promise<Shelter[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/shelter/summer/near?userLat=${userLat}&userLot=${userLot}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userLat: userLat.toString(),
          userLot: userLot.toString()
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching nearby shelters:", error);
    throw error;
  }
};
