"use client"; // needed for state in Next.js app directory

import { Button } from "apps/frontend/src/components/ui/button";
import { useAppSelector } from "apps/frontend/src/redux/hook";
import { updateUserInformation } from "apps/frontend/src/serviceProvider/auth_services";
import { first } from "lodash";
import Link from "next/link";
import { useState } from "react";

export default function ProfileDetails() {
  const [editMode, setEditMode] = useState(false);
  const { user, login } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    addressLine1: user?.address?.addressLine1 || "",
    addressLine2: user?.address?.addressLine2 || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pincode: user?.address?.pincode || "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobile: formData.mobile,
      extension: "+91",
      address: {
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
    };

    if (login) {
      await updateUserInformation(newFormData);
    }
    setEditMode(false); // back to view mode after save
  };

  if (!login) {
    return (
      <div className="flex flex-col items-center justify-center py-30">
        <h2>Please log in to view your profile details.</h2>
        <Link
          href="/login"
          className="mt-4 font-bold bg-teal-500 hover:bg-teal-600 text-white cursor-pointer py-2 px-4 transition-all duration-300"
        >
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:m-4 sm:border sm:shadow-md">
      <div className="flex justify-between items-center border-b p-2 sm:p-4">
        <h3 className="font-bold">Edit Details</h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 py-4 sm:px-10"
      >
        <div className="flex flex-col gap-4 text-sm text-gray-700 items-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center">
            <div className="flex flex-col w-full">
              <label className="text-gray-400 text-xs">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full mt-1"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-gray-400 text-xs">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full mt-1"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-xs">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-xs">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-xs">Address Line 1</label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-xs">Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-xs">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-xs">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-xs">Zip Code</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full mt-1"
            />
          </div>
        </div>

        <Button className="w-full" variant="teal" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
