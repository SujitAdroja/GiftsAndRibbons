import Link from "next/link";
import Image from "next/image";

const infos = [
  {
    cardName: "Personal Info",
    icon: "/Images/profile.webp",
    details: "Name, Email, Address",
    route: "user",
  },
  {
    cardName: "Orders Details",
    icon: "/Images/shopping-bag.webp",
    details: "Order Details, Cancle, Track, Return orders",
    route: "orders",
  },
];

export default function Account() {
  return (
    <div className=" m-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-40 lg:grid-cols-2 gap-4 ">
        {infos.map((info, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 max-content cursor-pointer hover:bg-[#f7f7f7] transition-all duration-200"
          >
            <Link href={`/account/${info.route}`} className="flex gap-4 ">
              {/* <i className="text-5xl ">{info.icon}</i> */}
              <Image
                src={info?.icon}
                alt="user profile image"
                className="w-1/4 h-1/4"
              />
              <div className="card-info">
                <h3 className="text-md font-semibold tracking-wide">
                  {info.cardName}
                </h3>
                <p className="text-gray-500 text-sm">{info.details}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
