"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { findOrder } from "apps/frontend/src/serviceProvider/orderServieces";

type Products = {
  productId: string;
  productName: string;
  category: string;
  actualPrice: number;
  productDescription: string;
  quantity: number;
  images: string[];
};

type OrderItem = {
  _id?: string;
  payment_id?: string;
  priceInOrder?: number;
  actualPrice?: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  orderedAt?: Date;
  status?: string;
  products?: Products[];
  totalQuantity?: number;
  totalAmount?: number;
  paymentStatus?: string;
};

// export default function OrderDetails({ params }: { params: { id: string } }) {
export default function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [orderItem, setOrderItem] = useState<OrderItem>({});

  async function findProduct() {
    try {
      const orderId = (await params).id;
      const data = await findOrder(orderId);
      console.log(data, "from order[id]");
      const address =
        data.address?.addressLine1 +
        ", " +
        data.address?.addressLine2 +
        ", " +
        data.address?.city +
        ", " +
        data.address?.state +
        ", " +
        data.address?.pincode;

      data.address = address;
      data.orderedAt = data.orderedAt
        ? new Date(data.orderedAt).toDateString()
        : undefined;
      console.log(data);
      setOrderItem(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  useEffect(() => {
    findProduct();
  }, [findProduct]);

  return (
    <section className="m-4 border bg-[#f7f7f7] p-4 sm:shadow-md">
      <div className="text-sm mb-5">
        <div className="flex flex-wrap justify-between items-center">
          <h3 className="text-black font-semibold">
            Order ID: {orderItem._id}
          </h3>
          <h3 className="text-black font-semibold">
            Ordered Items ({orderItem.products?.length})
          </h3>
        </div>
        <hr className="my-4" />

        <div className="ordered_item_list flex flex-col gap-4 mb-4">
          {orderItem.products &&
            orderItem.products?.map((product: Products) => (
              <Link
                href={`/products/${product.productId}`}
                key={product.productId}
                className="order-items-container p-2 bg-white flex gap-4 items-start"
              >
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className="w-1/10 sm:1/10"
                />
                <div>
                  <p className="text-[var(--para-primary)] text-[10px]">
                    {product.category}
                  </p>
                  <p className="text-md font-semibold text-black">
                    {product.productName}
                  </p>
                  <p className="text-md text-[var(--para-primary)]">
                    {product?.productDescription
                      ?.split(" ")
                      .slice(0, 8)
                      .join(" ")}
                    ...
                  </p>
                </div>
              </Link>
            ))}
        </div>
        {/* order summary */}
        <div className="text-sm mb-4 border-b">
          <h3 className="text-black mb-4 font-semibold">Order Summery</h3>
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between">
              <p>Payment Id:</p>
              <p className="text-blue-800">{orderItem.payment_id}</p>
            </div>
            <div className="mb-1 flex items-center justify-between">
              <p>Order Status:</p>
              <p className="text-blue-800 uppercase text-green-800 font-bold">
                {orderItem?.paymentStatus}
              </p>
            </div>

            <div className="mb-1 flex items-center justify-between">
              <p>Order Placed:</p>
              <p className="text-black">
                {orderItem.orderedAt
                  ? new Date(orderItem.orderedAt).toDateString()
                  : ""}
              </p>
            </div>

            <div className="mb-1 flex items-center justify-between">
              <p>Total Products:</p>
              <p className="text-black">{orderItem.totalQuantity}</p>
            </div>

            <div className="text-black text-lg flex items-center justify-between font-semibold">
              <h3>Total (INR)</h3>
              <h3>&#8377; {orderItem.totalAmount}</h3>
            </div>
          </div>
        </div>
        {/* shipping information */}
        <div className="shipping_info w-full">
          <h3 className="text-black font-semibold mb-4">
            Shipping Information
          </h3>

          <h4 className="text-black font-semibold">
            {orderItem.firstName} {orderItem.lastName}
          </h4>
          <p className="">{orderItem.address}</p>
        </div>
      </div>
    </section>
  );
}
