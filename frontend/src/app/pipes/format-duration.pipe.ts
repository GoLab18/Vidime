import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  transform(value: number): string {
    const secondsFromMillis = Math.floor(value / 1000);
    const hours = Math.floor(secondsFromMillis / 3600);
    const minutes = Math.floor((secondsFromMillis % 3600) / 60);
    const seconds = secondsFromMillis % 60;

    const minutesStr = minutes.toString().padStart(hours > 0 ? 2 : 1, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return hours > 0
      ? `${hours}:${minutesStr}:${secondsStr}`
      : `${minutes}:${secondsStr}`;
  }
}
