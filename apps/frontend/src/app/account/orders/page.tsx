"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import OrderItems from "apps/frontend/src/components/cards/orderItems";
import { getAllOrders } from "apps/frontend/src/serviceProvider/orderServieces";
import { GoDotFill } from "react-icons/go";

export default function Order() {
  // const ordersDetails = await orders.getAllOrders();
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const getOrders = async () => {
    try {
      const data = await getAllOrders();
      const orderList = data ?? [];
      setOrdersDetails(orderList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="m-4">
      {ordersDetails?.length > 0 ? (
        ordersDetails
          .map((item: any) => <OrderItems item={item} key={item._id} />)
          .slice((currentPage - 1) * 3, currentPage * 3)
      ) : (
        <h1 className="text-4xl mt-4">No orders</h1>
      )}

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
  );
}
