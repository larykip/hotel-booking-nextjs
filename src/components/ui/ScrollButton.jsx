"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A button component that appears when the user scrolls past 30% of the page height
 * and allows them to smoothly scroll back to the top of the page.
 * 
 * @component
 * @example
 * ```jsx
 * <ScrollButton />
 * ```
 * 
 * @returns {JSX.Element} A button element fixed to the bottom-right corner that
 * becomes visible when scrolling and triggers a smooth scroll to top when clicked
 */
const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= 30) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

return (
    <button
        type="button"
        onClick={scrollToTop}
        className={cn(
            "fixed bottom-4 right-4 z-50 p-2 rounded-full bg-gray-300 text-white shadow-lg transition-opacity duration-300 hover:bg-gray-700",
            isVisible ? "opacity-100" : "opacity-0"
        )}
        aria-label="Scroll to top"
    >
        <ChevronUp className="h-6 w-6" />
    </button>
);
};

export default ScrollButton;
