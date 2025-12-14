"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";


type HeaderProps = {
  phone?: string;
  line?: string;
};

export default function Header({ phone = "", line = "" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    // Use an immediate check with a timeout to prevent an issue where resize fires on initial load in some environments
    const handleResize = () => setTimeout(close, 100); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasPhone = !!phone;
  const hasLine = !!line;
    
  // Function to push to dataLayer for tracking
  const handlePhoneClick = () => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "phone_click",
        phone_number: phone,
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-bg)] shadow-md border-b border-[var(--color-primary-soft)]"
            : "bg-[var(--color-bg)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Logo/Brand Name */}
            <a
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-base sm:text-lg font-semibold text-[var(--color-primary)]">
                ShodaiEV
              </span>
            </a>

            {/* Desktop Navigation/Utility Links */}
            <div className="hidden md:flex items-center gap-4"> {/* Reduced gap for a tighter header */}
              
              {/* Line Contact */}
              {hasLine && (
                <a
                  href={`https://line.me/ti/p/${line}`} // Assuming 'line' is the Line ID or a deep link path
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-primary-soft)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all"
                >
                  <Image
                    src="/LINE_Brand_icon.png"
                    alt="LINE"
                    width={24}
                    height={24}
                    loading="lazy"
                    className="w-6 h-6"
                  />
                  <span className="text-sm sm:text-base font-semibold text-[var(--color-primary)] break-all">
                    {line}
                  </span>
                </a>
              )}

              {/* Phone Contact */}
              {hasPhone && (
                <a
                  href={`tel:${phone}`}
                  onClick={handlePhoneClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-primary-soft)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all"
                >
                  <span className="text-xl" role="img" aria-label="Phone">
                    📞
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[var(--color-primary)] break-all">
                    {phone}
                  </span>
                </a>
              )}

              {/* Main CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-full text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--color-accent), var(--color-primary))",
                }}
              >
                Contact Us
              </motion.a>
            </div>

            {/* Mobile Menu Button (Hamburger/Close) */}
            <button
              type="button"
              className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-primary-soft)] bg-[var(--color-surface)] z-50"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">
                {open ? "Close menu" : "Open menu"}
              </span>
              <div className="relative w-5 h-5">
                <span
                  className={`absolute left-0 right-0 h-[2px] bg-[var(--color-primary)] transition-transform duration-200 ${
                    open ? "top-1/2 -translate-y-[1px] rotate-45" : "top-[4px]"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-[2px] bg-[var(--color-primary)] transition-opacity duration-200 ${
                    open ? "opacity-0" : "top-1/2 -translate-y-[1px]"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-[2px] bg-[var(--color-primary)] transition-transform duration-200 ${
                    open ? "top-1/2 -translate-y-[1px] -rotate-45" : "bottom-[4px]"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                // Added a shadow and background to make the menu stand out better
                className="mt-3 flex flex-col gap-3 md:hidden p-4 rounded-xl shadow-xl bg-[var(--color-bg)] border border-[var(--color-primary-soft)]" 
              >
                <div className="flex flex-col gap-2">
                  {/* Mobile Line Contact */}
                  {hasLine && (
                    <a
                      href={`https://line.me/ti/p/${line}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-primary-soft)] bg-[var(--color-surface)]"
                      onClick={() => setOpen(false)}
                    >
                      <Image
                        src="/LINE_Brand_icon.png"
                        alt="LINE"
                        width={24}
                        height={24}
                        loading="lazy"
                        className="w-6 h-6"
                      />
                      <span className="text-sm font-semibold text-[var(--color-primary)] break-all">
                        {line}
                      </span>
                    </a>
                  )}

                  {/* Mobile Phone Contact */}
                  {hasPhone && (
                    <a
                      href={`tel:${phone}`}
                      onClick={() => {
                        handlePhoneClick();
                        setOpen(false); // Close menu on click
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-primary-soft)] bg-[var(--color-surface)]"
                    >
                      <span className="text-lg" role="img" aria-label="Phone">
                        📞
                      </span>
                      <span className="text-sm font-semibold text-[var(--color-primary)] break-all">
                        {phone}
                      </span>
                    </a>
                  )}
                </div>

                {/* Mobile CTA Button */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex-1 text-center px-4 py-2 rounded-full text-white font-semibold text-sm shadow-sm mt-2" // Added mt-2 for separation
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-accent), var(--color-primary))",
                  }}
                  onClick={() => setOpen(false)}
                >
                  Contact Us
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Spacer to prevent content from hiding behind the fixed header */}
      <div className="h-14 sm:h-16" />
    </>
  );
}