import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
  private formatNum(value: number, divisor: number, suffix: string): string {
    const result = value / divisor;
    return (result % 1 === 0 ? result.toFixed(0) : result.toFixed(1)) + suffix;
  }

  transform(value: number, singularForm: string, pluralForm: string): string {
    if (value < 1_000) return `${value.toString()} ${value === 1 ? singularForm : pluralForm}`;
    if (value < 1_000_000) return this.formatNum(value, 1_000, 'k ' + pluralForm);
    if (value < 1_000_000_000) return this.formatNum(value, 1_000_000, 'm ' + pluralForm);
    return this.formatNum(value, 1_000_000_000, 'b ' + pluralForm);
  }
}
