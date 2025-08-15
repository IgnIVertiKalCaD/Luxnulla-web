import {ShopItemContentType} from "@/types/type/shop-item-content.type";

export function deSerializationContent(content: string): ShopItemContentType {
  try {
    return JSON.parse(content)
  } catch (e) {
    return {
      kits: [],
      opportunity: [],
      nestedCardsId: [],
      isNestedCard: false,
      bonusText: ''
    }
  }
}

export function serializationContent(content: ShopItemContentType): string {
  return JSON.stringify(content)
}
