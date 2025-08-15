export class DiscountResponseDto {
  public readonly id!: number;
  public readonly title!: string;
  public readonly itemIds!: number[];
  public readonly startDate?: Date;
  public readonly endDate?: Date;
  public readonly percentage!: number;
}
