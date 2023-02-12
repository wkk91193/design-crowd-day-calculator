import { DateRange } from '../@types/day-counter';
import { addDaysToGivenDate, getNormalisedTimesForDateRange, isWeekDay } from './day-counter-utils';
describe('getNormalisedDateRangeForDaylightSavings()', () => {
  it('should throw an Error when endDate is smaller than the startDate for the range', () => {
    const dateRange: DateRange = {
      startDate: new Date('2013/10/14'),
      endDate: new Date('2013/10/05'),
    };
    expect(() => {
      getNormalisedTimesForDateRange(dateRange);
    }).toThrow(new Error('endDate cannot be earlier than the startDate'));
  });

  it('should return normalised times for date range', () => {
    const dateRange: DateRange = {
      startDate: new Date('2013/10/05'),
      endDate: new Date('2013/10/14'),
    };
    const dateRangeOut = getNormalisedTimesForDateRange(dateRange);

    const hoursdiff = dateRangeOut.endDate.getHours() - dateRangeOut.startDate.getHours();
    expect(hoursdiff).toBe(0);

    const minutesDiff = dateRangeOut.endDate.getMinutes() - dateRangeOut.startDate.getMinutes();
    expect(minutesDiff).toBe(0);

    const secondsDiff = dateRangeOut.endDate.getMinutes() - dateRangeOut.startDate.getMinutes();
    expect(secondsDiff).toBe(0);

    const milliSecondsDiff = dateRangeOut.endDate.getMilliseconds() - dateRangeOut.startDate.getMilliseconds();
    expect(milliSecondsDiff).toBe(0);
  });
});

describe('addDaystoGivenDate()', () => {
  it('should add given days to given date', () => {
    const newDate = addDaysToGivenDate(new Date('2023/02/12'), 1);
    expect(newDate.getTime()).toBe(new Date('2023/02/13').getTime());
  });
});

describe('isWeekDay', () => {
  it('should return true for week days', () => {
    expect(isWeekDay(new Date('2023/02/10'))).toBe(true);
  });

  it('should return false for weekend', () => {
    expect(isWeekDay(new Date('2023/02/12'))).toBe(false);
  });
});
