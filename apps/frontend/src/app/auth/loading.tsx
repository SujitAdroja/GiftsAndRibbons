import { ImSpinner9 } from "react-icons/im";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16">
        <ImSpinner9 size={50} className="animate-spin" />
      </div>
    </div>
  );
}
