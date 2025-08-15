import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "currencyName",
})
export class CurrencyNamePipe implements PipeTransform {
  private currencyMap: { [key: string]: string } = {
    RUB: "Русский рубль, RUB",
    UAH: "Гривна, UAH",
    USD: "Доллар США, USD",
    USDT: "Криптовалюта USDT, USDT",
    EUR: "Евро, EUR",
    BYN: "Белорусский рубль, BYN",
    PLN: "Злоты, PLN",
    KZT: "Тенге, KZT",
    TRY: "Лира, TRY",
    AED: "Дирхам, AED",
    ETH: "Криптовалюта ETH, ETH",
    BTC: "Криптовалюта BTC, BTC",
    LTC: "Криптовалюта LTC, LTC",
  };

  transform(currencyCode: string | null | undefined): string {
    if (!currencyCode) {
      return "";
    }
    const upperCaseCode = currencyCode.toUpperCase();
    return (
      this.currencyMap[upperCaseCode] || `${upperCaseCode}, ${upperCaseCode}`
    );
  }
}
