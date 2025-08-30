"use client";
import Hero from "../components/sections/Hero";
import ProductsContainer from "../components/cards/ProductsContainer";
import Categories from "../components/sections/Categories";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchProducts } from "../redux/productSlice";
import { fetchRecentProducts } from "../redux/recentSclice";

export default function Home() {
  const dispatch = useAppDispatch();

  let products = useAppSelector((state) => state.products.products);
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
      <div className="container px-2 md:px-0 mx-auto">
        {/* new */}
        {recentProducts?.length > 0 && (
          <div className="py-5 md:py-10">
            <h2 className="text-lg text-[var(--title-primary)] font-bold sm:text-3xl tracking-widest mb-10 md:mb-20 ">
              RECENTLY VIEWED
            </h2>
            {/* <ProductsContainer products={recentProducts} /> */}
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
        {/* contact */}
        <section className="py-16 md:pt-24 px-4">
          <div className="grid grid-cols-1     md:grid-cols-2  bg-[#f7f7f7] p-6 pb-0      ">
            <figure>
              <img
                src="/Images/query-mail-image.webp"
                alt="New Arrival"
                className="w-full"
              />
            </figure>
            <div className="self-center justify-self-center sm:justify-self-start py-10">
              <h2 className="text-4xl md:text-5xl mb-5">For any query</h2>
              <p className="mb-10 text-lg w-full sm:w-[70%] text-[var(--para-primary)]">
                If you have any questions or need assistance, feel free to mail
                us.
              </p>
              <h3 className="font-bold text-xl  ">
                giftsandribbons25@gmail.com
              </h3>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
