import {ItemType} from "@/types/enums/item-type.enum";
import {Currency} from "@/types/enums/currency.enum";
import {DiscountResponseDto} from "@/types/rdo/discount.rdo";

type MappedPrices = Record<keyof typeof Currency, number>;

export type Prices = MappedPrices & { discounted?: MappedPrices };

export class ShopCategoryRdo {
  public readonly id!: number;
  public readonly title!: string;
  public readonly visible!: boolean;
  public readonly updatedAt!: Date;
  public readonly items!: ShopItemRdo[];
}

export class ShopItemRdo {
  public readonly id!: number;
  public type!: ItemType;
  public readonly price!: number;
  public readonly currency!: Currency;
  public readonly prices!: Prices;
  public readonly title!: string;
  public readonly imageUrl?: string;
  public readonly categoryId!: number;
  public readonly isActive!: boolean;
  public readonly autoGrant!: boolean;
  public content!: string;
  public readonly grantCommands!: string[];
  public readonly discount?: DiscountResponseDto;
  public readonly quantity?: number;
  public readonly serverId?: number;
}
