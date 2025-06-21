import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFileSize'
})
export class FormatFileSizePipe implements PipeTransform {
  private sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  transform(value?: number | null): string {
    if (value == null || isNaN(value) || value < 0) return 'N/A';
    if (value === 0) return '0 Bytes';

    const i = Math.floor(Math.log(value) / Math.log(1024));
    const size = value / Math.pow(1024, i);
    const formattedSize = size >= 10 ? Math.round(size) : size.toFixed(1);

    return `${formattedSize} ${this.sizes[i]}`;
  }

}
