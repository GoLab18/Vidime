import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  transform(value: number): string {
    let hours = Math.floor(value / 3600);
    let minutes = Math.floor((value % 3600) / 60);
    let seconds = value % 60;

    let minutesStr = minutes.toString().padStart(hours > 0 ? 2 : 1, '0');
    let secondsStr = seconds.toString().padStart(2, '0');

    return hours > 0
      ? `${hours}:${minutesStr}:${secondsStr}`
      : `${minutes}:${secondsStr}`;
  }
}
