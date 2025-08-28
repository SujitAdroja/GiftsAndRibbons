import { MdDelete } from "react-icons/md";
import {
  removeItemFromCart,
  updateCartItem,
} from "apps/frontend/src/redux/cartSlice";
// import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useAppDispatch } from "apps/frontend/src/redux/hook";
export function CartItems(item: any) {
  const dispatch = useAppDispatch();
  return (
    <div key={item.productId} className="flex gap-4 border p-4 rounded-md">
      <img
        // src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
        src={item.images[0]}
        alt="product name"
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex flex-col justify-between">
        <h3 className="font-semibold text-lg">Item Name</h3>
        <div className="flex items-center gap-2 border rounded-md bg-white  w-fit">
          <button
            className="border-r px-3 py-1  hover:bg-gray-100 hover:rounded transition"
            onClick={() => {
              // decrementQuantity(item.productId);
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
          <input
            type="number"
            className="w-12 text-center outline-none bg-transparent"
            name="Quantity"
            id="Quantity"
            value={item.quantity}
            readOnly
          />
          <button
            className="border-l px-3 py-1  hover:bg-gray-100 hover:rounded transition"
            onClick={() => {
              // incrementQuantity(item.productId);
              dispatch(
                updateCartItem({
                  productId: item.productId,
                  action: "Increment",
                })
              );
            }}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="text-xl text-red-500 hover:text-red-700 transition ml-auto"
        onClick={() => {
          // removeFromCart(item.productId);
          dispatch(removeItemFromCart(item.productId));
        }}
      >
        <MdDelete />
      </button>
    </div>
  );
}
