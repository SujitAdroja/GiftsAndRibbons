import { CgSpinnerTwo } from "react-icons/cg";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16">
        <CgSpinnerTwo size={50} className="animate-spin text-teal-600" />
      </div>
    </div>
  );
}
