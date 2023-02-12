export interface PublicHolidayRules {}
export interface PublicHolidayFixedDatesRules extends PublicHolidayRules {
  fixedDates: Date[];
}

export interface PublicHolidayCustomDatesRules extends PublicHolidayRules {
  month: number;
}

export interface PublicHolidayAlwaysOnSameDateRules extends PublicHolidayCustomDatesRules {
  day: number;
  shouldDelayIfFallsOnAWeekend: boolean;
}

export interface PublicHolidaysOnCertainOccurrencesRules extends PublicHolidayCustomDatesRules {
  dayOfWeek: DayOfWeek;
  occurrence: Occurrence;
}

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum Occurrence {
  First = 0,
  Second = 1,
  Third = 2,
  Fourth = 3,
  Fifth = 4,
}
