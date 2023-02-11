import { DateRange, PublicHolidayRules } from '../@types/day-counter';

export default interface BusinessDayCounter {
  getCountOfBusinessDays(dateRange: DateRange, publicHolidayRules: PublicHolidayRules[]): number;
}
