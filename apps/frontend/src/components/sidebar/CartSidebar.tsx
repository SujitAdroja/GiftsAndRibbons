"use client";
import { useEffect, useState } from "react";

import { fetchCart, toggleSidebar } from "apps/frontend/src/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "apps/frontend/src/redux/hook";
import Link from "next/link";
import CartCard from "../cards/CartCard";
import { ProductCardSkeleton } from "../cards/ProductCardSkeleton";

export default function CartSideBar() {
  const [loading, setLoading] = useState(false);
  const { cartItems } = useAppSelector((state: any) => state.cart.cart);
  const { sidebarOpen } = useAppSelector((state: any) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCart()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-200 opacity-30 z-40 transition-all duration-300 "
          onClick={() => dispatch(toggleSidebar(false))}
        ></div>
      )}
      <div
        className={`p-4 fixed top-0 right-0 h-full md:w-90 flex flex-col gap-6 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Cart</h3>
          <button
            className="text-black hover:underline cursor-pointer text-xs"
            onClick={() => dispatch(toggleSidebar(false))}
          >
            Close
          </button>
        </div>
        <div className="cartItems-container h-[92%] overflow-auto scrollbar-hide flex flex-col">
          {cartItems?.length > 0 ? (
            cartItems?.map((item: any) => (
              <CartCard key={item.productId} {...item} />
            ))
          ) : (
            <div className=" flex flex-col items-center justify-center h-full">
              <p className="text-center self-center justify-self-center text-2xl mb-5">
                No items in cart
              </p>
              <Link
                href="/products"
                className="font-xl bg-teal-500 text-white px-4 py-2 hover:bg-teal-600"
                onClick={() => dispatch(toggleSidebar(false))}
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
        {loading ? (
          <>
            <ProductCardSkeleton width="50" />
            <ProductCardSkeleton width="50" />
            <ProductCardSkeleton width="50" />
          </>
        ) : (
          cartItems?.length > 0 && (
            <div className="flex justify-center items-center px-4 mt-auto mb-4">
              <Link
                href={"/payment"}
                className="bg-black text-center text-white px-4 py-2 w-full cursor-pointer hover:bg-gray-800 trasition-all duration-200"
                onClick={() => {
                  dispatch(toggleSidebar(false));
                }}
              >
                Checkout
              </Link>
            </div>
            // <div className="flex justify-center items-center px-4 mt-auto mb-4">
            //   <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            //   <button
            //     onClick={() => {
            //       handleRazorpayPayment(totalPrice);
            //     }}
            //     className="bg-black  text-white  px-4 py-2 w-full cursor-pointer hover:bg-gray-800 trasition-all duration-200"
            //   >
            //     pay {totalPrice}
            //   </button>
            // </div>
          )
        )}
      </div>
    </>
  );
}
