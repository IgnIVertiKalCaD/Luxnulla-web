export class Rule {
  id: number;
  index?: number;
  created?: boolean;
  modified?: boolean;
  content: string;
  penalty?: string;
  categoryId?: number;
}

export class CategoryRules {
  id: number;
  readonly title: string;
  visible: boolean;
  readonly updatedAt: string;
  rules?: Rule[];
}
