import { DateRange } from '../@types/day-counter';

  
export const isWeekDay =(day: Date): boolean => {
    if (day.getDay() >= 1 && day.getDay() <= 5) {
      return true;
    }
    return false;
  }

  export const addDaystoGivenDate = (date: Date, numberOfDays: number): Date => {
    const newDate = new Date(date);
    return new Date(newDate.setUTCDate(newDate.getUTCDate() + numberOfDays));
 }

 export const getNormalisedDatesForDaylightSavings = (startDate: Date, endDate: Date) : DateRange => {
    let timezoneDiff = endDate.getTimezoneOffset() - startDate.getTimezoneOffset();
    if (timezoneDiff != 0) {
      // Handle daylight saving time difference between two dates.
      startDate.setMinutes(startDate.getMinutes() + timezoneDiff);
      endDate.setMinutes(endDate.getMinutes() + timezoneDiff);
    }

    return { startDate: startDate, endDate: endDate };
  }
