export class CroppedRule {
  content?: string;
  penalty?: string;
}
export class CreateCategory {
  public title!: string;
  public readonly visible!: boolean;
  public readonly croppedRules?: CroppedRule[];
}
