/**
 * 날짜 형식을 변환합니다.
 * @param dateStr - YYYYMMDD 형식의 날짜 문자열
 * @returns "YYYY년 M월 D일" 형식의 문자열
 */
export const formatDate = (dateStr: string): string => {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
};

/**
 * 시간 형식을 변환합니다.
 * @param timeStr - HHMMSS 형식의 시간 문자열
 * @returns "HH:MM:SS" 형식의 문자열
 */
export const formatTime = (timeStr: string): string => {
  const hour = timeStr.substring(0, 2);
  const minute = timeStr.substring(2, 4);
  const second = timeStr.substring(4, 6);
  return `${hour}:${minute}:${second}`;
};

/**
 * 예보 시간 형식을 변환합니다.
 * @param timeStr - HHMM 형식의 시간 문자열
 * @returns "HH:MM" 형식의 문자열
 */
export const formatForecastTime = (timeStr: string): string => {
  const hour = timeStr.substring(0, 2);
  const minute = timeStr.substring(2, 4);
  return `${hour}:${minute}`;
};

/**
 * 날짜와 시간을 함께 변환합니다.
 * @param dateStr - YYYYMMDD 형식의 날짜 문자열
 * @param timeStr - HHMMSS 형식의 시간 문자열
 * @returns "YYYY년 M월 D일 HH:MM:SS" 형식의 문자열
 */
export const formatDateTime = (dateStr: string, timeStr: string): string => {
  return `${formatDate(dateStr)} ${formatTime(timeStr)}`;
};
