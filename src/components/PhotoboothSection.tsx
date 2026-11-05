'use client';

import React from 'react';
import { Camera, QrCode, Sparkles, Heart, Zap, Smile } from 'lucide-react';

interface PhotoboothSectionProps {
  onOpenBooking: () => void;
}

export function PhotoboothSection({ onOpenBooking }: PhotoboothSectionProps) {
  const steps = [
    {
      icon: Smile,
      title: '1. Chọn Phụ Kiện Xinh Xắn',
      desc: 'Hơn 50+ mẫu băng đô gấu dâu, nón thú bông Hàn Quốc, kính Y2K độc lạ hoàn toàn miễn phí.',
    },
    {
      icon: Camera,
      title: '2. Pose Dáng Tự Nhiên',
      desc: 'Ánh sáng studio làm mịn da chuẩn Beauty Hàn, ống kính Canon góc rộng bắt trọn biểu cảm vui vẻ.',
    },
    {
      icon: Zap,
      title: '3. In Ảnh Lấy Ngay Trong 15 Giây',
      desc: 'Công nghệ in nhiệt DNP Nhật Bản kháng nước, giữ màu sắc sống động bền đẹp đến 10 năm.',
    },
    {
      icon: QrCode,
      title: '4. Quét QR Tải File Gốc & GIF',
      desc: 'Tải tức thì file ảnh số chất lượng cao cùng video hậu trường slow-motion siêu dễ thương.',
    },
  ];

  return (
    <section id="photobooth" className="py-20 bg-white border-y border-miso-light/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Photobooth Strip Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-4 bg-miso-bg rounded-3xl shadow-xl border border-miso-light/80 max-w-xs w-full">
              {/* Photo strip container */}
              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-miso-light/60 flex flex-col gap-2.5">
                <div className="h-28 rounded-lg overflow-hidden bg-miso-light">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80"
                    alt="Photobooth pose 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-28 rounded-lg overflow-hidden bg-miso-light">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
                    alt="Photobooth pose 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-28 rounded-lg overflow-hidden bg-miso-light">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Photobooth pose 3"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Strip footer */}
                <div className="pt-2 flex items-center justify-between border-t border-miso-light/50 px-1">
                  <div>
                    <span className="font-serif font-bold text-xs text-miso-primary tracking-widest block">
                      MISO PHOTOBOOTH
                    </span>
                    <span className="text-[9px] text-miso-secondary">SEOUL VIBE STUDIO</span>
                  </div>
                  <div className="w-8 h-8 rounded bg-miso-subtle flex items-center justify-center text-miso-primary">
                    <QrCode className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-miso-primary text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-miso-accent-light" />
                <span>Chụp 2 tặng 1</span>
              </div>
            </div>
          </div>

          {/* Copy and Process Steps */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-miso-subtle text-miso-primary text-xs font-semibold mb-3">
              <Camera className="w-3.5 h-3.5 text-miso-accent" />
              <span>Studio 4 Khung Hình Hàn Quốc</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-miso-dark mb-4">
              Lưu Giữ Nụ Cười Cùng Góc Photobooth Xịn Xò
            </h2>

            <p className="text-sm md:text-base text-miso-dark/75 leading-relaxed mb-8">
              Không chỉ là ca hát, MISO còn là điểm check-in không thể bỏ lỡ với khu vực studio chụp hình phong cách Hàn Quốc. Cùng bạn bè lưu giữ những khoảnh khắc rạng rỡ nhất!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {steps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-miso-bg border border-miso-light/60">
                    <div className="w-9 h-9 rounded-xl bg-white text-miso-primary flex items-center justify-center shadow-xs mb-3">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs text-miso-dark mb-1">{step.title}</h3>
                    <p className="text-[11px] text-miso-dark/70 leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-miso-primary text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full hover:bg-miso-dark transition-all shadow-md cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-300" />
              <span>Đặt Lịch Trải Nghiệm Cả Hát & Chụp Ảnh</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
