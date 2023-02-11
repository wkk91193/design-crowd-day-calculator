import { DateRange, DayOfWeek, Occurrence, PublicHolidaysOnCertainOccurrencesRules } from '../@types/day-counter';
import BusinessDayCounterOnCertainOccurrenceService from './business-day-counter-on-certain-occurrence-service';

describe('BusinessDayCounterOnCertainOccurrenceService()', () => {
  let businessDayCounterOnCertainOccurrenceService: BusinessDayCounterOnCertainOccurrenceService;
  beforeEach(() => {
    businessDayCounterOnCertainOccurrenceService = new BusinessDayCounterOnCertainOccurrenceService();
  });

  describe('getCountOfBusinessDays', () => {

    it('should return 0 when endDate is smaller than startDate', () => {

      const dateRange: DateRange = {
          startDate: new Date('2020/06/28'),
          endDate: new Date('2020/06/15'),
        };
      
      const onCertainOccurrenceRule :PublicHolidaysOnCertainOccurrencesRules = {
          month:6,
          dayOfWeek:DayOfWeek.Monday,
          occurrence: Occurrence.Second,
      }
      expect(businessDayCounterOnCertainOccurrenceService.getCountOfBusinessDays(dateRange, [onCertainOccurrenceRule])).toBe(0);
    });
    it('should return number of business days when occurence not between the start and end dates', () => {

        const dateRange: DateRange = {
            startDate: new Date('2020/06/15'),
            endDate: new Date('2020/06/28'),
          };
        
        const onCertainOccurrenceRule :PublicHolidaysOnCertainOccurrencesRules = {
            month:6,
            dayOfWeek:DayOfWeek.Monday,
            occurrence: Occurrence.Second,
        }
        expect(businessDayCounterOnCertainOccurrenceService.getCountOfBusinessDays(dateRange, [onCertainOccurrenceRule])).toBe(9);
    });
  
      it('should return number of business days when occurence between the start and end dates', () => {

        const dateRange: DateRange = {
            startDate: new Date('2020/06/15'),
            endDate: new Date('2020/06/28'),
          };
        
          const onCertainOccurrenceRule :PublicHolidaysOnCertainOccurrencesRules = {
            month:6,
            dayOfWeek:DayOfWeek.Monday,
            occurrence: Occurrence.Fourth,
        }
        expect(businessDayCounterOnCertainOccurrenceService.getCountOfBusinessDays(dateRange, [onCertainOccurrenceRule])).toBe(8);
      });

      it('should return number of business days when dayOfWeek of the first day of the month is not equal to what is given', () => {

        const dateRange: DateRange = {
            startDate: new Date('2020/06/15'),
            endDate: new Date('2020/06/28'),
          };
        
        const onCertainOccurrenceRule :PublicHolidaysOnCertainOccurrencesRules = {
            month:6,
            dayOfWeek:DayOfWeek.Tuesday,
            occurrence: Occurrence.Second,
        }
        expect(businessDayCounterOnCertainOccurrenceService.getCountOfBusinessDays(dateRange, [onCertainOccurrenceRule])).toBe(9);
    });
  });
});
