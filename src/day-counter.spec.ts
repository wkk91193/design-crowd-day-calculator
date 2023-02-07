import DayCounter from './day-counter';

describe('DayCounter',()=>{
    const dayCounter = new DayCounter();
    it('should return number of weekdays between given two weekdays',()=>{
        expect(dayCounter.getWeekdaysBetweenTwoDates(new Date('2013-10-07'),new Date('2013-10-09'))).toBe(1)
    });

    it('should return number of weekdays with a timezone offset (one with daylight savings and one with non-daylight savings)',()=>{
        expect(dayCounter.getWeekdaysBetweenTwoDates(new Date('2013-10-05'),new Date('2013-10-14'))).toBe(5);
        expect(dayCounter.getWeekdaysBetweenTwoDates(new Date('2013-10-07'),new Date('2014-01-01'))).toBe(61);
    });

    it('should return 0 when start is date is greater than endDate', ()=>{
        expect(dayCounter.getWeekdaysBetweenTwoDates(new Date('2013-10-07'),new Date('2013-10-05'))).toBe(0);
    })
});
