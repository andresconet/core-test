export interface Product {
    sku: number;
    name: string;
    description: string;
    image: string;
    category: { id: number; name: string };
    brand: string;
    price: number;
    stock: number;
    specifications: { name: string; value: string }[];
  }
  