'use client';

import React from 'react';
import { CheckCircle2, Sparkles, Users, Clock, Calendar } from 'lucide-react';

interface BookingSuccessProps {
  code: string;
  fullName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  hours: number;
  includeBooth?: boolean;
  note?: string;
  onClose: () => void;
  roomCode?: string; // Backwards compatible optional prop
}

export function BookingSuccess({
  code,
  fullName,
  phone,
  date,
  time,
  guests,
  hours,
  includeBooth = false,
  note,
  onClose,
}: BookingSuccessProps) {
  return (
    <div className="p-6 sm:p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <span className="text-xs font-bold text-miso-secondary tracking-widest uppercase">
        Đặt slot giữ chỗ thành công!
      </span>
      <h3 className="font-serif text-2xl font-bold text-miso-dark mt-1 mb-2">
        Hẹn Gặp Bạn Tại MISO
      </h3>

      <div className="bg-miso-bg p-4 rounded-2xl border border-miso-light/80 my-4 text-left text-xs space-y-2.5 shadow-2xs">
        <div className="flex justify-between items-center pb-2 border-b border-miso-light/60">
          <span className="text-miso-secondary">Mã đặt slot:</span>
          <span className="font-bold text-miso-primary font-mono text-sm">{code}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-miso-secondary">Khách hàng:</span>
          <span className="font-semibold text-miso-dark">{fullName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-miso-secondary">Số điện thoại:</span>
          <span className="font-semibold text-miso-dark">{phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-miso-secondary">Thời gian hẹn:</span>
          <span className="font-semibold text-miso-dark">{time} • {date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-miso-secondary">Số lượng khách:</span>
          <span className="font-bold text-miso-primary bg-white px-2.5 py-0.5 rounded-lg border border-miso-light/80 text-[11px] shadow-2xs">
            {guests} khách (Quán tự xếp phòng)
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-miso-secondary">Thời gian hát:</span>
          <span className="font-semibold text-miso-dark">{hours} giờ</span>
        </div>
        <div className="flex justify-between">
          <span className="text-miso-secondary">Photobooth:</span>
          <span className="font-semibold text-miso-dark">
            {includeBooth ? 'Có (Chụp 2 tặng 1)' : 'Không'}
          </span>
        </div>
        {note && (
          <div className="flex justify-between pt-1 border-t border-miso-light/40">
            <span className="text-miso-secondary">Ghi chú:</span>
            <span className="font-medium text-miso-dark italic text-right max-w-[200px] truncate">{note}</span>
          </div>
        )}
      </div>

      <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 mb-5 leading-relaxed text-left flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <span>
          MISO đã lưu slot của bạn cho đoàn <strong>{guests} người</strong>. Nhân viên sẽ tự động chuẩn bị căn phòng tốt nhất và gọi điện xác nhận trong vòng 10 phút!
        </span>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-miso-primary text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl hover:bg-miso-dark cursor-pointer transition-all shadow-md active:scale-[0.99]"
      >
        Hoàn Tất & Đóng
      </button>
    </div>
  );
}
