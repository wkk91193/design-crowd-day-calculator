import { DateRange, PublicHolidayFixedDatesRules, PublicHolidayRules } from '../@types/day-counter';
import { getNormalisedDateRangeForDaylightSavings } from '../utils/day-counter-utils';
import BusinessDayCounter from './business-day-counter';
import WeekDayCounterService from './weekday-counter-service';

export default class BusinessDayCounterFixedHolidayService implements BusinessDayCounter {
    
  getCountOfBusinessDays(dateRange: DateRange, publicHolidayRules: PublicHolidayRules[]): number {
    if (dateRange.endDate < dateRange.startDate) {
      return 0;
    }
    const normalisedDateRange = getNormalisedDateRangeForDaylightSavings(dateRange);

    const weekDayCounterService = new WeekDayCounterService();

    const listOfWeekDaysinMilliseconds =
      weekDayCounterService.getListOfWeekDaysinMillisecondsBetweenDateRange(normalisedDateRange);

    const publicHolidaysinMilliseconds: number[]=[];

    (publicHolidayRules as PublicHolidayFixedDatesRules[]).forEach((holidayRule) =>
      holidayRule.fixedDates.map((holiday) => publicHolidaysinMilliseconds.push(holiday.getTime()))
    );
    const businessDaysinMillisecondsList = listOfWeekDaysinMilliseconds.filter((weekDay) => {
      return !publicHolidaysinMilliseconds.includes(weekDay);
    });
    return businessDaysinMillisecondsList.length;
  }
}
