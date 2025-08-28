"use client";
import { useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Email sent successfully:", data);
        } else {
          console.error("Error sending email:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mx-auto  my-10">
      <div className="max-w-2xl mx-auto px-2 sm:px-0">
        <h2 className="mb-5 md:mb-10 text-3xl font-bold text-center text-[var(--text-primary)]">
          Contact Us
        </h2>
        <p className="  mx-auto text-[16px] font-[400]  mb-2">
          For all Feedback | Corporate orders | Bulk orders | Business
          opportunities Kindly fill the form and we will soon get back to you
        </p>
        <div className="contact-form-container   mx-auto">
          <form
            id="contactForm"
            onSubmit={(e) => {
              sendEmail(e);
            }}
          >
            <div className="flex gap-2 w-full mb-2">
              <div className="w-full">
                <input
                  className="border   w-full p-2 px-4 rounded"
                  placeholder="Name"
                  type="text"
                  id="name"
                  name="name"
                  maxLength={10}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="w-full">
                <input
                  type="text"
                  className="border w-full p-2 px-4 rounded"
                  id="number"
                  placeholder="91234-12398"
                  name="number"
                  maxLength={10}
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="mb-2">
              <input
                type="email"
                id="email"
                className="border w-full p-2 px-4 rounded"
                placeholder="jhon@gmail.com"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <textarea
                id="message"
                placeholder="Message"
                name="message"
                rows={10}
                className="border   w-full p-2 px-4 rounded"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              ></textarea>
            </div>

            <div className="w-full relative mt-2">
              <button
                type="submit"
                className="flex items-center justify-center text-[17px] gap-2 bg-black text-white border py-2 px-4 font-[400] cursor-pointer"
              >
                <span>Send</span>
                <MdOutlineKeyboardDoubleArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
