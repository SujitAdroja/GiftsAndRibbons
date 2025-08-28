import Link from "next/link";

export default function OrderItems({ item }: any) {
  return (
    <div className="order-card p-4 max-content text-sm mb-5 border bg-[#f7f7f7] sm:shadow-md">
      <div className="hidden  md:flex gap-2 items-start flex-col sm:flex-row sm:gap-8 sm:items-center">
        <p className="order-data text-gray-700">
          Order Date :
          <span className="text-black font-semibold ml-1">
            {new Date(item.orderedAt).toDateString()}
          </span>
        </p>
        <p className="text-gray-700">
          Status :
          <span className="text-green-900 font-semibold ml-1 uppercase">
            {item.paymentStatus}
          </span>
        </p>
        <p className="order-total text-gray-700">
          Price :
          <span className="text-black font-semibold ml-1">
            &#8377; {item.totalAmount}
          </span>
        </p>
        <Link
          href={`/account/orders/${item._id}`}
          className="sm:ml-auto text-sm text-black p-1 py-0 cursor-pointer border-b  hover:border-black  transition-all duration-200"
        >
          View order
        </Link>
      </div>

      <hr className="hidden md:block my-4 text-gray-300" />
      <div className="flex flex-col gap-4 mb-2">
        {item.products &&
          item.products.map((product: any) => (
            <Link
              href={`/products/${product.productId}`}
              key={product.productId}
              className="order-items-container flex gap-4 items-start bg-white p-2"
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
                {/* <p className="text-lg text-black mb-2">{product.description}</p> */}
              </div>
            </Link>
          ))}
      </div>
      <Link
        href={`/account/orders/${item._id}`}
        className="inline-block md:hidden text-sm text-black  py-1 px-1 cursor-pointer border border-black hover:border-b  transition-all duration-200"
      >
        View order
      </Link>
    </div>
  );
}
