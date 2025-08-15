export enum Currency {
  /** Российский рубль */
  RUB = 'RUB',

  /** Гривна */
  UAH = 'UAH',

  /** Доллар США */
  USD = 'USD',

  /** Криптовалюта USDT */
  USDT = 'USDT',

  /** Евро */
  EUR = 'EUR',

  /** Белорусский рубль */
  BYN = 'BYN',

  /** Злоты */
  PLN = 'PLN',

  /** Тенге */
  KZT = 'KZT',

  /** Лира */
  TRY = 'TRY',

  /** Дирхам */
  AED = 'AED',

  /** Криптовалюта ETH */
  ETH = 'ETH',

  /** Криптовалюта BTC */
  BTC = 'BTC',

  /** Криптовалюта LTC */
  LTC = 'LTC',
}

export type CurrencyKey = keyof typeof Currency;
