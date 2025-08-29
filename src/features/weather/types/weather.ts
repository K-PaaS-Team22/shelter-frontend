export interface Weather {
  baseDate: string;
  baseTime: string;
  fcstTime: string;
  locationName: string;
  nx: number;
  ny: number;
  tmp: string; // 1시간 기온
  uuu: string; // 풍속(동서성분)
  vvv: string; // 풍속(남북성분)
  vec: string; // 풍향
  wsd: string; // 풍속
  sky: string; // 하늘상태
  pty: string; // 강수형태
  pop: string; // 강수확률
  wav: string; // 파고
  pcp: string; // 1시간 강수량
}

export interface WeatherDisplay {
  temperature: string;
  location: string;
  sky: string;
  precipitation: string;
  windSpeed: string;
  windDirection: string;
  rainChance: string;
}
