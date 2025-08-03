import React from "react";
import "animate.css";
import {
  Facebook,
  MessageCircle,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageSquare,
  Send,
} from "lucide-react";

const SocialMediaContact = () => {
  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      color: "bg-blue-600 hover:bg-blue-700",
      url: "#",
      animation: "animate__fadeInLeft",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-green-500 hover:bg-green-600",
      url: "#",
      animation: "animate__fadeInUp",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      color:
        "bg-gradient-to-tr from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      url: "#",
      animation: "animate__fadeInDown",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      color: "bg-sky-400 hover:bg-sky-500",
      url: "#",
      animation: "animate__fadeInUp",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      color: "bg-blue-700 hover:bg-blue-800",
      url: "#",
      animation: "animate__fadeInRight",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      color: "bg-red-600 hover:bg-red-700",
      url: "#",
      animation: "animate__fadeInLeft",
    },
    {
      name: "Messenger",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-blue-500 hover:bg-blue-600",
      url: "#",
      animation: "animate__fadeInRight",
    },
    {
      name: "Telegram",
      icon: <Send className="w-6 h-6" />,
      color: "bg-blue-400 hover:bg-blue-500",
      url: "#",
      animation: "animate__fadeInDown",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 animate__animated animate__fadeIn">
          Connect With Us
        </h2>
        <p className="text-lg text-gray-600 animate__animated animate__fadeIn animate__delay-1s">
          Follow our social channels for updates and announcements
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {socialPlatforms.map((platform, index) => (
          <a
            key={index}
            href={platform.url}
            className={`${platform.color} text-white rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg animate__animated ${platform.animation}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.name}
          >
            <div className="w-8 h-8 flex items-center justify-center mb-2">
              {platform.icon}
            </div>
            <span className="text-sm font-medium">{platform.name}</span>
          </a>
        ))}
      </div>

      <div className="mt-12 text-center animate__animated animate__fadeIn animate__delay-2s">
        <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full">
          <span className="mr-2 text-gray-700">Share this page:</span>
          <div className="flex space-x-2">
            {socialPlatforms.slice(0, 3).map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                className={`${platform.color} w-8 h-8 flex items-center justify-center rounded-full text-white`}
                aria-label={`Share on ${platform.name}`}
              >
                <div className="w-4 h-4">
                  {React.cloneElement(platform.icon, {
                    className: "w-full h-full",
                  })}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaContact;
