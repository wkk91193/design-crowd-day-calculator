import { PublicHolidayRule } from '../models/public-holiday-rule';
import { isWeekDay, getNormalisedDatesForDaylightSavings, addDaystoGivenDate } from '../utils/day-counter-utils';

export default class DayCounter {
  //Returns the number of weekdays between first date and second date (first and second exclusive)
  getCountOfWeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    let startDate = firstDate;
    let endDate = secondDate;
    if (endDate < startDate) {
      return 0;
    }
    const normaliseDateRange = getNormalisedDatesForDaylightSavings(startDate, endDate);
    startDate = normaliseDateRange.startDate;
    endDate = normaliseDateRange.endDate;
    return this.getListOfWeekDaysBetweenTwoDates(startDate, endDate).length;
  }

  //Returns the number of business day between first date and second date (first and second exclusive), given a list of public holidays
  getCountOfBusinessDaysBetweenTwoDates(firstDate: Date, secondDate: Date, publicHolidays: Date[]): number {
    let startDate = firstDate;
    let endDate = secondDate;
    if (endDate < startDate) {
      return 0;
    }
    const normaliseDateRange = getNormalisedDatesForDaylightSavings(startDate, endDate);
    startDate = normaliseDateRange.startDate;
    endDate = normaliseDateRange.endDate;

    const weekDays = this.getListOfWeekDaysBetweenTwoDates(startDate, endDate);
    const publicHolidaysMilliseconds = publicHolidays.map((holiday) => holiday.getTime());
    const businessDaysList = weekDays.filter((weekDay) => {
      return !publicHolidaysMilliseconds.includes(weekDay);
    });
    return businessDaysList.length;
  }

  //Returns the number of business day between first date and second date (first and second exclusive), given a list of public holidays rules
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
    const normaliseDateRange = getNormalisedDatesForDaylightSavings(startDate, endDate);
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
    let tempDate = addDaystoGivenDate(startDate, 1);
    while (tempDate < endDate) {
      if (isWeekDay(tempDate)) {
        weekdaysList.push(new Date(tempDate).getTime());
      }
      tempDate = addDaystoGivenDate(tempDate, 1);
    }
    return weekdaysList;
  }
}
