"use client";
import { config } from "apps/frontend/config";
import Script from "next/script";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Link from "next/link";
import ProductCard from "../../components/cards/productCard";
import { useEffect } from "react";
import { fetchProducts, Product } from "../../redux/productSlice";
import { CgClose } from "react-icons/cg";
import { checkoutCartItems, removeItemFromCart } from "../../redux/cartSlice";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
declare global {
  interface Window {
    Razorpay: any;
  }
}
interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
export default function Payment() {
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart.cart);
  const { user } = useAppSelector((state) => state.user);
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  async function handleRazorpayPayment() {
    try {
      const response = await fetch(
        `${config.BACKEND_ENDPOINT}/razorpay-payment`,
        {
          method: "POST",
          body: JSON.stringify({ amount: totalPrice }),
        }
      );
      const data = await response.json();
      const options = {
        key: config.RAZORPAY_ID,
        amount: totalPrice * 100,
        currency: "INR",
        name: "Gift's And Ribbon's",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.orderId,
        handler: async function (response: RazorpayPaymentResponse) {
          await dispatch(
            checkoutCartItems({
              payment_id: response.razorpay_payment_id,
              paymentStatus: "Paid",
            })
          );
          toast("Payment Completed Successfully", {
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
          });
          router.push("/account/orders");
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.mobile,
        },

        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failure", function () {
        toast("Payment Failed Try Again", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      });

      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemove(productId: string) {
    await dispatch(removeItemFromCart(productId));
  }

  return (
    <div className="container mx-auto max-w-4xl pt-10 sm:pt-20 mb-40 px-5">
      <div className="grid grid-col-1 sm:grid-cols-5 sm:gap-4 mb-10 sm:mb-20">
        <div className="sm:col-span-3">
          <div className="flex items-center justify-between p-2 bg-teal-50 border rounded mb-4">
            <div>
              <h3 className="font-semibold text-md">
                Deliver To : {user?.name}
              </h3>
              <p className="text-sm text-[var(--para-primary)]">{`${user?.address.addressLine1} ${user?.address.addressLine2} ${user?.address.city}...`}</p>
            </div>
            <Link
              href={"/account/user/edit"}
              className="border border-teal-500 p-1 rounded text-sm text-teal-500 cursor-pointer"
            >
              Change Address
            </Link>
          </div>
          {cartItems &&
            cartItems.map((product: any) => (
              <Link
                href={`/products/${product.productId}`}
                key={product.productId}
                className="relative grid grid-cols-3 rounded gap-4 items-start bg-white p-2 border sm:mb-4"
              >
                <CgClose
                  className="absolute top-1 right-1"
                  size={15}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove(product.productId);
                  }}
                />
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-30 h-30 cols-span-1"
                />
                <div className="col-span-2">
                  <p className="text-[var(--para-primary)] text-[10px]">
                    {product.category}
                  </p>
                  <p className="text-md font-semibold text-black">
                    {product.name}
                  </p>
                  <p className="text-sm text-[var(--para-primary)]">
                    {product?.description?.split(" ").slice(0, 5).join(" ")}
                    ...
                  </p>
                  <p className="font-semibold">&#8377;{product?.price}</p>
                  {/* <p className="text-lg text-black mb-2">{product.description}</p> */}
                </div>
              </Link>
            ))}
        </div>

        <div className="sm:pl-4 sm:border-l sm:col-span-2">
          <div className="py-4 sm:py-6 border-b mb-4">
            <h3 className="font-bold text-sm uppercase text-[var(--para-primary)] mb-2">
              Price Details
            </h3>
            <div className="flex items-center justify-between text-sm text-[var(--para-primary)]">
              <p>Total Amount : </p>
              <p>&#8377;{totalPrice ? totalPrice : 0}</p>
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--para-primary)]">
              <p>Discount : </p>
              <p>&#8377;0</p>
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--para-primary)]">
              <p>Coupon : </p>
              <p>&#8377;0</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-md font-bold text-[var(--para-primary)] mb-4">
              <h2>Total Amount : </h2>
              <p>&#8377;{totalPrice ? totalPrice : 0}</p>
            </div>
            {cartItems && cartItems.length > 0 ? (
              <div>
                <Script src="https://checkout.razorpay.com/v1/checkout.js" />
                <Button
                  variant="teal"
                  onClick={handleRazorpayPayment}
                  className="w-full cursor-pointer font-bold uppercase tracking-wider p-4"
                >
                  Payment
                </Button>
              </div>
            ) : (
              <Button
                variant="teal"
                onClick={handleRazorpayPayment}
                className="w-full cursor-pointer font-bold uppercase tracking-wider p-4"
                disabled
              >
                Payment
              </Button>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-10 sm:mb-20 text-[var(--title-primary)] font-bold text-2xl text-center">
          You Might Also Like This
        </h2>
        <div className="grid grid-cols-2 gap-0 md:col-span-5 sm:grid-cols-2 gap-5 lg:grid-cols-4 lg:grid-cols-3  lg:gap-7">
          {products && products.length > 0
            ? (products || [])
                ?.map((product: Product) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    index={""}
                    designIndex={null}
                  />
                ))
                .slice(0, 8)
            : ""}
        </div>
      </div>
    </div>
  );
}
