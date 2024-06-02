export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category; // Reference to the Category interface
  images: string[]; // Array of image URLs
}

interface Category {
  id: number;
  name: string;
  image: string; // URL of the category image
}
