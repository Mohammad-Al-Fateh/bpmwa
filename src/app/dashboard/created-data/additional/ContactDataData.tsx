"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Home,
  MessageSquare,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Wallet,
  Send,
  AlertCircle,
  Edit,
  Trash2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import useAxiousSource from "@/app/_default/_custom-component/useAxiousSource";

interface ImportantLink {
  name: string;
  link: string;
  _id: string;
}

interface ContactData {
  address: string;
  house?: string;
  number: string;
  whatsApp?: string;
  telegram?: string;
  bikash?: string;
  email: string;
  nagad?: string;
  upay?: string;
  rocket?: string;
  facebook?: string;
  youtube?: string;
  instagram?: string;
  linkedIn?: string;
  footerText?: string;
  marqueeText?: string;
  importantLink?: ImportantLink[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

const ContactData: React.FC = () => {
  const { axiosSource } = useAxiousSource();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ContactData | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSource.get("/info");
        setData(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch contact data");
        console.error("Fetch error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [axiosSource]);

  if (fetching) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p>Loading contact information...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p>No contact information found</p>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { name: "Bkash", value: data.bikash, icon: Wallet },
    { name: "Nagad", value: data.nagad, icon: Wallet },
    { name: "Upay", value: data.upay, icon: Wallet },
    { name: "Rocket", value: data.rocket, icon: Wallet },
  ].filter((method) => method.value);

  const socialLinks = [
    { name: "Facebook", url: data.facebook, icon: Facebook },
    { name: "YouTube", url: data.youtube, icon: Youtube },
    { name: "Instagram", url: data.instagram, icon: Instagram },
    { name: "LinkedIn", url: data.linkedIn, icon: Linkedin },
  ].filter((social) => social.url);

  const messagingApps = [
    { name: "WhatsApp", url: data.whatsApp, icon: MessageSquare },
    { name: "Telegram", url: data.telegram, icon: Send },
  ].filter((app) => app.url);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axiosSource.delete("/info");
      toast.success("Contact data deleted successfully!");
      setData(null);
    } catch (error) {
      toast.error("Failed to delete contact data");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Marquee */}
      {data.marqueeText && (
        <div className="bg-yellow-100 text-yellow-800 p-2 mb-8 rounded-md overflow-hidden">
          <Marquee>{data.marqueeText}</Marquee>
        </div>
      )}

      {/* Header with actions */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Contact Information
        </h1>
        <div className="flex space-x-2">
          <Link
            href={`/dashboard/created-data/additional/${data.id}`}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Edit size={18} className="mr-2" />
            Edit
          </Link>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            disabled={loading}
          >
            <Trash2 size={18} className="mr-2" />
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
            <Home className="mr-2 text-blue-500" size={20} />
            Basic Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-700">{data.address}</p>
                {data.house && <p className="text-gray-700">{data.house}</p>}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <div className="flex items-center justify-between">
                <a
                  href={`tel:${data.number}`}
                  className="text-blue-600 hover:underline"
                >
                  {data.number}
                </a>
                <button
                  onClick={() => copyToClipboard(data.number)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Copy phone number"
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <div className="flex items-center justify-between">
                <a
                  href={`mailto:${data.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {data.email}
                </a>
                <button
                  onClick={() => copyToClipboard(data.email)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Copy email"
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        {paymentMethods.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
              <Wallet className="mr-2 text-green-500" size={20} />
              Payment Methods
            </h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.name}>
                  <p className="text-sm text-gray-500">{method.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{method.value}</span>
                    <button
                      onClick={() => copyToClipboard(method.value || "")}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`Copy ${method.name} number`}
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messaging Apps */}
        {messagingApps.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
              <MessageSquare className="mr-2 text-purple-500" size={20} />
              Messaging Apps
            </h2>
            <div className="space-y-3">
              {messagingApps.map((app) => (
                <div key={app.name}>
                  <p className="text-sm text-gray-500">{app.name}</p>
                  <div className="flex items-center justify-between">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {app.name} Link{" "}
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                    <button
                      onClick={() => copyToClipboard(app.url || "")}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`Copy ${app.name} link`}
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Media */}
        {socialLinks.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
              <Facebook className="mr-2 text-blue-400" size={20} />
              Social Media
            </h2>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <div key={social.name}>
                  <p className="text-sm text-gray-500">{social.name}</p>
                  <div className="flex items-center justify-between">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {social.name} Profile{" "}
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                    <button
                      onClick={() => copyToClipboard(social.url || "")}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`Copy ${social.name} link`}
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Links */}
        {data.importantLink && data.importantLink.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
              <AlertCircle className="mr-2 text-orange-500" size={20} />
              Important Links
            </h2>
            <div className="space-y-3">
              {data.importantLink.map((link) => (
                <div key={link._id}>
                  <p className="text-sm text-gray-500">{link.name}</p>
                  <div className="flex items-center justify-between">
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Open Link <ChevronRight size={16} className="ml-1" />
                    </a>
                    <button
                      onClick={() => copyToClipboard(link.link)}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`Copy ${link.name} link`}
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Text */}
        {data.footerText && (
          <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Additional Information
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {data.footerText}
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-[#000000bd] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="mr-2 text-red-500" size={24} />
                <h3 className="text-lg font-semibold text-gray-800">
                  Confirm Deletion
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this contact information? This
                action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className={`px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition`}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactData;
