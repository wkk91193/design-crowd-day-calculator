import { DateRange } from '../@types/day-counter';
import WeekDayCounterService from './weekday-counter-service';
describe('WeekDayCounterService()', () => {
  let weekdayCounterService: WeekDayCounterService;
  beforeEach(() => {
    weekdayCounterService = new WeekDayCounterService();
  });

  describe('getCountOfWeekDays', () => {
    it('should return number of weekdays between given two weekdays', () => {
      const dateRange: DateRange = {
        startDate: new Date('2013/10/07'),
        endDate: new Date('2013/10/09'),
      };
      expect(weekdayCounterService.getCountOfWeekDays(dateRange)).toBe(1);
    });

    it('should return number of weekdays with a timezone offset (one with daylight savings and one with non-daylight savings)', () => {
      const firstDateRange: DateRange = {
        startDate: new Date('2013/10/05'),
        endDate: new Date('2013/10/14'),
      };
      expect(weekdayCounterService.getCountOfWeekDays(firstDateRange)).toBe(5);

      const secondDateRange: DateRange = {
        startDate: new Date('2013/10/07'),
        endDate: new Date('2014/01/01'),
      };
      expect(weekdayCounterService.getCountOfWeekDays(secondDateRange)).toBe(61);
    });

    it('should return 0 when start is date is greater than endDate', () => {
      const secondDateRange: DateRange = {
        startDate: new Date('2013/10/07'),
        endDate: new Date('2013/10/05'),
      };
      expect(weekdayCounterService.getCountOfWeekDays(secondDateRange)).toBe(0);
    });
  });
});
