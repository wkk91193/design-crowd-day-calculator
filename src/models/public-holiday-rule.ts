import { DayOfWeek, Occurrence } from '../@types/day-counter';
import { addDaystoGivenDate } from '../utils/day-counter-utils';

export class PublicHolidayRule {
  private dayOfWeek: DayOfWeek = DayOfWeek.Sunday;
  private occurrence: Occurrence = Occurrence.First;
  private day: number = 0;
  private month: number = 0;
  private shouldDelay: boolean = false;

  //fixed day public holiday ,and should delay if it falls on a weekend
  public static fromFixedPublicHolidayAndAllowedToDelayRule(
    month: number,
    day: number,
    shouldDelay: boolean
  ): PublicHolidayRule {
    if (day < 1 || day > 31) {
      throw new Error('Invalid day');
    }
    if (month < 1 || month > 12) {
      throw new Error('Invalid month');
    }
    //validating dates for non leap year
    if (Number.isNaN(Date.parse(`2013/${month}/${day}`))) {
      throw new Error('Invalid month and date combination');
    }
    const publicHolidayRule = new PublicHolidayRule();
    publicHolidayRule.day = day;
    publicHolidayRule.month = month;
    publicHolidayRule.shouldDelay = shouldDelay;
    return publicHolidayRule;
  }

  //occurrence of day of a week in specific month
  public static fromOccurrenceOfADayOfASpecificMonth(
    dayOfWeek: DayOfWeek,
    occurrence: Occurrence,
    month: number
  ): PublicHolidayRule {
    if (month < 1 || month > 12) {
      throw new Error('Invalid month');
    }
    const publicHolidayRule = new PublicHolidayRule();
    publicHolidayRule.dayOfWeek = dayOfWeek;
    publicHolidayRule.occurrence = occurrence;
    publicHolidayRule.month = month;
    return publicHolidayRule;
  }

  //Returns date of the occurence of a specific day of week
  private getOccurenceOfDayInMonth(year: number, month: number, occurence: Occurrence, dayOfWeek: DayOfWeek): Date {
    let firstDayOfTheMonth = new Date(`${year}/${month}/01`);
    let firstOccurenceOfDay =
      firstDayOfTheMonth.getDay() === dayOfWeek.valueOf()
        ? firstDayOfTheMonth
        : addDaystoGivenDate(
            firstDayOfTheMonth,
            Math.abs(this.dayOfWeek.valueOf() - firstDayOfTheMonth.getDay())
          );
    return addDaystoGivenDate(firstOccurenceOfDay, 7 * occurence.valueOf());
  }

  public getPublicHolidayDateFromYear(year: number): Date {
    //if day of week occurence rule
    if (this.day === 0) {
      return this.getOccurenceOfDayInMonth(year, this.month, this.occurrence, this.dayOfWeek);
    } else {
      //fixed or shouldDelay rule
      let date = new Date(`${year}/${this.month}/${this.day}`);
      if (this.shouldDelay) {
        //if date falls on weekend
        if (date.getDay() === DayOfWeek.Saturday || date.getDay() === DayOfWeek.Sunday) {
          const daysUntilMonday = (DayOfWeek.Monday - date.getDay() + 7) % 7;
          date = addDaystoGivenDate(date, daysUntilMonday);
        }
      }
      return date;
    }
  }
}


