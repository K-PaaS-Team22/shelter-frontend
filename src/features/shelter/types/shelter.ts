export interface Shelter {
  distance: number;
  RSTR_FCLTY_NO: number;
  RSTR_NM: string;
  RN_DTL_ADRES: string;
  DTL_ADRES: string;
  FCLTY_TY: string;
  FCLTY_SCLAS: string;
  USE_PSBL_NMPR: number;
  LO: number; // 경도
  LA: number; // 위도
  UTZTN_PSBLTY_TNOP: number;
  WKDY_OPER_BGNG_HR: string;
  REARE_NM: string;
  WKDY_OPER_END_HR: string;
  WKDAY_OPER_BEGIN_TIME: string;
  WKDAY_OPER_END_TIME: string;
  WKEND_HDAY_OPER_BEGIN_TIME: string | null;
  WKEND_HDAY_OPER_END_TIME: string | null;
  CHCK_MATTER_WKEND_HDAY_OPN_AT: string;
  CHCK_MATTER_NIGHT_OPN_AT: string;
  CHCK_MATTER_STAYNG_PSBL_AT: string;
  COLR_HOLD_ARCNDTN: number;
  COLR_HOLD_ELEFN: number;
  AR: number;
  YEAR: string;
  ARCD: string;
  MNGDPT_CD: string;
  MODF_TIME: string;
  INPT_TIME: string;
  RM: string | null;
}
