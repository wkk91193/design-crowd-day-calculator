import { DateRange } from '../@types/day-counter';
import { addDaysToGivenDate, getNormalisedTimesForDateRange, isWeekDay } from '../utils/day-counter-utils';
import WeekDayCounter from './weekday-counter';

export default class WeekDayCounterService implements WeekDayCounter {
  /**
   * Gets the number of week days for a given date range
   *
   */
  getCountOfWeekDays(dateRange: DateRange): number {
    if (dateRange.endDate < dateRange.startDate) {
      return 0;
    }
    const normalisedDateRange = getNormalisedTimesForDateRange(dateRange);
    return this.getListOfWeekDaysinMillisecondsBetweenDateRange(normalisedDateRange).length;
  }

  getListOfWeekDaysinMillisecondsBetweenDateRange(dateRange: DateRange): number[] {
    const weekdaysinMillisecondsList = [];
    let tempDate = addDaysToGivenDate(dateRange.startDate, 1);
    while (tempDate < dateRange.endDate) {
      if (isWeekDay(tempDate)) {
        weekdaysinMillisecondsList.push(new Date(tempDate).getTime());
      }
      tempDate = addDaysToGivenDate(tempDate, 1);
    }
    return weekdaysinMillisecondsList;
  }
}
