"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useAppDispatch } from "../../redux/hook";
import { signupUser } from "../../redux/authSclice";
import { toast } from "sonner";

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const res = await dispatch(signupUser(formData));
      if (res) {
        toast("Account Created Successfully", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });

        router.push("/");
      } else {
        alert("account not successfully created");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="container text-center mx-auto max-w-md"
    >
      <h1 className="text-2xl font-bold tracking-wider uppercase text-[var(--title-primary)] mb-4">
        Create an account
      </h1>

      <p className="mb-5 text-md text-[var(--para-primary)]">
        Welcome to gift&apos;s and ribbon&apos;s Create new account to get
        started...
      </p>

      <div className="flex w-full gap-2 mb-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="border w-full p-2 px-4 rounded"
          onChange={handleChange}
          value={formData.firstName}
          required
        />
        <br />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastName}
          className="border w-full p-2 px-4 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="xyz@gmail.com"
          className="border w-full p-2 px-4 rounded"
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
          className="border w-full p-2 px-4 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <Button variant="teal" type="submit" className="w-full font-bold">
        Create Account
      </Button>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 text-[var(--para-primary)] hover:text-black">
          <Link className="text-md" href={"/"}>
            Continue without signup
          </Link>
          <IoIosArrowRoundForward size={20} />
        </div>
        <Link
          href={"/auth/login"}
          className="text-md cursor-pointer text-[var(--para-primary)] hover:text-black"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
