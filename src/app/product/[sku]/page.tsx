"use client";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { Image, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { Product } from "@/app/lib/types";
import CircularLoading from "@/shared/circularLoading";
import { Backarrow } from "@/app/lib/utils/icons/backArrow";


export default function ProductPage() {

  const params = useParams();
  const sku = params?.sku as string;

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products?query=${sku}`);
      const data = await response.json();
      setProduct(data[0]);
      setIsLoading(false);
    };
    fetchProduct();
  }, [sku]);



  const handleGoBack = () => {
    window.history.back()
  }

  if (isLoading) return <div className="mt-5"><CircularLoading /></div>;
  if (!product) return notFound();

  return (
    <div>
      <div className="flex mt-6">
        <button onClick={handleGoBack} className="flex items-center gap-2">
          <Backarrow />
          Volver
        </button>
      </div>

      <div className="flex gap-10 mt-10">

        <div className="w-full">
          <Image
            alt={product.name}
            className="object-cover rounded-xl"
            src={product.image}
            width={600}
          />
        </div>

        <div className="flex h-full w-full flex-col gap-5 px-5  md:justify-center md:gap-9 md:px-0">
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="text-sm font-semibold tracking-widest text-orange uppercase">
              {product.brand}
            </div>
            <div className="text-3xl font-bold md:text-5xl">{product.name}</div>
          </div>
          <div className="text-small leading-loose text-dark-grayish-blue">
            {product.description}
          </div>

          <div>
          <div className="text-sm font-semibold tracking-widest text-orange">
             Especificaciones
           </div>
          {product.specifications.map(spec => {
            return (
              <div className="text-small leading-loose text-dark-grayish-blue" key={spec.name}>
                {spec.name} | {spec.value}
              </div>
            );
          })}
          </div>

          <div className="flex w-full justify-between md:flex-col">
            <div className="flex items-center gap-5">
              <div className="text-3xl text-red-500 font-bold">${product.price}</div>
            </div>

          </div>
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <Button onClick={()=>{alert("¡producto añadido!")}} className="flex h-12 w-full font-bold text-white md:w-2/5 " color="primary">
              <div>Añadir al carrito</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
