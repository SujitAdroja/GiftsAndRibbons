import Link from "next/link";

const categories = [
  {
    title: "Birthday",
    image: "/Images/Birthday.webp",
    description: "Personalized gifts for birthdays to show you care.",
    link: "/products?q=Birthday",
  },
  {
    title: "Hamper",
    image: "/Images/GiftBox.webp",
    description: "Customized gift hampers with a unique personal touch.",
    link: "/products?q=Gift Box",
  },
  {
    title: "Rakhi",
    image: "/Images/rakhi.webp",
    description: "Celebrate Raksha Bandhan with a special gift hamper.",
    link: "/products?q=Rakhi Hamper,Rakhi Gift Box",
  },
  {
    title: "Diwali",
    image: "/Images/diwali.webp",
    description: "Thoughtfully designed gift boxes for every occasion.",
    link: "/products",
  },
  {
    title: "Bouquet",
    image: "/Images/Category_Flowers.webp",
    description: "Beautifully arranged fresh flowers for your loved ones.",
    link: "/products?q=Bouquet",
  },
];
export default function Categories() {
  return (
    <div className="py-5 md:py-10">
      <h2 className="text-lg text-[var(--title-primary)] font-bold sm:text-3xl tracking-widest mb-10 md:mb-20">
        BROWSE CATEGORIES
      </h2>
      <div className="w-full flex overflow-x-scroll no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 px-4">
        {categories.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="min-w-[250px] md:min-w-full relative bg-[#f7f7f7] h-[300px] bg-cover bg-center bg-no-repeat sm:pt-26 cursor-pointer"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute h-40 bottom-0 left-0 bg-[#f7f7f7b3] p-4 m-2">
              <h3 className="text-2xl font-semibold mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-sm text-center mb-2 text-[var(--para-primary)]">
                {item.description}
              </p>
              <button className="w-full block text-center cursor-pointer hover:underline">
                Explore More &rarr;
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
