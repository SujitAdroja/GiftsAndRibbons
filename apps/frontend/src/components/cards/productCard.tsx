"use client";
import { MdAddShoppingCart } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "apps/frontend/src/redux/hook";
import {
  addItemToCart,
  toggleSidebar,
} from "apps/frontend/src/redux/cartSlice";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { addToWishlist } from "../../serviceProvider/wishlist_services";
import { useState } from "react";
import { toast } from "sonner";
import { LuLoaderPinwheel } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { addProductToRecentlyVisited } from "../../redux/recentSclice";
import { Product } from "../../redux/productSlice";
export default function ProductCard({
  product,
  width,
}: {
  product: Product;
  width: string;
}) {
  const [wishlisted, setWishlisted] = useState(product.wishlist || false);
  const [loading, setLoading] = useState(false);
  const { login } = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleAddtoCart() {
    if (!login)
      return toast(`Please Login First →`, {
        action: {
          label: "Login",
          onClick: () => router.push("/auth/login"),
        },
      });
    await dispatch(
      addItemToCart({
        productId: product._id,
        quantity: 1,
        price: product.price,
      })
    );
    dispatch(toggleSidebar(true));
  }

  async function addRecentProducts() {
    await dispatch(
      addProductToRecentlyVisited({
        _id: product._id,
        name: product.name,
        description: product.description,
        images: [product.images[0]],
        price: product.price,
      })
    );
  }

  async function handleAddToWishlist(e: React.MouseEvent) {
    e.preventDefault();
    // await dispatch(addProductToWishlist(product._id));
    if (!login)
      return toast(`Please Login First →`, {
        action: {
          label: "Login",
          onClick: () => router.push("/auth/login"),
        },
      });
    setLoading(true);
    await addToWishlist(product._id);
    setWishlisted(true);
    setLoading(false);
  }

  return (
    <Link
      href={`/products/${product._id}`}
      className={`group md:hover:shadow-[0_0_8px_1px_rgba(0,0,0,0.1)] border cursor-pointer ${width}  cursor-pointer 
      `}
      onClick={addRecentProducts}
    >
      <div className="relative ">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className={`w-full bg-[#F7F7F7] object-cover hover:opacity-100 h-50 sm:h-70`}
        />
        <button className="hidden absolute z-2 w-full bottom-0 left-0 p-1 text-black bg-white p-2 md:group-hover:block transition-all duration-300">
          {wishlisted ? (
            <div
              className="flex gap-2 items-center justify-center border border-red-600 p-1"
              onClick={(e) => e.preventDefault()}
            >
              <FaHeart size={17} className="text-red-500" />
              <p className="text-red-600 font-semibold tracking-wide uppercase">
                Wishlisted
              </p>
            </div>
          ) : (
            <div
              className="flex gap-2 items-center justify-center border border-gray-700 p-1"
              onClick={handleAddToWishlist}
            >
              {loading ? (
                <LuLoaderPinwheel size={10} className="animate-spin" />
              ) : (
                <>
                  <CiHeart size={20} />
                  <p className="font-semibold tracking-wide uppercase">
                    Wishlist
                  </p>
                </>
              )}
            </div>
          )}
        </button>
        <button className="sm:hidden absolute z-2 top-0 right-0 p-1 text-black p-2 transition-all duration-300">
          {wishlisted ? (
            <div
              className="flex gap-4 items-center justify-center text-white p-1"
              onClick={(e) => e.preventDefault()}
            >
              <FaHeart size={17} className="text-red-600" />
            </div>
          ) : (
            <div
              className="flex gap-4 items-center justify-center p-1"
              onClick={handleAddToWishlist}
            >
              <FaHeart size={17} className="text-white" />
            </div>
          )}
        </button>
      </div>
      <div className="p-2 pb-4 sm:pb-2 sm:p-2 sm:border-none">
        <h3 className="text-base font-bold">{product.name}</h3>
        <p className="text-[var(--para-primary)] text-sm ">
          {product.description.split(" ").slice(0, 3).join(" ")}...
        </p>
        <div className="flex items-center justify-between gap">
          <p className="text-base font-bold pt-2">&#8377; {product.price}</p>
          <button
            className="button bg-gray-800 text-sm  shadow-lg text-white hover:bg-gray-900 text-black p-2  cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleAddtoCart();
            }}
          >
            <MdAddShoppingCart />
          </button>
        </div>
      </div>
    </Link>
  );
}
