'use client';

import React from 'react';
import { Calendar, ArrowRight, Star, Camera, Volume2 } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-miso-accent/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-miso-light shadow-xs mb-5">
              <span className="w-2 h-2 rounded-full bg-miso-accent animate-pulse" />
              <span className="text-xs font-semibold text-miso-primary">
                Boutique Musicbox & Korean Photobooth Studio
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-miso-dark leading-[1.15] mb-5">
              Nơi Giai Điệu <br />
              <span className="text-miso-primary italic">Gặp Gỡ</span> Khoảnh Khắc.
            </h1>

            <p className="text-base sm:text-lg text-miso-dark/75 leading-relaxed max-w-xl mb-8">
              MISO mang đến trải nghiệm karaoke riêng tư ấm cúng cùng góc studio Photobooth chuẩn Hàn Quốc. Không gian tinh tế để bạn cùng bạn bè ca hát và lưu giữ kỷ niệm đẹp.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 bg-miso-primary text-white font-semibold px-7 py-3.5 rounded-full hover:bg-miso-dark active:scale-[0.98] transition-all shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-miso-accent-light" />
                <span>Đặt Phòng Trải Nghiệm</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href="#pricing"
                className="inline-flex items-center justify-center bg-white text-miso-dark border border-miso-light font-semibold px-6 py-3.5 rounded-full hover:bg-miso-subtle transition-colors text-center"
              >
                Xem Bảng Giá & Menu
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-miso-light/70 max-w-lg">
              <div>
                <div className="flex items-center gap-1 text-miso-dark font-serif text-2xl font-bold">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <p className="text-xs text-miso-secondary mt-0.5">500+ đánh giá</p>
              </div>
              <div>
                <div className="text-miso-dark font-serif text-2xl font-bold">100%</div>
                <p className="text-xs text-miso-secondary mt-0.5">Cách âm chuẩn studio</p>
              </div>
              <div>
                <div className="text-miso-dark font-serif text-2xl font-bold">15s</div>
                <p className="text-xs text-miso-secondary mt-0.5">In ảnh photobooth</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-white border border-miso-light/60">
              <div className="relative h-80 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
                  alt="MISO Karaoke Lounge"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-miso-dark/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  Phòng 203 • Neon Dreamscape
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs text-miso-accent-light uppercase tracking-wider font-semibold">Signature Room</p>
                  <h3 className="font-serif text-xl font-bold mt-1">Hát say mê trong ánh sáng ma mị</h3>
                </div>
              </div>
              <div className="p-4 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-miso-accent-light flex items-center justify-center text-miso-primary">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-miso-secondary">Đi kèm dịch vụ</p>
                    <p className="text-sm font-bold text-miso-dark">Khu Photobooth Hàn Quốc</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-miso-primary bg-miso-bg px-2.5 py-1 rounded-md border border-miso-light/60">
                  50+ Phụ kiện cute
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
