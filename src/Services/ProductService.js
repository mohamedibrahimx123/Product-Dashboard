import apiClient from "../Services/apiClient";

export async function getProducts() {
  const response = await apiClient.get("/products");

  return response.data.products;
}

export async function getProductById(id) {
  const response = await apiClient.get(
    `/products/${id}`
  );
  return response.data;
}