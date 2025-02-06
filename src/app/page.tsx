"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@heroui/react";
import ProductCard from "@/shared/productCard/productCard";
import CircularLoading from "@/shared/circularLoading";
import { Product } from "./lib/types";
import { SearchIcon } from "./lib/utils/icons/searchIcon";


export default function App() {
  const [query, setQuery] = useState<string>(""); 
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>(""); 
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);


  useEffect(() => {
    if (debouncedQuery) {
      fetchProducts();
    } else {
      setProducts([]); 
    }
  }, [debouncedQuery]); 
  
  useEffect(() => {
    setQuery("note");
  }, []);

  const fetchProducts = async () => {
    setLoading(true); 
    setError(""); 
    try {
      const response = await fetch(`/api/products?query=${debouncedQuery}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        setProducts(data); 
      } else {
        setProducts([]); 
        setError("Producto no encontrado"); 
      }
    } catch (error) {
      setError("Hubo un error - Intentalo más tarde"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-[800px] h-[140px] px-8 mx-auto mt-6 rounded-2xl flex justify-center items-center bg-transparent">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          isClearable
          classNames={{
            label: "text-black dark:text-white/800",
            input: [
              "bg-transparent",
              "text-black dark:text-white/90",
              "placeholder:text-default-700/100 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          label=""
          placeholder="Buscar producto..."
          radius="lg"
          startContent={
            <SearchIcon className="text-black/100 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      
      </div>
      <small className="text-tiny">Términos de busqueda: oppo, Samsung, htc, note, galaxy ...</small>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 py-5">
        {products.length > 0 &&
          products.map((product) => <ProductCard key={product.sku} product={product} />) 
        }
      </div>

      {loading && <CircularLoading />}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
}
