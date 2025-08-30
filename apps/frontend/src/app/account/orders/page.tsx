"use client";

import { useState, useEffect } from "react";
import OrderItems from "apps/frontend/src/components/cards/orderItems";
import { getAllOrders } from "apps/frontend/src/serviceProvider/orderServieces";
import { CgSpinnerTwo } from "react-icons/cg";
import { toast } from "sonner";
import { Button } from "apps/frontend/src/components/ui/button";
import Link from "next/link";
export interface OrderProduct {
  productId: string;
  productName: string;
  productDescription: string;
  category: string;
  actualPrice: number;
  quantity: number;
  images: string[];
}

export interface Order {
  _id: string; // orderId
  userId: string;
  firstName: string;
  lastName: string;
  address: string;
  mobile: string;
  extension?: string;
  orderedAt: Date | string;
  status: string;
  paymentStatus: string;
  priceInOrder: number;
  totalAmount: number;
  totalQuantity: number;
  products: OrderProduct[];
}
export default function Order() {
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const getOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      const orderList = data ?? [];
      setOrdersDetails(orderList);
      setLoading(false);
    } catch (error) {
      toast(`${error} has occured`);
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section className="relative m-4">
      {!loading ? (
        ordersDetails?.length > 0 ? (
          <div>
            {ordersDetails
              .map((item: Order) => <OrderItems item={item} key={item._id} />)
              .slice((currentPage - 1) * 3, currentPage * 3)}
            <div className="flex items-center justify-center gap-6">
              <button
                className="p-2 text-yellow-600 cursor-pointer font-semibold"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <p className="font-semibold">
                {currentPage} of {Math.ceil(ordersDetails.length / 3)}
              </p>
              <button
                className="p-2 text-yellow-600 cursor-pointer font-semibold"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(ordersDetails.length / 3))
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="col-span-6 h-150 flex flex-col items-center">
            <h2 className="text-center text-[var(--title-primary)] font-bold text-2xl mt-20 mb-4">
              No orders found
            </h2>
            <p className="mb-5 text-center text-gray-500 text-xl">
              Add items that you like into the wishlist
            </p>
            <Link
              href="/products"
              className="font-xl bg-teal-500 text-white px-4 py-2 hover:bg-teal-600"
            >
              Continue Shopping
            </Link>
          </div>
        )
      ) : (
        <div className="w-full flex h-screen justify-center ">
          <CgSpinnerTwo
            size={50}
            className="animate-spin text-teal-600 mt-16"
          />
        </div>
      )}
    </section>
  );
}
