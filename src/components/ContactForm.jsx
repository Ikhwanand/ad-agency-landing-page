import emailjs from "@emailjs/browser";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiSend } from "react-icons/fi";

const serviceId = import.meta.env.serviceId;
const templateId = import.meta.env.templateId;
const publicKey = import.meta.env.publicKey;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is required";
    }
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsSending(true);

      emailjs
        .send(serviceId, templateId, formData, publicKey)
        .then((response) => {
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        })
        .catch((error) => {
          console.log("Failed...", error);
          toast.error("Failed to send message. Please try again later.");
        })
        .finally(() => {
          setIsSending(false);
        });
    }
  };
  return (
    <section className="bg-stone-50 p-4" id="contact">
      <Toaster />
      <h2 className="my-8 text-center text-4xl font-semibold tracking-tighter">
        Let's Connect
      </h2>
      <form onSubmit={handleSubmit} className="mx-auto mb-20 lg:max-w-3xl">
        <div className="mb-4 flex space-x-4 justify-center">
          <div className="lg:w-1/2">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
              className="mb-8
                    w-full appearance-none rounded-lg border border-emerald-950 bg-transparent
                    px-3 py-2 text-sm focus:border-stone-400 focus:outline-none"
            />
            {errors.name && (
              <p className="text-sm text-rose-800">{errors.name}</p>
            )}
          </div>
          <div className="lg:w-1/2">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              className="mb-8
                    w-full appearance-none rounded-lg border border-emerald-950 bg-transparent
                    px-3 py-2 focus:border-stone-400 focus:outline-none"
            />
            {errors.email && (
              <p className="text-sm text-rose-800">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <textarea
            name="message"
            id="message"
            value={formData.message}
            placeholder="Message"
            onChange={handleChange}
            className="mb-8
                    w-full appearance-none rounded-lg border border-emerald-950 bg-transparent
                    px-3 py-2 focus:border-stone-400 focus:outline-none sm:w-full"
          ></textarea>
          {errors.message && (
            <p className="text-sm text-rose-800">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`mb-8 w-full rounded border
                bg-emerald-950 px-4 py-2 text-sm font-semibold text-orange-50
                hover:bg-emerald-900 ${
                  isSending ? "cursor-not-allowed opacity-50" : ""
                }`}
          disabled={isSending}
        >
          <div className="flex items-center justify-center gap-2">
            {isSending ? "Sending..." : "Send"}
            <FiSend />
          </div>
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
