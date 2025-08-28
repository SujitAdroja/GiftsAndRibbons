import { LuLoaderPinwheel } from "react-icons/lu";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16">
        <LuLoaderPinwheel size={50} className="animate-spin" />
      </div>
    </div>
  );
}
