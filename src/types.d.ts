export interface ApiTransaction {
    category: string;
    amount: number;
    createdAt: string;
}

export interface Transaction extends ApiTransaction {
    id: string;
}

export interface ApiTransactions {
    [id: string]: ApiTransaction;
}

export interface ApiCategory {
    type: 'income' | 'expense';
    name: string;
}

export interface Category extends ApiCategory {
    id: string;
}

interface ApiCategories {
    [key: string]: ApiCategory;
  }