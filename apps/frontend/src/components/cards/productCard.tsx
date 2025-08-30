"use client";
import { MdAddShoppingCart } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "apps/frontend/src/redux/hook";
import {
  addItemToCart,
  toggleSidebar,
} from "apps/frontend/src/redux/cartSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { addToWishlist } from "../../serviceProvider/wishlist_services";
import { useState } from "react";
import { toast } from "sonner";
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
      </div>
      <div className="p-2 pb-4 sm:pb-2 sm:p-2 sm:border-none">
        <h3 className="text-base font-bold">{product.name}</h3>
        <p className="text-[var(--para-primary)] text-sm ">
          {product.description.split(" ").slice(0, 3).join(" ")}...
        </p>
        <div className="flex items-center justify-between ">
          <p className="text-base font-bold pt-2">&#8377; {product.price}</p>
          <div className="flex items-center gap-1">
            <button className="text-black p-2 transition-all duration-300 hover:bg-[#f7f7f7] rounded">
              {wishlisted ? (
                <div
                  className="flex gap-4 items-center justify-center"
                  onClick={(e) => e.preventDefault()}
                >
                  <FaHeart size={20} className="text-red-600" />
                </div>
              ) : (
                <div
                  className="flex gap-4 items-center justify-center"
                  onClick={handleAddToWishlist}
                >
                  <FaRegHeart size={20} className="" />
                </div>
              )}
            </button>
            <button
              className="hover:bg-[#f7f7f7] p-2 rounded"
              onClick={(e) => {
                e.preventDefault();
                handleAddtoCart();
              }}
            >
              <MdAddShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
