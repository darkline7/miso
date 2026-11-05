'use client';

import React from 'react';
import { Sparkles, Users, Minus, Plus, Info } from 'lucide-react';

export interface BookingFormProps {
  fullName: string;
  setFullName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  time: string;
  setTime: (v: string) => void;
  guests: number;
  setGuests: (v: number) => void;
  hours: number;
  setHours: (v: number) => void;
  includeBooth?: boolean;
  setIncludeBooth?: (v: boolean) => void;
  note?: string;
  setNote?: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  selectedRoom?: string;
  setSelectedRoom?: (v: string) => void;
}

export function BookingForm(props: BookingFormProps) {
  const guestPresets = [2, 4, 6, 8, 12, 16];

  const getRoomArrangementText = (count: number) => {
    if (count <= 2) return 'Quán sẽ xếp phòng Cozy Studio riêng tư, ấm cúng (1-2 người)';
    if (count <= 4) return 'Quán sẽ xếp phòng Acoustic Standard chuẩn âm (3-4 người)';
    if (count <= 8) return 'Quán sẽ xếp phòng Velvet VIP Lounge cao cấp, sofa chữ L (5-8 người)';
    return 'Quán sẽ xếp phòng Grand Suite Party sân khấu rộng, âm thanh vòm tiệc (9-20+ người)';
  };

  const handleAdjustGuests = (delta: number) => {
    const next = Math.max(1, Math.min(35, props.guests + delta));
    props.setGuests(next);
  };

  return (
    <form onSubmit={props.onSubmit} className="space-y-3.5">
      {/* Policy banner: Khách chỉ đặt slot và chọn số lượng người, quán tự xếp phòng */}
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3 text-xs text-amber-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-[11px] text-amber-950 uppercase tracking-wide">
            Chính sách đặt slot & Xếp phòng
          </p>
          <p className="text-[11px] leading-relaxed text-amber-900/90">
            Khách chỉ cần đặt slot trước và chọn <strong>số lượng người</strong>. Quán MISO sẽ <strong>tự động bố trí căn phòng thích hợp nhất</strong> theo số người của bạn!
          </p>
        </div>
      </div>

      {/* Thông tin khách hàng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-miso-dark block mb-1">Họ và tên *</label>
          <input
            type="text"
            required
            value={props.fullName}
            onChange={(e) => props.setFullName(e.target.value)}
            placeholder="Nguyễn Văn A"
            className="w-full bg-miso-input border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-miso-dark block mb-1">Số điện thoại *</label>
          <input
            type="tel"
            required
            value={props.phone}
            onChange={(e) => props.setPhone(e.target.value)}
            placeholder="09xx xxx xxx"
            className="w-full bg-miso-input border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Số lượng khách đi cùng (Quán tự xếp phòng) */}
      <div className="bg-miso-subtle/80 border border-miso-light/80 rounded-2xl p-3 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-miso-dark flex items-center gap-1.5">
            <Users className="w-4 h-4 text-miso-primary" />
            <span>Đoàn đi bao nhiêu người?</span>
          </label>
          <span className="text-[11px] font-bold text-miso-primary bg-white px-2 py-0.5 rounded-full border border-miso-light">
            {props.guests} người
          </span>
        </div>

        {/* Chips chọn nhanh */}
        <div className="flex flex-wrap gap-1.5">
          {guestPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => props.setGuests(preset)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                props.guests === preset
                  ? 'bg-miso-primary text-white shadow-2xs'
                  : 'bg-white text-miso-dark/80 border border-miso-light hover:border-miso-primary'
              }`}
            >
              {preset === 16 ? '16+ người' : `${preset} người`}
            </button>
          ))}
        </div>

        {/* Bộ đếm Stepper */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <div className="flex items-center bg-white rounded-xl border border-miso-light/90 shadow-2xs overflow-hidden">
            <button
              type="button"
              onClick={() => handleAdjustGuests(-1)}
              className="p-1.5 text-miso-dark hover:bg-miso-subtle transition-colors cursor-pointer"
              aria-label="Giảm 1 người"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-xs font-bold text-miso-dark select-none">
              {props.guests}
            </span>
            <button
              type="button"
              onClick={() => handleAdjustGuests(1)}
              className="p-1.5 text-miso-dark hover:bg-miso-subtle transition-colors cursor-pointer"
              aria-label="Tăng 1 người"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-miso-secondary italic leading-tight">
            {getRoomArrangementText(props.guests)}
          </p>
        </div>
      </div>

      {/* Khung giờ đến (Slot) */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-miso-dark block mb-1">Ngày đến (Slot) *</label>
          <input
            type="date"
            required
            value={props.date}
            onChange={(e) => props.setDate(e.target.value)}
            className="w-full bg-miso-input border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-miso-dark block mb-1">Giờ đến dự kiến *</label>
          <input
            type="time"
            required
            value={props.time}
            onChange={(e) => props.setTime(e.target.value)}
            className="w-full bg-miso-input border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Thời gian dự kiến hát */}
      <div>
        <label className="text-xs font-semibold text-miso-dark block mb-1">Thời gian dự kiến hát</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 1, label: '1 Giờ' },
            { value: 2, label: '2 Giờ (Khuyên dùng)' },
            { value: 3, label: '3 Giờ (-10%)' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => props.setHours(item.value)}
              className={`py-2 px-2 text-center text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                props.hours === item.value
                  ? 'bg-miso-primary text-white border-miso-primary font-bold shadow-2xs'
                  : 'bg-white text-miso-dark/80 border-miso-light hover:border-miso-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ghi chú thêm */}
      <div>
        <label className="text-xs font-semibold text-miso-dark block mb-1">
          Ghi chú cho quán (Tùy chọn)
        </label>
        <input
          type="text"
          value={props.note || ''}
          onChange={(e) => props.setNote?.(e.target.value)}
          placeholder="Ví dụ: Đặt tiệc sinh nhật, cần đĩa bánh kem, mic phụ..."
          className="w-full bg-miso-input border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-2 bg-miso-primary text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl hover:bg-miso-dark active:scale-[0.99] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-miso-accent-light" />
        <span>Xác Nhận Giữ Slot (Quán Tự Xếp Phòng)</span>
      </button>
    </form>
  );
}
