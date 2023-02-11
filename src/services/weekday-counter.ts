import { DateRange } from '../@types/day-counter';

export default interface WeekDayCounter {
  getCountOfWeekDays(dateRange: DateRange): number; 
}
