import DayCounter from './day-counter';
import { DayOfWeek, Occurrence, PublicHolidayRule } from './public-holiday-rule';

describe('DayCounter', () => {
  const dayCounter = new DayCounter();

  describe('getWeekdaysBetweenTwoDatesCount()', () => {
    it('should return number of weekdays between given two weekdays', () => {
      expect(
        dayCounter.getCountOfWeekdaysBetweenTwoDates(
          new Date('2013/10/07'),
          new Date('2013/10/09')
        )
      ).toBe(1);
    });

    it('should return number of weekdays with a timezone offset (one with daylight savings and one with non-daylight savings)', () => {
      expect(
        dayCounter.getCountOfWeekdaysBetweenTwoDates(
          new Date('2013/10/05'),
          new Date('2013/10/14')
        )
      ).toBe(5);
      expect(
        dayCounter.getCountOfWeekdaysBetweenTwoDates(
          new Date('2013/10/07'),
          new Date('2014/01/01')
        )
      ).toBe(61);
    });

    it('should return 0 when start is date is greater than endDate', () => {
      expect(
        dayCounter.getCountOfWeekdaysBetweenTwoDates(
          new Date('2013/10/07'),
          new Date('2013/10/05')
        )
      ).toBe(0);
    });
  });

  describe('getCountOfBusinessDaysBetweenTwoDates()', () => {
    it('should return number of business days when given two business days and no holiday(s) between ', () => {
      expect(
        dayCounter.getCountOfBusinessDaysBetweenTwoDates(
          new Date('2013/10/07'),
          new Date('2013/10/09'),
          [
            new Date('2013/12/25'),
            new Date('2013/12/26'),
            new Date('2014/01/01'),
          ]
        )
      ).toBe(1);
    });

    it('should return business days when include holiday(s) in between  ', () => {
      expect(
        dayCounter.getCountOfBusinessDaysBetweenTwoDates(
          new Date('2013/12/24'),
          new Date('2013/12/27'),
          [
            new Date('2013/12/25'),
            new Date('2013/12/26'),
            new Date('2014/01/01'),
          ]
        )
      ).toBe(0);
      expect(
        dayCounter.getCountOfBusinessDaysBetweenTwoDates(
          new Date('2013/10/07'),
          new Date('2014/01/01'),
          [
            new Date('2013/12/25'),
            new Date('2013/12/26'),
            new Date('2014/01/01'),
          ]
        )
      ).toBe(59);
    });
  });

  describe('getCountOfBusinessDaysBetweenTwoDatesForCustomRules()', () => {
    it('should return number of business days when fixed holiday between dates and on weekend', () => {
      let startDate = new Date('2020/06/15');
      let endDate = new Date('2020/06/28');
      let rules = [
        PublicHolidayRule.fromFixedPublicHolidayAndAllowedToDelayRule(
          6,
          20,
          false
        ),
      ];
      expect(
        dayCounter.getCountOfBusinessDaysBetweenTwoDatesForCustomRules(
          startDate,
          endDate,
          rules
        )
      ).toBe(9);
    });

    it('should return number of business days when fixed holiday between dates and not on weekend', () => {
      let startDate = new Date('2013/10/07');
      let endDate = new Date('2013/10/09');
      let rules = [
        PublicHolidayRule.fromFixedPublicHolidayAndAllowedToDelayRule(
          10,
          8,
          false
        ),
      ];
      expect(
        dayCounter.getCountOfBusinessDaysBetweenTwoDatesForCustomRules(
          startDate,
          endDate,
          rules
        )
      ).toBe(0);
    });

    it('should return number of business days when holiday falls on a weekend and  allowed to delay to next Monday', () => {
      let startDate = new Date('2020/06/15');
      let endDate = new Date('2020/06/28');
      let rules = [
        PublicHolidayRule.fromFixedPublicHolidayAndAllowedToDelayRule(
          6,
          20,
          true
        ),
      ];
      expect(
        dayCounter.getCountOfBusinessDaysBetweenTwoDatesForCustomRules(
          startDate,
          endDate,
          rules
        )
      ).toBe(8);
    });

    it('should return number of business days when holiday does not fall on a weekend but allowed delay to next Monday', () => {
      let startDate = new Date('2020/06/15');
      let endDate = new Date('2020/06/28');
      let rules = [
        PublicHolidayRule.fromFixedPublicHolidayAndAllowedToDelayRule(
          6,
          22,
          true
        ),
      ];
      expect(
        dayCounter.getCountOfBusinessDaysBetweenTwoDatesForCustomRules(
          startDate,
          endDate,
          rules
        )
      ).toBe(8);
    });

    it('should return number of business days when occurence not between the start and end dates', () => {
      let startDate = new Date('2020/06/15');
      let endDate = new Date('2020/06/28');
      let rules = [
        PublicHolidayRule.fromOccurrenceOfADayOfASpecificMonth(DayOfWeek.Monday,Occurrence.Second,6),
      ];
      expect(
        dayCounter.getCountOfBusinessDaysBetweenTwoDatesForCustomRules(
          startDate,
          endDate,
          rules
        )
      ).toBe(9);
    });

    it('should return number of business days when occurence between the start and end dates', () => {
      let startDate = new Date('2020/06/15');
      let endDate = new Date('2020/06/28');

      let rules = [
        PublicHolidayRule.fromOccurrenceOfADayOfASpecificMonth(DayOfWeek.Monday, Occurrence.Fourth, 6)
      ];
      expect(
        dayCounter.getCountOfBusinessDaysBetweenTwoDatesForCustomRules(
          startDate,
          endDate,
          rules
        )
      ).toBe(8);
    });
  });
});
