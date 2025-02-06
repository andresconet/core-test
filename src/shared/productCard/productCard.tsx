import React from "react";
import Link from "next/link";
import { Card, CardBody, Image, Button } from "@heroui/react";
import { Product } from "@/app/lib/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card key={product.sku} className="max-w-[290px] py-4">
      <CardBody className="overflow-visible py-2">
        <Image
          alt={product.name}
          className="object-cover rounded-xl"
          src={product.image}
          width={270}
        />
        <p className="text-tiny mt-2">{product.brand}</p>
        <h4 className="font-bold text-large">{product.name}</h4>
        <p className="text-tiny uppercase font-bold">{product.category.name}</p>
        <small className="text-tiny mt-1">SKU: {product.sku}</small>
        <p className="font-bold text-red-500 mt-2">S/ {product.price}</p>

        <div className="flex gap-5 mt-6">
          <Button color="primary" radius="full">
            Agregar al carrito
          </Button>
          <Link href={`/product/${product.sku}`}>
            <Button radius="full" variant="bordered" color="primary">
              Ver detalles
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
