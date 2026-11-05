'use client';

import React, { useState, useEffect } from 'react';
import { Music2, Camera, PhoneCall, CalendarCheck, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang chủ', href: '#home' },
    { label: 'Ưu đãi', href: '#promotions' },
    { label: 'Hệ thống phòng', href: '#rooms' },
    { label: 'Photobooth', href: '#photobooth' },
    { label: 'Bảng giá', href: '#pricing' },
    { label: 'Đánh giá', href: '#reviews' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-miso-bg/90 backdrop-blur-md shadow-sm border-b border-miso-light/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-miso-primary flex items-center justify-center text-miso-bg shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Music2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-miso-dark leading-none">
                MISO
              </span>
              <span className="text-[10px] tracking-widest uppercase text-miso-secondary font-semibold mt-0.5">
                Musicbox & Booth
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-miso-dark/80 hover:text-miso-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-miso-primary hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:19006476"
              className="hidden xl:flex items-center gap-2 text-xs font-semibold text-miso-secondary hover:text-miso-dark transition-colors px-3 py-2 rounded-full border border-miso-light/80 hover:border-miso-secondary"
            >
              <PhoneCall className="w-3.5 h-3.5 text-miso-accent" />
              <span>Hotline: 1900 6476</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 bg-miso-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-miso-dark active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Đặt Phòng Ngay</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-miso-dark hover:bg-miso-subtle transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-5 px-3 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-miso-light/60 transition-all">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-miso-dark hover:bg-miso-bg hover:text-miso-primary rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-3 border-t border-miso-light/50 flex flex-col gap-2">
              <a
                href="tel:19006476"
                className="flex items-center justify-center gap-2 text-xs font-semibold text-miso-dark py-2 rounded-lg bg-miso-subtle"
              >
                <PhoneCall className="w-3.5 h-3.5 text-miso-primary" />
                <span>Hotline: 1900 6476 (09:00 - 02:00)</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 bg-miso-primary text-white text-sm font-semibold py-3 rounded-xl shadow-md hover:bg-miso-dark transition-colors"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Đặt Lịch Hẹn Ngay</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
