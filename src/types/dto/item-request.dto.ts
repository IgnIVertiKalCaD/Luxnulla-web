import {ItemType} from "@/types/enums/item-type.enum";
import {Currency} from "@/types/enums/currency.enum";

export class ItemRequestDto {
  grantCommands: string[];
  type: ItemType;
  autoGrant: boolean;
  isActive: boolean;
  title: string;
  content: string;
  serverId: number;
  price: number;
  currency: Currency;
  discountId: number;
  quantity: number;
}
