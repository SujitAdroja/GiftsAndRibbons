"use client";
import { IoClose } from "react-icons/io5";
import { removeItemFromCart, updateCartItem } from "../../redux/cartSlice";
import { useAppDispatch } from "../../redux/hook";

export default function CartCard(item: any) {
  const dispatch = useAppDispatch();
  return (
    <div
      key={item.productId}
      className="relative flex gap-4 border-b border-gray-200 py-4"
    >
      <img
        src={item.images[0]}
        alt="product name"
        className="w-30 h-30  object-cover flex-shrink-0"
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-base">{item.name}</h3>
          <IoClose
            size={20}
            onClick={() => {
              dispatch(removeItemFromCart(item.productId));
            }}
          />
        </div>
        <p className="mb-2 text-sm">Price : &#8377; {item.price}</p>
        <div className="flex items-center justify-between mt-6">
          <div className=" flex border border-gray-200 rounded text-sm  bg-white   ">
            <button
              className="border-r px-2 border-gray-200 cursor-pointer  transition"
              onClick={() => {
                dispatch(
                  updateCartItem({
                    productId: item.productId,
                    action: "Decrement",
                  })
                );
              }}
            >
              -
            </button>

            <button className="text-center  px-2 outline-none bg-transparent">
              {item.quantity}
            </button>
            <button
              className="border-l px-2 border-gray-200 cursor-pointer transition"
              onClick={async () => {
                const data = await dispatch(
                  updateCartItem({
                    productId: item.productId,
                    action: "Increment",
                  })
                );
                console.log(data.meta.requestStatus);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
