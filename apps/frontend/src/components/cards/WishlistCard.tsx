import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { Button } from "../ui/button";
import { useAppDispatch } from "../../redux/hook";
import { addItemToCart } from "../../redux/cartSlice";

export default function WishlistCard({ item, handleRemoveFromWishlist }: any) {
  const dispatch = useAppDispatch();

  return (
    <Link href={`/products/${item?._id}`}>
      <div
        className={`group md:hover:shadow-[0_0_8px_1px_rgba(0,0,0,0.1)] transition-all duration-300 border`}
      >
        <div className="relative ">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full bg-[#F7F7F7] object-cover hover:opacity-100 h-50"
          />
          <button
            className="absolute top-2 right-2 bg-gray-200 p-1 rounded-full cursor-pointer  "
            onClick={(e) => {
              e.preventDefault();
              handleRemoveFromWishlist(item._id);
            }}
          >
            <CgClose />
          </button>
        </div>
        <div className="p-2 pb-4 sm:pb-2 sm:p-2 sm:border-none">
          <h3 className="text-base font-bold">{item.name}</h3>
          <p className="text-[var(--para-primary)] text-sm mb-2">
            {item.description.split(" ").slice(0, 3).join(" ")}...
          </p>
          <p className="text-base font-bold mb-4">&#8377; {item.price}</p>
          <Button
            variant="teal"
            className="w-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic here
              dispatch(
                addItemToCart({
                  productId: item._id,
                  quantity: 1,
                  price: item.price,
                })
              );
              handleRemoveFromWishlist(item._id);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
