export default function Aboutpage() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-12 items-center">
        <div className="relative px-2 z-3 bg-[url('/Images/GNR_About.webp')] bg-cover bg-no-repeat bg-center bg-[#f7f7f7] h-[400px] flex items-center justify-center"></div>
        {/* Right Content */}
        <div className="max-w-2xl px-4 mx-auto">
          <p className="text-lg text-black mb-4 ">
            At
            <strong className="ml-1 font-bold">
              Gift&apos;s and Ribbon&apos;s India
            </strong>
            , we believe every gift should be as special as the person receiving
            it. We specialize in{" "}
            <strong className="font-semibold">custom gift</strong> hamper
            packaging for all occasions —{" "}
            <strong className="font-semibold">
              from festivals like Diwali, Christmas, and Rakhi, to weddings,
              birthdays, and corporate events.
            </strong>
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Our hampers are thoughtfully curated with premium products and
            designed with beautiful, <strong>high-quality packaging</strong>{" "}
            that leaves a lasting impression. Whether you want a festive hamper
            full of traditional treats or a modern,{" "}
            <strong>personalized gift set</strong>, we bring your vision to
            life.
          </p>
          <p className="text-lg text-gray-800">
            With creativity, attention to detail, and a passion for gifting, we
            aim to make every celebration memorable. Let us help you express
            love, gratitude, and joy — one hamper at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
