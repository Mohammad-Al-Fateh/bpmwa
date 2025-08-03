"use client";

import React, { ReactNode, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface AosWrapperProps {
  children: ReactNode;
}

export default function AosWrapper({ children }: AosWrapperProps) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });

    // Function to remove item and set next timer
    function scheduleRemoveAtMidnight() {
      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // next day
        0,
        0,
        0,
        0
      );
      const msUntilMidnight = nextMidnight.getTime() - now.getTime();

      // Set a timeout to run at next midnight
      const timeoutId = setTimeout(() => {
        localStorage.removeItem("ins");

        // After first run, set interval to run every 24 hours
        setInterval(() => {
          localStorage.removeItem("ins");
        }, 24 * 60 * 60 * 1000); // every 24 hours
      }, msUntilMidnight);

      // Cleanup on unmount
      return () => {
        clearTimeout(timeoutId);
      };
    }

    const cleanup = scheduleRemoveAtMidnight();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return <>{children}</>;
}
