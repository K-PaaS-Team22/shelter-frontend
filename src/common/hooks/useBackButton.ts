import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import { notify } from "@moeum/common/utils/notify";

export function useBackButton() {
  const isExit = useRef(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleBackPress = () => {
      if (!isExit.current) {
        notify("뒤로가기 버튼을 한 번 더 누르시면 앱이 종료됩니다");
        isExit.current = true;
        timerId.current = setTimeout(() => {
          isExit.current = false;
        }, 2000);
      } else {
        if (timerId.current) clearTimeout(timerId.current);
        BackHandler.exitApp();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      backHandler.remove();
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);
}
