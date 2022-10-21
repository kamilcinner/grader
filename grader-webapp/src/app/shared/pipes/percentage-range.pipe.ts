import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentageRange',
})
export class PercentageRangePipe implements PipeTransform {
  transform(range: [number, number]): string {
    const [from, to] = range;
    return `${from}% - ${to}%`;
  }
}
