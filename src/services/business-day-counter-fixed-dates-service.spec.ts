import { DateRange, PublicHolidayFixedDatesRules } from '../@types/day-counter';
import BusinessDayCounterFixedHolidayService from './business-day-counter-fixed-dates-service';
describe('BusinessDayCounterFixedHolidayService()', () => {
  let businessDayCounterFixedHolidayService: BusinessDayCounterFixedHolidayService;
  beforeEach(() => {
    businessDayCounterFixedHolidayService = new BusinessDayCounterFixedHolidayService();
  });

  describe('getCountOfBusinessDays', () => {
    it('should return number of business days when given two business days and no holiday(s) between ', () => {
      const dateRange: DateRange = {
        startDate: new Date('2013/10/07'),
        endDate: new Date('2013/10/09'),
      };
      const fixedDatesRule: PublicHolidayFixedDatesRules = {
        fixedDates: [new Date('2013/12/25'), new Date('2013/12/26'), new Date('2014/01/01')],
      };
      expect(
        businessDayCounterFixedHolidayService.getCountOfBusinessDays(dateRange,[fixedDatesRule] )
      ).toBe(1);
    });

    it('should return business days when include holiday(s) in between  ', () => {

      const firstDateRange: DateRange = {
        startDate: new Date('2013/12/24'),
        endDate: new Date('2013/12/27'),
      };
      const firstFixedDatesRule: PublicHolidayFixedDatesRules = {
        fixedDates: [new Date('2013/12/25'), new Date('2013/12/26'), new Date('2014/01/01')],
      };
      expect(
        businessDayCounterFixedHolidayService.getCountOfBusinessDays(firstDateRange,[firstFixedDatesRule] )
      ).toBe(0);

      const secondDateRange: DateRange = {
        startDate: new Date('2013/10/07'),
        endDate: new Date('2014/01/01'),
      };
      const secondFixedDatesRule: PublicHolidayFixedDatesRules = {
        fixedDates: [new Date('2013/12/25'), new Date('2013/12/26'), new Date('2014/01/01')],
      };
      expect(
        businessDayCounterFixedHolidayService.getCountOfBusinessDays(secondDateRange,[secondFixedDatesRule] )
      ).toBe(59);
    });
  });
});
