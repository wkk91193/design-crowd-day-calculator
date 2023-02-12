import { DateRange, PublicHolidayRules, PublicHolidaysOnCertainOccurrencesRules } from '../@types/day-counter';
import { addDaysToGivenDate, getNormalisedTimesForDateRange } from '../utils/day-counter-utils';
import BusinessDayCounter from './business-day-counter';
import WeekDayCounterService from './weekday-counter-service';

export default class BusinessDayCounterOnCertainOccurrenceService implements BusinessDayCounter {
  /**
   * Gets the number of business days for a given date range, rule: when given a day of the week and occurrence
   *
   */

  getCountOfBusinessDays(dateRange: DateRange, publicHolidayRules: PublicHolidayRules[]): number {
    if (dateRange.endDate < dateRange.startDate) {
      return 0;
    }
    const normalisedDateRange = getNormalisedTimesForDateRange(dateRange);

    const weekDayCounterService = new WeekDayCounterService();

    const listOfWeekDaysinMilliseconds =
      weekDayCounterService.getListOfWeekDaysinMillisecondsBetweenDateRange(dateRange);

    let publicHolidaysinMilliseconds: number[] = [];
    let startDate = normalisedDateRange.startDate;
    const endDate = normalisedDateRange.endDate;

    while (startDate.getFullYear() <= endDate.getFullYear()) {
      const yearHolidayinMillisecondsList = (publicHolidayRules as PublicHolidaysOnCertainOccurrencesRules[]).map(
        (publicHolidayRule) => {
          //get holiday list for each year
          const firstDateOfTheMonth = new Date(`${startDate.getFullYear()}/${startDate.getMonth() + 1}/01`);
          const firstOccurenceOfDay =
            firstDateOfTheMonth.getDay() === publicHolidayRule.dayOfWeek.valueOf()
              ? firstDateOfTheMonth
              : addDaysToGivenDate(
                  firstDateOfTheMonth,
                  Math.abs(publicHolidayRule.dayOfWeek.valueOf() - firstDateOfTheMonth.getDay())
                );
          const occurence = addDaysToGivenDate(firstOccurenceOfDay, 7 * publicHolidayRule.occurrence.valueOf());
          return occurence.getTime();
        }
      );
      publicHolidaysinMilliseconds = publicHolidaysinMilliseconds.concat(yearHolidayinMillisecondsList);
      startDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
    }
    const businessDaysList = listOfWeekDaysinMilliseconds.filter((weekDay) => {
      return !publicHolidaysinMilliseconds.includes(weekDay);
    });
    return businessDaysList.length;
  }
}
