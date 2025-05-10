import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatViews'
})
export class FormatViewsPipe implements PipeTransform {
  private formatNumber(value: number, divisor: number, suffix: string): string {
    const result = value / divisor;
    return (result % 1 === 0 ? result.toFixed(0) : result.toFixed(1)) + suffix;
  }

  transform(views: number): string {
    if (views < 1_000) return views.toString();
    if (views < 1_000_000) return this.formatNumber(views, 1_000, 'k');
    if (views < 1_000_000_000) return this.formatNumber(views, 1_000_000, 'm');
    return this.formatNumber(views, 1_000_000_000, 'b');
  }
}
