import { useState, useEffect } from "react";
import { getProducts } from "../Services/ProductService";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(function () {
    let ignore = false;

    getProducts()
      .then(function (data) {
        if (ignore) return;
        setProducts(data);
        setLoading(false);
      })
      .catch(function (err) {
        if (ignore) return;
        console.error(err);
        setError("Failed to load products");
        setLoading(false);
      });

    return function () {
      ignore = true;
    };
  }, []);

  return { products, loading, error };
}