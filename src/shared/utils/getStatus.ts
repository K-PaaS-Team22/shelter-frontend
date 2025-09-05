import { Shelter } from "@moeum/features/shelter";
export const getStatus = (shelter: Shelter) => {
  if (shelter.CHCK_MATTER_NIGHT_OPN_AT === "Y") return "24시간 개방";

  const hasWeekdayTime = shelter.WKDAY_OPER_BEGIN_TIME && shelter.WKDAY_OPER_END_TIME;
  if (hasWeekdayTime) return "개방 중";

  return "폐쇄 중";
};
