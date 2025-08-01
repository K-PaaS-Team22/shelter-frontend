import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";

export function useNetwork() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
}
