export interface Timezone {
  id?: number;
  label: string;
  zoneId: string;
  utcOffset: string;
  region: string;
}

export interface TimezoneRequest {
  label: string;
  zoneId: string;
}

export interface TimeConversion {
  sourceZoneId: string;
  targetZoneId: string;
  dateTime: string;
}