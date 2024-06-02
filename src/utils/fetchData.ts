import { User } from "../interfaces";

export default class FetchData {
  static url = "https://api.escuelajs.co/api/v1";

  static async fetch(url: string): Promise<{ response: Response; json: any }> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { response, json: data };
    } catch (error) {
      console.error("Error during fetch:", error);
      throw error;
    }
  }

  static async getProducts(
    id?: number,
    filter?: {
      title?: string;
      price?: number;
      range?: { price_min: number; price_max: number };
      categoryId?: number;
    },
  ) {
    if (filter) {
      let params = new URLSearchParams();
      if (filter.title) params.append("title", filter.title);
      if (filter.categoryId) {
        params.append("categoryId", String(filter.categoryId));
      }
      if (filter.price) params.append("price", String(filter.price));
      if (filter.range?.price_max) {
        params.append("price_max", String(filter.range.price_max));
      }
      if (filter.range?.price_min) {
        params.append("price_min", String(filter.range.price_min));
      }
      const url = `${this.url}/products/?${params.toString()}`;
      return this.fetch(url);
    }
    const productsUrl = id
      ? `${this.url}/products/${id}`
      : `${this.url}/products`;
    return this.fetch(productsUrl);
  }

  static async getCategories(id?: number) {
    const newUrl = id
      ? `${this.url}/categories/${id}`
      : `${this.url}/categories`;
    return this.fetch(newUrl);
  }

  static getProdsByCategoriy(id: number = 1) {
    const newUrl = `${this.url}/categories/${id}/products`;
    return this.fetch(newUrl);
  }
  static async getAllUsers(): Promise<User[]> {
    return (await fetch("https://api.escuelajs.co/api/v1/users")).json();
  }
}
