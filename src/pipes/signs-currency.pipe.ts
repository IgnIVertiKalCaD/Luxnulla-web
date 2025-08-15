import {Pipe, PipeTransform} from '@angular/core';

enum SignsValues {
  RUB = 'руб',
  UAH = 'грн',
  USD = '$',
  USDT = 'USDT',
  EUR = 'EUR',
  BYN = 'BYN',
  PLN = 'PLN',
  KZT = 'KZT',
  TRY = 'TRY',
  AED = 'AED',
  ETH = 'ETH',
  BTC = 'BTC',
  LTC = 'LTC',
}

@Pipe({
  name: 'currency',
  standalone: true,
})
export class SignsCurrencyPipe implements PipeTransform {
  public transform(value: keyof typeof SignsValues) {
    return String(SignsValues[value])
  }
}
