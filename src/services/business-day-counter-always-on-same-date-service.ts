import { DateRange, DayOfWeek, PublicHolidayAlwaysOnSameDateRules, PublicHolidayRules } from '../@types/day-counter';
import { addDaysToGivenDate, getNormalisedTimesForDateRange } from '../utils/day-counter-utils';
import BusinessDayCounter from './business-day-counter';
import WeekDayCounterService from './weekday-counter-service';

export default class BusinessDayCounterAlwaysOnSameDateService implements BusinessDayCounter {
  /**
   * Gets the number of business days for a given date range, rule: when given a fixed, when falls on a weekend,delayed to next Monday
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
      const yearHolidayinMillisecondsList = (publicHolidayRules as PublicHolidayAlwaysOnSameDateRules[]).map(
        (publicHolidayRule) => {
          //get holiday list for each year
          let date = new Date(`${startDate.getFullYear()}/${publicHolidayRule.month}/${publicHolidayRule.day}`);
          if (this.shouldDelayIfFallsOnAWeekend(publicHolidayRule.shouldDelayIfFallsOnAWeekend, date.getDay())) {
            const daysUntilMonday = (DayOfWeek.Monday - date.getDay() + 7) % 7;
            date = addDaysToGivenDate(date, daysUntilMonday);
          }
          return date.getTime();
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

  private shouldDelayIfFallsOnAWeekend(shouldDelayIfFallsOnAWeekend: boolean, day: number): boolean {
    if (shouldDelayIfFallsOnAWeekend && (day === DayOfWeek.Saturday || day === DayOfWeek.Sunday)) return true;

    return false;
  }
}
