export class ResCategoryRules {
  id: number;
  content: string;
  penalty: string;
  categoryId: number;
}

export class ResCreateCategory {
  id!: number;
  title!: string;
  visible!: true;
  updatedAt!: string;
  rules?: ResCategoryRules[];
}
