"use client";

import { Button } from "apps/frontend/src/components/ui/button";
import { fetchUserInformation } from "apps/frontend/src/redux/authSclice";
import { useAppDispatch, useAppSelector } from "apps/frontend/src/redux/hook";
import { getUserInformation } from "apps/frontend/src/serviceProvider/auth_services";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function PersonalInfo() {
  const { user: userInfo, login } = useAppSelector((state) => state.user);
  const [user, setUser] = useState(userInfo);
  const dispatch = useAppDispatch();
  async function userInformation() {
    const user = await getUserInformation();
    setUser(user);
  }
  console.log(user);
  useEffect(() => {
    if (!login) {
      dispatch(fetchUserInformation());
    } else {
      userInformation();
    }
  }, []);

  if (!login) {
    return (
      <div className="flex flex-col items-center justify-center py-30">
        <h2>Please log in to view your profile details.</h2>
        <Link
          href="/auth/login"
          className="mt-4 font-bold bg-teal-500 hover:bg-teal-600 text-white cursor-pointer py-2 px-4 transition-all duration-300"
        >
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:px-10 sm:m-4 sm:border sm:shadow-md">
      <h3 className="font-bold sm:p-4 border-b">Profile Details</h3>
      <div className="py-4 sm:px-8">
        <div className="grid grid-cols-3 gap-y-4 gap-x-4 text-gray-800 text-md">
          <p className="w-20">First Name</p>
          <p className="col-span-2 ">{user?.firstName}</p>
          <p className="w-20 ">Email</p>
          <p className="col-span-2 ">{user?.email}</p>
          <p className="w-20">Mobile</p>
          <p className="col-span-2">
            +{user?.extension} {user?.mobile}
          </p>
          <p className="w-20">Address</p>
          <p className="col-span-2">{`${user?.address?.addressLine1} ${user?.address?.addressLine2}`}</p>
          <p className="w-20">City</p>
          <p className="col-span-2">{user?.address?.city}</p>
          <p className="w-20">State</p>
          <p className="col-span-2">{user?.address?.state}</p>
          <p className="w-20">Zip Code</p>
          <p className="col-span-2">{user?.address?.pincode}</p>
        </div>
        <Link href={"/account/user/edit"}>
          <Button className="w-full mt-6" variant="teal" type="submit">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
