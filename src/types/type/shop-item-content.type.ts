export type ContentItemType = {
  id: number;
  text: string
  imagePath?: string;
}

export type ContentKeyDtoArray = ContentItemType[]

export type ShopItemContentType = {
  kits: ContentKeyDtoArray;
  opportunity: ContentKeyDtoArray;
  nestedCardsId: number[];
  isNestedCard: boolean;
  bonusText: string;
}
