"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Home,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Send,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Globe,
  Wallet,
  Link as LinkIcon,
  X,
  Plus,
} from "lucide-react";

interface ImportantLink {
  name: string;
  link: string;
}

interface ContactInfoFormData {
  address: string;
  house: string;
  number: string;
  whatsApp: string;
  telegram: string;
  bikash: string;
  email: string;
  nagad: string;
  upay: string;
  rocket: string;
  facebook: string;
  youtube: string;
  instagram: string;
  linkedIn: string;
  footerText: string;
  marqueeText: string;
  importantLink: ImportantLink[];
}

export default function ContactInfoDataForm() {
  const [importantLinks, setImportantLinks] = useState<ImportantLink[]>([]);
  const [newLink, setNewLink] = useState<ImportantLink>({ name: "", link: "" });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }, //errors,
    reset,
  } = useForm<ContactInfoFormData>();

  const onSubmit = async (data: ContactInfoFormData) => {
    try {
      const payload = {
        ...data,
        importantLink: importantLinks,
      };

      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_V1}/info`, payload);
      toast.success("Contact information saved successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to save contact information");
      console.error("Error submitting form:", error);
    }
  };

  const addImportantLink = () => {
    if (newLink.name && newLink.link) {
      setImportantLinks([...importantLinks, newLink]);
      setNewLink({ name: "", link: "" });
    }
  };

  const removeImportantLink = (index: number) => {
    const updatedLinks = [...importantLinks];
    updatedLinks.splice(index, 1);
    setImportantLinks(updatedLinks);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="w-full mx-auto   p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Contact Information
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Address Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4 mr-2" />
                Address
              </label>
              <input
                {...register("address")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full address"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Home className="h-4 w-4 mr-2" />
                House/Road No
              </label>
              <input
                {...register("house")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter house/road number"
              />
            </div>
          </div>

          {/* Contact Numbers Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Phone className="h-4 w-4 mr-2" />
                Phone Number
              </label>
              <input
                {...register("number")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4 mr-2" />
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>
          </div>

          {/* Messaging Apps Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp Number
              </label>
              <input
                {...register("whatsApp")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter WhatsApp number"
              />
              <p className="text-xs text-gray-500">Example: 8801712345678</p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Send className="h-4 w-4 mr-2" />
                Telegram Username
              </label>
              <input
                {...register("telegram")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Telegram username"
              />
              <p className="text-xs text-gray-500">Example: @username</p>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Wallet className="h-4 w-4 mr-2" />
                Bikash Number
              </label>
              <input
                {...register("bikash")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Bikash number"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Wallet className="h-4 w-4 mr-2" />
                Nagad Number
              </label>
              <input
                {...register("nagad")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Nagad number"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Wallet className="h-4 w-4 mr-2" />
                Upay Number
              </label>
              <input
                {...register("upay")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Upay number"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Wallet className="h-4 w-4 mr-2" />
                Rocket Number
              </label>
              <input
                {...register("rocket")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Rocket number"
              />
            </div>
          </div>

          {/* Social Media Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook Link
              </label>
              <input
                {...register("facebook")}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Facebook URL"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Youtube className="h-4 w-4 mr-2" />
                YouTube Link
              </label>
              <input
                {...register("youtube")}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter YouTube URL"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Instagram className="h-4 w-4 mr-2" />
                Instagram Link
              </label>
              <input
                {...register("instagram")}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Instagram URL"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn Link
              </label>
              <input
                {...register("linkedIn")}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter LinkedIn URL"
              />
            </div>
          </div>

          {/* Text Content Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Globe className="h-4 w-4 mr-2" />
                Footer Text
              </label>
              <textarea
                {...register("footerText")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter footer text"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Globe className="h-4 w-4 mr-2" />
                Marquee Text
              </label>
              <textarea
                {...register("marqueeText")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter marquee text"
              />
            </div>
          </div>

          {/* Important Links Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <LinkIcon className="h-4 w-4 mr-2" />
                Important Links
              </label>
            </div>

            <div className="space-y-3">
              {importantLinks.map((link, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div className="px-3 py-2 bg-gray-50 rounded-md">
                      {link.name}
                    </div>
                    <div className="px-3 py-2 bg-gray-50 rounded-md truncate">
                      {link.link}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImportantLink(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={newLink.name}
                onChange={(e) =>
                  setNewLink({ ...newLink, name: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Link name"
              />
              <input
                type="url"
                value={newLink.link}
                onChange={(e) =>
                  setNewLink({ ...newLink, link: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Link URL"
              />
              <button
                type="button"
                onClick={addImportantLink}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Contact Information"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
