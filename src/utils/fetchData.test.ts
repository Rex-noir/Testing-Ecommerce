import { describe, expect, test } from "vitest";
import FetchData from "./fetchData";

describe("Getting categories", () => {
  test("Get all categories", async () => {
    const data = await FetchData.getCategories();
    expect(data.response.status).toBe(200);
  });
  test("Get only specified category", async () => {
    const data = await FetchData.getCategories(4);
    expect(data.response.status).toBe(200);
  });
});

describe("Get products", () => {
  test("Get all products", async () => {
    const data = await FetchData.getProducts();
    expect(data.response.status).toBe(200);
  });

  test("Get products by id", async () => {
    const data = await FetchData.getProducts(4);
    console.log(data);
  });

  test("Filter products by title", async () => {
    const data = await FetchData.getProducts(undefined, { title: "Classic" });
    expect(data.response.status).toBe(200);
  });

  test("Filter products by price", async () => {
    const data = await FetchData.getProducts(undefined, { price: 98 });
    expect(data.response.status).toBe(200);
  });

  test("Filter products by priceRange", async () => {
    const data = await FetchData.getProducts(undefined, {
      range: { price_min: 20, price_max: 100 },
    });
    expect(data.response.status).toBe(200);
  });

  test("Filter products by CategoryID", async () => {
    const data = await FetchData.getProducts(undefined, { categoryId: 1 });
    expect(data.response.status).toBe(200);
  });

  test("Filter products by mixing filters", async () => {
    const data = await FetchData.getProducts(undefined, {
      title: "Classic",
      categoryId: 1,
    });
    expect(data.response.status).toBe(200);
  });
});

describe("Get products in a categorie", () => {
  test("Get categorie id 4 products", async () => {
    const data = await FetchData.getProdsByCategoriy(4);
    console.log(data);
    expect(data.response.status).toBe(200);
  });
});

test("Get all users", async () => {
  const data = await FetchData.getAllUsers();
  console.log(data);
  expect(data).toBeInstanceOf(Array);
});
