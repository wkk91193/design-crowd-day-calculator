import DayCounter from './day-counter';

describe('DayCounter', () => {
  const dayCounter = new DayCounter();

  describe('getWeekdaysBetweenTwoDatesCount()',()=>{
    it('should return number of weekdays between given two weekdays', () => {
        expect(
          dayCounter.getWeekdaysBetweenTwoDatesCount(
            new Date('2013-10-07'),
            new Date('2013-10-09')
          )
        ).toBe(1);
      });
    
      it('should return number of weekdays with a timezone offset (one with daylight savings and one with non-daylight savings)', () => {
        expect(
          dayCounter.getWeekdaysBetweenTwoDatesCount(
            new Date('2013-10-05'),
            new Date('2013-10-14')
          )
        ).toBe(5);
        expect(
          dayCounter.getWeekdaysBetweenTwoDatesCount(
            new Date('2013-10-07'),
            new Date('2014-01-01')
          )
        ).toBe(61);
      });
    
      it('should return 0 when start is date is greater than endDate', () => {
        expect(
          dayCounter.getWeekdaysBetweenTwoDatesCount(
            new Date('2013-10-07'),
            new Date('2013-10-05')
          )
        ).toBe(0);
      });
  });

  describe('getBusinessDaysBetweenTwoDatesCount()',()=>{

    it('should return number of business days when given two business days ',()=>{
        expect(
            dayCounter.getBusinessDaysBetweenTwoDatesCount(
              new Date('2013-10-07'),
              new Date('2013-10-09'),
              [new Date('2013-12-25'), new Date('2013-12-26'), new Date('2014-01-01') ]
            )
          ).toBe(1);
    });

    it('should return business days when includes a holiday in between  ',()=>{
        expect(
            dayCounter.getBusinessDaysBetweenTwoDatesCount(
              new Date('2013-12-24'),
              new Date('2013-12-27'),
              [new Date('2013-12-25'), new Date('2013-12-26'), new Date('2014-01-01') ]
            )
          ).toBe(0);
    });
  })
  
});
