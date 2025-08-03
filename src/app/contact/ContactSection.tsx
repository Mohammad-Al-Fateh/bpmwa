/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  Send,
} from "lucide-react";

interface IContactForm {
  title: string;
  description: string;
  number: string;
  type: "contact" | "consult" | "advice" | "report" | "others";
}

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IContactForm>();

  const onSubmit = async (data: IContactForm) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Message sent successfully!");
        reset();
      } else {
        throw new Error("Failed to send message");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const contactTypes = [
    {
      id: "contact",
      title: "General Contact",
      icon: <Mail className="w-6 h-6" />,
      description: "Have questions? Reach out to our team",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "consult",
      title: "Consultation",
      icon: <Phone className="w-6 h-6" />,
      description: "Need professional advice? Book a call",
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "advice",
      title: "Get Advice",
      icon: <MessageSquare className="w-6 h-6" />,
      description: "Looking for guidance? We can help",
      color: "bg-green-100 text-green-600",
    },
    {
      id: "report",
      title: "Report Issue",
      icon: <AlertTriangle className="w-6 h-6" />,
      description: "Found a problem? Let us know",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 border rounded-2xl border-green-900 lg:grid-cols-2">
          {/* Left Side - Info */}
          <div className="bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-blue-100 mb-8">
              We`re here to help and answer any questions you might have. We
              look forward to hearing from you.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {contactTypes.map((type, idx) => (
                <div
                  key={type.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${type.color.replace(
                    "100",
                    "50"
                  )} hover:${type.color.replace("100", "200")} ${
                    watch("type") === type.id
                      ? `ring-2 ring-offset-2 ${type.color.replace(
                          "100",
                          "500"
                        )}`
                      : ""
                  }`}
                  onClick={() => setValue("type", type.id as any)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2  rounded-full ${type.color}`}>
                      {type.icon}
                    </div>
                    <h3 className="font-medium ">{type.title}</h3>
                  </div>
                  <p
                    className={`text-sm mt-2 ${
                      idx == 2 || idx == 3 ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {type.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-full">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-full">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span>+880 1234 567890</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Request Type
                </label>
                <div className="relative">
                  <select
                    id="type"
                    {...register("type", { required: "Type is required" })}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a type</option>
                    <option value="contact">General Contact</option>
                    <option value="consult">Consultation</option>
                    <option value="advice">Get Advice</option>
                    <option value="report">Report Issue</option>
                    <option value="others">Others</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.type.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: "Subject is required" })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What's this about?"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="number"
                  type="tel"
                  {...register("number", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+]+$/,
                      message: "Invalid phone number format",
                    },
                  })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  // placeholder="+880 1234 567890"
                />
                {errors.number && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.number.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("description", {
                    required: "Message is required",
                  })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us more details..."
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
