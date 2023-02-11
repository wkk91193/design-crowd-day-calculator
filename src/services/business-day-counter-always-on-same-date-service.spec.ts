import { DateRange, PublicHolidayAlwaysOnSameDateRules } from '../@types/day-counter';
import BusinessDayCounterAlwaysOnSameDateService from './business-day-counter-always-on-same-date-service';
describe('BusinessDayCounterAlwaysOnSameDateService()', () => {
  let businessDayCounterAlwaysOnSameDateService: BusinessDayCounterAlwaysOnSameDateService;
  beforeEach(() => {
    businessDayCounterAlwaysOnSameDateService = new BusinessDayCounterAlwaysOnSameDateService();
  });

  describe('getCountOfBusinessDays', () => {
    it('should return 0 when endDate is smaller than startDate', () => {
      const dateRange: DateRange = {
        startDate: new Date('2013/10/09'),
        endDate: new Date('2013/10/07'),
      };
      const alwaysOnSameDateRule: PublicHolidayAlwaysOnSameDateRules = {
        month: 6,
        day: 20,
        shouldDelay: false,
      };
      expect(businessDayCounterAlwaysOnSameDateService.getCountOfBusinessDays(dateRange, [alwaysOnSameDateRule])).toBe(
        0
      );
    });
    it('should return number of business days when fixed holiday between dates and on weekend', () => {
      const dateRange: DateRange = {
        startDate: new Date('2020/06/15'),
        endDate: new Date('2020/06/28'),
      };

      const alwaysOnSameDateRule: PublicHolidayAlwaysOnSameDateRules = {
        month: 6,
        day: 20,
        shouldDelay: false,
      };
      expect(businessDayCounterAlwaysOnSameDateService.getCountOfBusinessDays(dateRange, [alwaysOnSameDateRule])).toBe(
        9
      );
    });

    it('should return number of business days when fixed holiday between dates and not on weekend', () => {
      const dateRange: DateRange = {
        startDate: new Date('2013/10/07'),
        endDate: new Date('2013/10/09'),
      };

      const alwaysOnSameDateRule: PublicHolidayAlwaysOnSameDateRules = {
        month: 10,
        day: 8,
        shouldDelay: false,
      };
      expect(businessDayCounterAlwaysOnSameDateService.getCountOfBusinessDays(dateRange, [alwaysOnSameDateRule])).toBe(
        0
      );
    });

    it('should return number of business days when holiday falls on a weekend and  allowed to delay to next Monday', () => {
      const dateRange: DateRange = {
        startDate: new Date('2020/06/15'),
        endDate: new Date('2020/06/28'),
      };

      const alwaysOnSameDateRule: PublicHolidayAlwaysOnSameDateRules = {
        month: 6,
        day: 20,
        shouldDelay: true,
      };
      expect(businessDayCounterAlwaysOnSameDateService.getCountOfBusinessDays(dateRange, [alwaysOnSameDateRule])).toBe(
        8
      );
    });

    it('should return number of business days when holiday does not fall on a weekend but allowed delay to next Monday', () => {
      const dateRange: DateRange = {
        startDate: new Date('2020/06/15'),
        endDate: new Date('2020/06/28'),
      };

      const alwaysOnSameDateRule: PublicHolidayAlwaysOnSameDateRules = {
        month: 6,
        day: 22,
        shouldDelay: true,
      };
      expect(businessDayCounterAlwaysOnSameDateService.getCountOfBusinessDays(dateRange, [alwaysOnSameDateRule])).toBe(
        8
      );
    });
  });
});
