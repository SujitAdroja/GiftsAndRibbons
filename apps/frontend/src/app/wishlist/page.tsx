"use client";

import { useEffect, useState } from "react";
import {
  getWishlistItems,
  removeFromWishlist,
} from "../../serviceProvider/wishlist_services";

import WishlistCard from "../../components/cards/WishlistCard";
import Link from "next/link";
import { ProductCardSkeleton } from "../../components/cards/ProductCardSkeleton";

interface WishlistProducts {
  _id: string;
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  images: string[];
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchWishlistItems() {
    const data = await getWishlistItems();
    setWishlistItems(data);
  }
  async function handleRemoveFromWishlist(productId: string) {
    const data = await removeFromWishlist(productId);
    setWishlistItems(data);
  }
  useEffect(() => {
    setLoading(true);
    fetchWishlistItems();
    setLoading(false);
  }, []);
  return (
    <section className="container mx-auto py-5 px-4 md:px-0 mb-50">
      <h1 className="text-xl font-bold mb-5 text-[var(--title-primary)]">
        My Wishlist
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {/* Wishlist i?tems will be displayed here */}
        {loading ? (
          <>
            <ProductCardSkeleton width="w-full" />
            <ProductCardSkeleton width="w-full" />
            <ProductCardSkeleton width="w-full" />
          </>
        ) : wishlistItems?.length > 0 ? (
          wishlistItems?.map((item: WishlistProducts) => (
            <WishlistCard
              key={item._id}
              item={item}
              handleRemoveFromWishlist={handleRemoveFromWishlist}
            />
          ))
        ) : (
          <div className="col-span-6 h-150 flex flex-col items-center">
            <h2 className="text-center text-[var(--title-primary)] font-bold text-2xl mt-20 mb-4">
              No items in wishlist
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
        )}
      </div>
    </section>
  );
}
