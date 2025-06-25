import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatWatchHistoryDate'
})
export class FormatWatchHistoryDatePipe implements PipeTransform {
  private days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  transform(input: string | Date): string {
    const date = input instanceof Date ? input : new Date(input);
    const now = new Date();

    // Stripping time for comparisons
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const diffTime = today.getTime() - inputDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    switch (true) {
      case diffDays === 0:
        return 'Today';
      case diffDays === 1:
        return 'Yesterday';
      case diffDays < 7:
        return this.days[date.getDay()];
      case date.getFullYear() === now.getFullYear():
        return `${this.months[date.getMonth()]} ${date.getDate()}`;
      default:
        return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
  }
}
