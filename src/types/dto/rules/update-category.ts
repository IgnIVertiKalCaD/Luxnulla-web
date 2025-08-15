import {CroppedRule} from "@/types/dto/rules/create-category";

export class UpdateCategory {
  public title!: string;
  public readonly visible!: boolean;
  public readonly croppedRules?: CroppedRule[];
}


