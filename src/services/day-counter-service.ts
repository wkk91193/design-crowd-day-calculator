import { PublicHolidayRule } from '../models/public-holiday-rule';

type DateRange = {
  startDate: Date;
  endDate: Date;
};

export default class DayCounter {
  //Returns the number of weekdays between first date and second date (first and second exclusive)
  getCountOfWeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    let startDate = firstDate;
    let endDate = secondDate;
    if (endDate < startDate) {
      return 0;
    }
    const normaliseDateRange = this.getNormalisedDatesForDaylightSavings(startDate, endDate);
    startDate = normaliseDateRange.startDate;
    endDate = normaliseDateRange.endDate;
    return this.getListOfWeekDaysBetweenTwoDates(startDate, endDate).length;
  }

  getCountOfBusinessDaysBetweenTwoDates(firstDate: Date, secondDate: Date, publicHolidays: Date[]): number {
    let startDate = firstDate;
    let endDate = secondDate;
    if (endDate < startDate) {
      return 0;
    }
    const normaliseDateRange = this.getNormalisedDatesForDaylightSavings(startDate, endDate);
    startDate = normaliseDateRange.startDate;
    endDate = normaliseDateRange.endDate;

    const weekDays = this.getListOfWeekDaysBetweenTwoDates(startDate, endDate);
    const publicHolidaysMilliseconds = publicHolidays.map((holiday) => holiday.getTime());
    const businessDaysList = weekDays.filter((weekDay) => {
      return !publicHolidaysMilliseconds.includes(weekDay);
    });
    return businessDaysList.length;
  }

  getCountOfBusinessDaysBetweenTwoDatesForCustomRules(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: PublicHolidayRule[]
  ): number {
    let startDate = firstDate;
    let endDate = secondDate;

    if (endDate < startDate) {
      return 0;
    }
    const normaliseDateRange = this.getNormalisedDatesForDaylightSavings(startDate, endDate);
    startDate = normaliseDateRange.startDate;
    endDate = normaliseDateRange.endDate;

    let weekDays = this.getListOfWeekDaysBetweenTwoDates(startDate, endDate);

    let publicHolidayDateList: Date[] = [];
    while (startDate.getUTCFullYear() <= endDate.getUTCFullYear()) {
      //get holiday list for each year
      const yearHolidayList = publicHolidays.map((holiday) =>
        holiday.getPublicHolidayDateFromYear(startDate.getUTCFullYear())
      );
      publicHolidayDateList = publicHolidayDateList.concat(yearHolidayList);
      startDate = new Date(startDate.setUTCFullYear(startDate.getUTCFullYear() + 1));
    }
    let publicHolidaysDateListinMilliseconds = publicHolidayDateList.map((holiday) => holiday.getTime());
    const businessDaysList = weekDays.filter((weekDay) => {
      return !publicHolidaysDateListinMilliseconds.includes(weekDay);
    });
    return businessDaysList.length;
  }

  private getListOfWeekDaysBetweenTwoDates(startDate: Date, endDate: Date): number[] {
    const weekdaysList = [];
    let tempDate = DayCounter.addDaystoGivenDate(startDate, 1);
    while (tempDate < endDate) {
      if (this.isWeekDay(tempDate)) {
        weekdaysList.push(new Date(tempDate).getTime());
      }
      tempDate = DayCounter.addDaystoGivenDate(tempDate, 1);
    }
    return weekdaysList;
  }

  private isWeekDay(day: Date): boolean {
    if (day.getDay() >= 1 && day.getDay() <= 5) {
      return true;
    }
    return false;
  }

  public static addDaystoGivenDate(date: Date, numberOfDays: number): Date {
    const newDate = new Date(date);
    return new Date(newDate.setUTCDate(newDate.getUTCDate() + numberOfDays));
  }

  private getNormalisedDatesForDaylightSavings(startDate: Date, endDate: Date): DateRange {
    let timezoneDiff = endDate.getTimezoneOffset() - startDate.getTimezoneOffset();
    if (timezoneDiff != 0) {
      // Handle daylight saving time difference between two dates.
      startDate.setMinutes(startDate.getMinutes() + timezoneDiff);
      endDate.setMinutes(endDate.getMinutes() + timezoneDiff);
    }

    return { startDate: startDate, endDate: endDate };
  }
}
