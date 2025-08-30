"use client";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { loginUser } from "../../redux/authSclice";
import { Button } from "../ui/button";
import { CgSpinnerTwo } from "react-icons/cg";
import { toast } from "sonner";
export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await dispatch(loginUser(formData));
      if (data.payload !== null) {
        setLoading(false);
        toast("Account Loged In SuccessFully");
        router.push("/");
      } else {
        setLoading(false);
        toast("Log In Unsuccessfull Check Credentials");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast("Account not created. Please try again.");
      } else {
        toast("An unknown error occurred.");
      }
    }
  };
  return (
    <div>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
          <CgSpinnerTwo size={50} className="animate-spin text-teal-600" />
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={handleSubmit}
        className="container text-center mx-auto max-w-md px-2
      sm:px-0"
      >
        <h1 className="text-2xl tracking-wider uppercase mb-4 font-bold text-[var(--title-primary)] ">
          Login
        </h1>

        <p className="mb-10 text-[var(--para-primary)]">
          Welcome to gift&apos;s and ribbon&apos;s Login to account to get
          started...
        </p>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="xyz@gmail.com"
            className="border w-full p-2 px-4 rounded text-[var(--para-primary)]"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-16 ">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border  w-full p-2 px-4 rounded text-[var(--para-primary)]"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button variant="teal" type="submit" className="w-full font-bold">
          Log In
        </Button>
        <div className="flex items-center justify-between mt-2 ">
          <div className="flex items-center text-[var(--para-primary)] hover:text-black">
            <Link className="text-md" href={"/"}>
              Continue without LogIn
            </Link>
            <MdArrowRightAlt size={20} />
          </div>
          <Link
            href={"/auth/signup"}
            className="text-md cursor-pointer text-[var(--para-primary)] hover:text-black"
          >
            Sign UP
          </Link>
        </div>
      </form>
    </div>
  );
}
