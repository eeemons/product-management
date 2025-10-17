
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description: string | null;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}
