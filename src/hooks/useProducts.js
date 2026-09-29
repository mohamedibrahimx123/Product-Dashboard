import { useState, useEffect } from "react";
import { getProducts } from "../services/ProductService";

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetching the products

  useEffect(function () {
    getProducts()
      .then(function (data) {
        setProducts(data);
        setLoading(false);
      })

      .catch(function (error) {
        console.error(error);
        setError("Failed to load products");
        setLoading(false);
      })
  }, [])

  return {
    products,
    loading,
    error
  }
}