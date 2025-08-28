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
  products = products?.slice(0, 5);
  // let [recentProducts, setRecentProducts] = useState<any[]>([]);
  const recentProducts = useAppSelector(
    (state) => state.recentProducts.products
  );
  products = products?.slice(0, 5);
  useEffect(() => {
    // dispatch(fetchRecentProducts());
    dispatch(fetchRecentProducts());
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Hero />
      <section className="container px-2 md:px-0 mx-auto">
        {/* new */}
        {recentProducts?.length > 0 && (
          <div className="py-5 md:py-10">
            <h2 className="text-lg text-[var(--title-primary)] font-bold sm:text-3xl tracking-widest mb-10 md:mb-20 ">
              RECENTLY VIEWED
            </h2>
            {/* <ProductsContainer products={recentProducts} /> */}
            <ProductsContainer products={recentProducts} designIndex={null} />
          </div>
        )}

        {/*  BROWSE CATEGORIES */}
        <Categories />

        {/*  OUR COLLECTION */}
        <div className="py-5 md:py-10 ">
          <div className="mb-10 md:mb-20">
            <h2 className="text-lg text-[var(--title-primary)] font-bold sm:text-3xl tracking-widest ">
              OUR COLLECTION
            </h2>
          </div>
          <div className="">
            {/* <ProductsContainer products={products} /> */}
            <ProductsContainer products={products} />
          </div>
        </div>
        {/* contact */}
        <div className="py-16 md:py-24 px-4">
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
              {/* <form className="flex flex-col md:flex-row gap-6  ">
                <input
                  type="email"
                  className="w-full h-15 bg-white focus:outline-none p-4"
                  placeholder="Place your query here...."
                />
                <button className="cursor-pointer w-40 bg-black  text-white px-4 py-2 hover:bg-gray-900 transition duration-300">
                  Submit
                </button>
              </form> */}
              <h3 className="font-bold text-xl  ">
                giftsandribbons25@gmail.com
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
