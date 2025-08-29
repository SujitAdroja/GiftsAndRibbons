"use client";
import { Product } from "../../redux/productSlice";
import ProductCard from "./productCard";

export default function ProductsContainer({
  products,
  designIndex = -1,
}: {
  products: Product[];
  designIndex?: number;
}) {
  return (
    <div className="px-4 w-full flex gap-6 overflow-scroll no-scrollbar md:overflow-visible md:grid md:grid-cols-4 md:gap-x-5 md:gap-y-5 lg:grid-cols-5 lg:gap-10 xl:gap-x-8">
      {(products || [])?.map((product: Product, index) => (
        <ProductCard
          product={product}
          key={product._id}
          width={"min-w-[200px] md:min-w-auto"}
        />
      ))}
    </div>
  );
}
