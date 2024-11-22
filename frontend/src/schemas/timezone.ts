import { z } from 'zod';

export const timezoneSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  zoneId: z.string().min(1, 'Timezone is required'),
});

export const timeConversionSchema = z.object({
  sourceZoneId: z.string().min(1, 'Source timezone is required'),
  targetZoneId: z.string().min(1, 'Target timezone is required'),
  dateTime: z.string().min(1, 'Date and time is required'),
});