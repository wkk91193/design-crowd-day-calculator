import DayCounter from './day-counter';

describe('DayCounter',()=>{
    const dayCounter = new DayCounter();
    it('should return number of weekdays between given two weekdays',()=>{
        expect(dayCounter.getWeekdaysBetweenTwoDates(new Date('2013-10-07'),new Date('2013-10-09'))).toBe(1)
    });

    it('should return number of weekdays between given when given weekday and weekend day',()=>{
        expect(dayCounter.getWeekdaysBetweenTwoDates(new Date('2013-10-05'),new Date('2013-10-14'))).toBe(5);
    });

});
