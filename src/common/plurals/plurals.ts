import { TranslateService } from '@ngx-translate/core';

export function getMonthMapping(translate: TranslateService): { [k: string]: string } {
  return {
    '=1': translate.instant('itemCard.month_1'),
    '=2': translate.instant('itemCard.month_2_1'),
    '=3': translate.instant('itemCard.month_2_2'),
    '=4': translate.instant('itemCard.month_2_3'),
    'other': translate.instant('itemCard.month_other')
  };
}

export function getCountMapping(translate: TranslateService): { [k: string]: string } {
  return {
    'other': translate.instant('itemCard.count_other')
  };
}
