import { Injectable, signal, inject } from "@angular/core";
import {StorageManagerService} from "@/common/storage/storage-manager.service";
import {Language, TranslateService} from "@ngx-translate/core";
import {BehaviorSubject, defer} from "rxjs";
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {Request} from 'express';
import {Currency} from "@/types/enums/currency.enum";
import translationsRU from '@/locale/ru.json';
import translationsUA from '@/locale/ua.json';
export type AvailableLanguageType = "ua" | "ru";
export type AvailableCurrencyType = keyof typeof Currency;

// const languageToCurrencyMap: Record<
//   AvailableLanguageType,
//   AvailableCurrencyType
// > = {
//   ua: "UAH",
//   ru: "RUB",
// };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private request = inject<Request>(REQUEST, { optional: true });


  private getHeader(headerName: string): string | null {
    if (this.request && this.request.headers) {
      const headerValue = this.request.headers[headerName];
      if (Array.isArray(headerValue)) {
        return headerValue[0];
      }
      return headerValue || null;
    }
    return null;
  }

  public detectCurrencyFromHttpHeader(): string | null {
    return this.getHeader('x-preferred-currency');
  }

  public detectLangFromHttpHeader(): string | null {
    return this.getHeader('x-user-lang');
  }
}

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly storageManagerService = inject(StorageManagerService);
  private readonly dataService = inject(DataService);

  private lang: BehaviorSubject<AvailableLanguageType> =
    new BehaviorSubject<AvailableLanguageType>("ru");
  private currency = signal(Currency.RUB)

  constructor() {
    this.translateService.setTranslation("ru", translationsRU);
    this.translateService.setTranslation("ua", translationsUA);

    this.init();
  }

  init() {
    defer(() => this.buildCurrentLang()).subscribe((el) => this.lang.next(el));

    defer(() => this.buildCurrentCurrency()).subscribe((el) =>
      this.currency.set(el),
    );
  }

  private async buildCurrentCurrency(): Promise<Currency> {
    const storedCurrency = this.storageManagerService.get({
      type: "localStorage",
      key: "currency",
    }) as AvailableCurrencyType;

    if (storedCurrency) return Currency[storedCurrency];

    const currencyFromHttpParam =
      this.dataService.detectCurrencyFromHttpHeader() as AvailableCurrencyType;
    if (currencyFromHttpParam) return Currency[currencyFromHttpParam];

    return Currency.USD;
  }

  private async buildCurrentLang(): Promise<AvailableLanguageType> {
    const ls = this.storageManagerService.get({
      type: "localStorage",
      key: "lang",
    }) as AvailableLanguageType | null;
    if (ls) {
      this.changeLanguage(ls);
      return ls;
    }

    const langFromHeader =
      this.dataService.detectLangFromHttpHeader() as AvailableLanguageType;
    if (langFromHeader) {
      this.changeLanguage(langFromHeader);
      return langFromHeader;
    }

    const defaultLang =
      this.translateService.getFallbackLang() as AvailableLanguageType;
    this.changeLanguage(defaultLang);
    return defaultLang;
  }

  get selectCurrentLanguageCurrency() {
    return this.currency;
  }

  get selectCurrentLanguage() {
    return this.lang;
  }

  get selectAllAvailableLanguages(): readonly Language[] {
    return this.translateService.getLangs();
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.storageManagerService.save({
      type: "localStorage",
      key: "lang",
      payload: lang,
    });
  }

  set setCurrency(currency: AvailableCurrencyType) {
    if (!this.currency) return;

    this.storageManagerService.save({
      type: "localStorage",
      key: "currency",
      payload: currency,
    });

    this.currency.set(Currency[currency]);
  }
}
