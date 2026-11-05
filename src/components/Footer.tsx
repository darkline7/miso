'use client';

import React from 'react';
import { Music2, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-miso-dark text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-miso-accent flex items-center justify-center text-miso-dark">
                <Music2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider">MISO</span>
            </div>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed mb-4">
              Tổ hợp Musicbox & Studio Photobooth chuẩn Hàn Quốc đầu tiên tại TP.HCM. Không gian riêng tư, thiết bị âm thanh đỉnh cao và kỷ niệm ngọt ngào.
            </p>
            <p className="text-xs text-miso-accent-light font-medium">
              Hotline hỗ trợ 24/7: 1900 6476
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-miso-accent-light mb-4">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li><a href="/#home" className="hover:text-white transition-colors">Trang chủ</a></li>
              <li><a href="/#promotions" className="hover:text-white transition-colors">Combo ưu đãi</a></li>
              <li><a href="/#rooms" className="hover:text-white transition-colors">Hệ thống phòng hát</a></li>
              <li><a href="/#photobooth" className="hover:text-white transition-colors">Photobooth chuẩn Hàn</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Bảng giá niêm yết</a></li>
              <li><a href="/dashboard" className="text-white/40 hover:text-white transition-colors flex items-center gap-1 text-[11px] pt-1">🔒 Nhân viên nội bộ (Kết ca)</a></li>
            </ul>
          </div>

          {/* Operating Hours & Policy */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-miso-accent-light mb-4">
              Thời Gian & Quy Định
            </h4>
            <div className="space-y-2 text-xs text-white/75">
              <p>Mở cửa: <span className="text-white font-semibold">09:00 - 02:00</span> (Mỗi ngày)</p>
              <p>Đổi lịch trước: <span className="text-white font-semibold">2 tiếng</span></p>
              <p>Bánh kem sinh nhật: <span className="text-white font-semibold">Free mang vào</span></p>
              <p className="pt-2 text-[11px] text-white/50">123 Đường Nâu Trắng, Quận Trung Tâm, TP.HCM</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 MISO Musicbox & Photobooth. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> for music & memory lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
