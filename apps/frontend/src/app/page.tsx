"use client";
import Hero from "../components/sections/Hero";
import ProductsContainer from "../components/cards/ProductsContainer";
import Categories from "../components/sections/Categories";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchProducts } from "../redux/productSlice";
import { fetchRecentProducts } from "../redux/recentSclice";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Home() {
  const dispatch = useAppDispatch();

  let products = useAppSelector((state) => state.products.products);
  const bestSellers = products?.slice(7, 15);
  products = products?.slice(0, 8);
  const recentProducts = useAppSelector(
    (state) => state.recentProducts.products
  );
  useEffect(() => {
    dispatch(fetchRecentProducts());
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <section>
      <Hero />
      <div className="container lg:max-w-7xl px-2 md:px-6 mx-auto">
        {/* new */}
        {recentProducts?.length > 0 && (
          <div className="py-5 md:py-10">
            <h2 className="text-lg text-[var(--title-primary)] font-bold sm:text-3xl tracking-widest mb-10 md:mb-20 ">
              RECENTLY VIEWED
            </h2>
            <ProductsContainer products={recentProducts} />
          </div>
        )}
        {/*  BROWSE CATEGORIES */}
        <Categories />
        {/*  OUR COLLECTION */}
        <section className="py-5 md:py-10 ">
          <div className="mb-10 md:mb-20">
            <h2 className="text-lg text-[var(--title-primary)] font-bold sm:text-3xl tracking-widest ">
              OUR COLLECTION
            </h2>
          </div>
          <div className="">
            <ProductsContainer products={products} />
          </div>
        </section>
        <section className="py-5 md:py-10 ">
          <div className="mb-10 md:mb-20">
            <h2 className="text-lg text-[var(--title-primary)] font-bold sm:text-3xl tracking-widest ">
              BEST SELLER
            </h2>
          </div>
          <div className="">
            <ProductsContainer products={bestSellers} />
          </div>
        </section>
        <section className="py-5 md:py-10 hidden md:block">
          <div className="grid grid-cols-3 items-center border mb-10">
            <div className="justify-self-center">
              <Link
                href={`/products/${products[6]?._id}`}
                className="font-xl bg-teal-500 text-white px-4 py-2 hover:bg-teal-600"
              >
                Shop Now
              </Link>
            </div>
            <div>
              <img
                src={products[6]?.images?.[1]}
                alt=""
                className="h-100 w-full bg-cover"
              />
            </div>
            <div className="p-10">
              <h2 className="text-2xl font-bold mb-4 tracking-wider uppercase">
                {products[6]?.name}
              </h2>
              <p className="text-xl mb-4 font-medium">
                {products[6]?.category}
              </p>
              <p className="text-[var(--para-primary)] text-lg">
                {products[6]?.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center justify-center border">
            <div className=" p-10">
              <h2 className="text-2xl font-bold mb-4 tracking-wider uppercase">
                {products[3]?.name}
              </h2>
              <p className="text-xl mb-4 font-medium">
                {products[3]?.category}
              </p>
              <p className="text-[var(--para-primary)] text-lg">
                {products[3]?.description}
              </p>
            </div>
            <div className="">
              <img
                src={products[3]?.images?.[0]}
                alt=""
                className="h-100 w-full bg-cover"
              />
            </div>
            <div className="justify-self-center">
              <Link
                href={`/products/${products[3]?._id}`}
                className="font-xl bg-teal-500 text-white px-4 py-2 hover:bg-teal-600"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
