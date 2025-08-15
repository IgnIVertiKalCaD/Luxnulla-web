import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateOffset',
  standalone: true
})
export class DateOffsetPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {

    const differentDate = Math.abs(
      new Date(value).getUTCDate() - new Date().getUTCDate()
    )

    // console.log(new Date().getDate())

    return String(differentDate + " дня");
  }

}
