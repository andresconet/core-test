// /app/api/products/route.ts

import { products } from './bd';
import { NextResponse } from 'next/server';


export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || ''; 

  const filteredProducts = products.filter((product) => {
    const lowerQuery = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowerQuery) || product.sku.toString().includes(lowerQuery)
    );
  });


  if (filteredProducts.length === 0) {
    return new NextResponse(JSON.stringify({ message: 'no se encontraron productos' }), { status: 404 });
  }

  return new NextResponse(JSON.stringify(filteredProducts), { status: 200 });
}
