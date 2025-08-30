"use client";
import { useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Button } from "../../components/ui/button";
import { config } from "apps/frontend/config";
import { toast } from "sonner";
import { CgSpinnerTwo } from "react-icons/cg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${config.BACKEND_ENDPOINT}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast("Email send successfully");
          setFormData({ name: "", email: "", number: "", message: "" });
          setLoading(false);
        } else {
          toast("Error sending an Email");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="container mx-auto my-10">
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
          <CgSpinnerTwo size={50} className="animate-spin text-teal-600" />
        </div>
      ) : (
        ""
      )}
      <div className="max-w-2xl mx-auto px-2 sm:px-0">
        <h2 className="mb-5 md:mb-10 text-3xl font-bold text-center text-[var(--title-primary)]">
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
              <Button
                variant="teal"
                type="submit"
                className="flex items-center justify-center gap-2 border py-2 px-4 font-[400] cursor-pointer"
              >
                <span>Send</span>
                <MdOutlineKeyboardDoubleArrowRight />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
