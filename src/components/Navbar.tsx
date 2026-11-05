'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Music2,
  PhoneCall,
  CalendarCheck,
  Menu,
  X,
  Lock,
  Sparkles,
  ChevronRight,
  Home,
  Flame,
  LayoutGrid,
  Camera,
  Tag,
  Star,
  MapPin,
} from 'lucide-react';

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

  // Prevent background scrolling when left drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Clean customer-only navigation links (no admin / shift handover)
  const navLinks = [
    { label: 'Trang chủ', href: '/#home', icon: Home },
    { label: 'Ưu đãi', href: '/#promotions', icon: Flame, badge: 'Hot' },
    { label: 'Không gian phòng', href: '/#rooms', icon: LayoutGrid },
    { label: 'Photobooth', href: '/#photobooth', icon: Camera },
    { label: 'Bảng giá', href: '/#pricing', icon: Tag },
    { label: 'Đánh giá', href: '/#reviews', icon: Star },
    { label: 'Liên hệ', href: '/#contact', icon: MapPin },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-miso-bg/95 backdrop-blur-md shadow-sm border-b border-miso-light/40 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left section for mobile/tablet: Hamburger button + Logo */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-xl text-miso-dark hover:bg-miso-subtle transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Mở thanh điều hướng bên trái"
              >
                <Menu className="w-6 h-6" />
              </button>

              <a
                href="#home"
                className="flex items-center gap-2 group focus:outline-none"
              >
                <div className="w-9 h-9 rounded-xl bg-miso-primary flex items-center justify-center text-miso-bg shadow-sm">
                  <Music2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold tracking-wider text-miso-dark leading-none">
                    MISO
                  </span>
                  <span className="text-[9px] tracking-widest uppercase text-miso-secondary font-semibold mt-0.5">
                    Musicbox & Booth
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Logo */}
            <a
              href="#home"
              className="hidden lg:flex items-center gap-2.5 group focus:outline-none"
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

            {/* Desktop Navigation (Pure customer links) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-miso-dark/80 hover:text-miso-primary transition-colors py-1 relative flex items-center gap-1.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-miso-primary hover:after:w-full after:transition-all after:duration-300"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-miso-accent text-white leading-tight">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href="tel:19006476"
                className="hidden sm:flex items-center gap-2 text-xs font-semibold text-miso-secondary hover:text-miso-dark transition-colors px-3 py-2 rounded-full border border-miso-light/80 hover:border-miso-secondary bg-white/70 shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-miso-accent" />
                <span>1900 6476</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 bg-miso-primary text-white text-xs sm:text-sm font-semibold px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full hover:bg-miso-dark active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Đặt Slot Trước</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* LEFT SLIDE-IN DRAWER */}
      {/* 1. Dark Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Drawer Panel sliding in from the LEFT */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[290px] max-w-[85vw] bg-[#FDFBF7] z-50 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out border-r border-miso-light/70 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng bên trái"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-miso-light/60 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-miso-primary flex items-center justify-center text-white shadow-xs">
              <Music2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-wider text-miso-dark leading-none block">
                MISO
              </span>
              <span className="text-[9px] tracking-widest uppercase text-miso-secondary font-semibold">
                Musicbox & Booth
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-8 h-8 rounded-full bg-miso-subtle hover:bg-miso-light/80 text-miso-dark flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-miso-secondary">
            Khám phá MISO
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-miso-dark/90 hover:bg-white hover:text-miso-primary hover:shadow-2xs transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-miso-secondary/70" />
                  <span>{link.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-miso-accent text-white">
                      {link.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-miso-secondary/40" />
                </div>
              </Link>
            );
          })}

          {/* Quick Notice Card */}
          <div className="mt-5 mx-1 p-3.5 rounded-2xl bg-white border border-miso-light/80 shadow-2xs text-xs text-miso-dark/80">
            <div className="flex items-center gap-1.5 text-miso-primary font-bold text-[11px] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-miso-accent" />
              <span>Chính sách đặt slot</span>
            </div>
            <p className="text-[11px] leading-relaxed text-miso-dark/70">
              Quý khách chỉ cần đặt trước số lượng người đến và giờ, quán MISO sẽ tự sắp xếp căn phòng vừa vặn và chu đáo nhất!
            </p>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-miso-light/60 bg-white space-y-2.5">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full flex items-center justify-center gap-2 bg-miso-primary text-white text-xs sm:text-sm font-semibold py-3 rounded-xl shadow-md hover:bg-miso-dark transition-colors cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Đặt Giữ Slot Trước</span>
          </button>

          <a
            href="tel:19006476"
            className="flex items-center justify-center gap-2 text-xs font-semibold text-miso-dark py-2.5 rounded-xl bg-miso-subtle hover:bg-miso-light/60 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-miso-primary" />
            <span>Hotline: 1900 6476</span>
          </a>

          {/* Discreet Staff link at very bottom */}
          <div className="pt-2 text-center border-t border-miso-light/40">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-miso-dark/40 hover:text-miso-primary transition-colors py-1"
            >
              <Lock className="w-3 h-3" />
              <span>Cổng nhân viên nội bộ & Kết ca</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
