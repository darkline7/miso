'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { ROOMS } from '@/data';

interface BookingFormProps {
  fullName: string;
  setFullName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  selectedRoom: string;
  setSelectedRoom: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  time: string;
  setTime: (v: string) => void;
  guests: number;
  setGuests: (v: number) => void;
  hours: number;
  setHours: (v: number) => void;
  includeBooth: boolean;
  setIncludeBooth: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function BookingForm(props: BookingFormProps) {
  return (
    <form onSubmit={props.onSubmit} className="space-y-3.5">
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

      <div>
        <label className="text-xs font-semibold text-miso-dark block mb-1">Chọn phòng</label>
        <select
          value={props.selectedRoom}
          onChange={(e) => props.setSelectedRoom(e.target.value)}
          className="w-full bg-miso-input border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
        >
          {ROOMS.map((r) => (
            <option key={r.code} value={r.code}>
              {r.name} ({r.capacity}) - {r.pricePerHour.toLocaleString('vi-VN')}đ/h
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-miso-dark block mb-1">Ngày đến</label>
          <input
            type="date"
            required
            value={props.date}
            onChange={(e) => props.setDate(e.target.value)}
            className="w-full bg-miso-input border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-miso-dark block mb-1">Giờ đến</label>
          <input
            type="time"
            required
            value={props.time}
            onChange={(e) => props.setTime(e.target.value)}
            className="w-full bg-miso-input border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-miso-dark block mb-1">Số khách</label>
          <input
            type="number"
            min="1"
            max="30"
            value={props.guests}
            onChange={(e) => props.setGuests(Number(e.target.value))}
            className="w-full bg-miso-input border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-miso-dark block mb-1">Thời gian (giờ)</label>
          <select
            value={props.hours}
            onChange={(e) => props.setHours(Number(e.target.value))}
            className="w-full bg-miso-input border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
          >
            <option value={1}>1 Giờ</option>
            <option value={2}>2 Giờ</option>
            <option value={3}>3 Giờ (-10%)</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs font-medium text-miso-dark pt-1 cursor-pointer">
        <input
          type="checkbox"
          checked={props.includeBooth}
          onChange={(e) => props.setIncludeBooth(e.target.checked)}
        />
        <span>Chụp ảnh Photobooth (Chụp 2 tặng 1)</span>
      </label>

      <button
        type="submit"
        className="w-full mt-3 bg-miso-primary text-white font-bold text-xs py-3 rounded-xl hover:bg-miso-dark transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-miso-accent-light" />
        <span>Xác Nhận Đặt Phòng</span>
      </button>
    </form>
  );
}
