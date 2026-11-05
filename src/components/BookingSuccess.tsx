'use client';

import React from 'react';
import { CheckCircle2, PhoneCall } from 'lucide-react';

interface BookingSuccessProps {
  code: string;
  fullName: string;
  phone: string;
  date: string;
  time: string;
  roomCode: string;
  hours: number;
  onClose: () => void;
}

export function BookingSuccess({
  code,
  fullName,
  phone,
  date,
  time,
  roomCode,
  hours,
  onClose,
}: BookingSuccessProps) {
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="text-xs font-bold text-miso-secondary tracking-widest uppercase">
        Đặt phòng thành công!
      </span>
      <h3 className="font-serif text-2xl font-bold text-miso-dark mt-1 mb-2">
        Hẹn Gặp Bạn Tại MISO
      </h3>

      <div className="bg-miso-bg p-4 rounded-2xl border border-miso-light/80 my-5 text-left text-xs space-y-2">
        <div className="flex justify-between">
          <span className="text-miso-secondary">Mã đặt phòng:</span>
          <span className="font-bold text-miso-primary font-mono">{code}</span>
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
          <span className="text-miso-secondary">Thời gian:</span>
          <span className="font-semibold text-miso-dark">{time} • {date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-miso-secondary">Phòng & Thời lượng:</span>
          <span className="font-semibold text-miso-dark">Phòng {roomCode} ({hours} giờ)</span>
        </div>
      </div>

      <p className="text-[11px] text-miso-dark/70 mb-5">
        Nhân viên MISO sẽ gọi điện xác nhận trong vòng 10 phút.
      </p>

      <button
        onClick={onClose}
        className="w-full bg-miso-primary text-white font-bold text-xs py-3 rounded-xl hover:bg-miso-dark cursor-pointer transition-all"
      >
        Hoàn Tất & Đóng
      </button>
    </div>
  );
}
