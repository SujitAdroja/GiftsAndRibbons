"use client";

import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { loginUser } from "../../redux/authSclice";
import { Button } from "../ui/button";
export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { login } = useAppSelector((state: any) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const data = await dispatch(loginUser(formData));

      if (data !== null) {
        router.push("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(` ${error.message} `);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="container text-center mx-auto max-w-md "
    >
      <h1 className="text-2xl tracking-wider uppercase mb-4 font-bold text-[var(--title-primary)] ">
        Login
      </h1>

      <p className="mb-10 text-[var(--para-primary)]">
        Welcome to gift's and ribbon's Login to account to get started...
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
  );
}
