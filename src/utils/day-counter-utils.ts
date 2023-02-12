import { DateRange, DayOfWeek } from '../@types/day-counter';

export const getNormalisedTimesForDateRange = (inputDateRange: DateRange): DateRange => {
  if (inputDateRange.endDate < inputDateRange.startDate) {
    throw new Error('endDate cannot be earlier than the startDate');
  }
  const timezoneDiff = inputDateRange.endDate.getTimezoneOffset() - inputDateRange.startDate.getTimezoneOffset();

  const startDate = new Date(inputDateRange.startDate);
  const endDate = new Date(inputDateRange.endDate);

  if (timezoneDiff != 0) {
    // Handle daylight saving time difference between two dates.
    startDate.setMinutes(startDate.getMinutes() + timezoneDiff);
    endDate.setMinutes(endDate.getMinutes() + timezoneDiff);
  }

  return { startDate: startDate, endDate: endDate };
};

export const addDaysToGivenDate = (date: Date, numberOfDays: number): Date => {
  const newDate = new Date(date);
  newDate.setUTCDate(newDate.getUTCDate() + numberOfDays);
  return newDate;
};

export const isWeekDay = (day: Date): boolean => {
  if (day.getDay() >= DayOfWeek.Monday && day.getDay() <= DayOfWeek.Friday) {
    return true;
  }
  return false;
};
