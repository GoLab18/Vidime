import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(date: string | Date): string {
    if (typeof date === 'string') date = new Date(date);

    let now = new Date();
    let diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    switch (true) {
      case diff < 60:
        return 'just now';
      case diff < 3600:
        let minutes = Math.floor(diff / 60);
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
      case diff < 86400:
        let hours = Math.floor(diff / 3600);
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
      case diff < 604800:
        let days = Math.floor(diff / 86400);
        return days === 1 ? '1 day ago' : `${days} days ago`;
      case diff < 2592000:
        let weeks = Math.floor(diff / 604800);
        return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
      case diff < 31104000:
        let months = Math.floor(diff / 2592000);
        return months === 1 ? '1 month ago' : `${months} months ago`;
      default:
        let years = Math.floor(diff / 31104000);
        return years === 1 ? '1 year ago' : `${years} years ago`;
    }
  }
}
