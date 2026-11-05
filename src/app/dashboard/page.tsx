'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  weeklyStats,
  initialBookings,
  initialMusicboxShifts,
  initialPhotoboothShifts,
} from '@/data/dashboard-data';
import { WeeklyStatsView } from '@/components/dashboard/WeeklyStatsView';
import { BookingListView } from '@/components/dashboard/BookingListView';
import { MusicboxShiftView } from '@/components/dashboard/MusicboxShiftView';
import { PhotoboothShiftView } from '@/components/dashboard/PhotoboothShiftView';
import { CashReconcileCalculator } from '@/components/dashboard/CashReconcileCalculator';
import {
  BarChart3,
  ClipboardList,
  Music2,
  Camera,
  ArrowLeft,
  Sparkles,
  Shield,
  Layers,
  Calculator,
} from 'lucide-react';

type TabType = 'weekly' | 'bookings' | 'musicbox' | 'photobooth' | 'calculator';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('weekly');
  const [currentDateStr, setCurrentDateStr] = useState<string>('');

  useEffect(() => {
    setCurrentDateStr(
      new Date().toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  const tabs = [
    {
      id: 'weekly' as TabType,
      label: 'Dashboard Tuần',
      icon: BarChart3,
      desc: 'Thống kê người đặt & tăng trưởng',
    },
    {
      id: 'bookings' as TabType,
      label: 'Danh Sách Khách Đặt',
      icon: ClipboardList,
      desc: 'Lọc & Xuất Excel theo ngày',
    },
    {
      id: 'musicbox' as TabType,
      label: 'Kết Ca Musicbox',
      icon: Music2,
      desc: 'Chốt doanh thu & micro phòng hát',
    },
    {
      id: 'photobooth' as TabType,
      label: 'Kết Ca Photobooth',
      icon: Camera,
      desc: 'Chốt lượt chụp & giấy in ảnh',
    },
    {
      id: 'calculator' as TabType,
      label: 'Đối Soát Ca (Âm / Dương)',
      icon: Calculator,
      desc: 'Công thức: Tiền mặt + Số dư - Tiền cốt',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-miso-dark antialiased">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-miso-light/70 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-miso-secondary hover:text-miso-dark px-3 py-1.5 rounded-full bg-miso-subtle border border-miso-light/60 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Về Trang Chủ</span>
            </Link>

            <div className="h-4 w-px bg-miso-light" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-miso-primary flex items-center justify-center text-white shadow-xs">
                <Music2 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-base text-miso-dark">MISO</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-miso-primary/10 text-miso-primary px-2 py-0.5 rounded-md">
                    Portal Quản Trị
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-miso-secondary">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-miso-dark">Hệ thống trực tuyến</span>
            <span className="text-miso-light">|</span>
            <span className="text-[11px]">{currentDateStr || 'Hôm nay'}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-2 rounded-3xl border border-miso-light/60 shadow-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-miso-primary text-white shadow-md'
                    : 'text-miso-secondary hover:text-miso-dark hover:bg-miso-subtle'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-miso-subtle text-miso-primary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-miso-dark'}`}>
                    {tab.label}
                  </div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-miso-secondary'}`}>
                    {tab.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="transition-all duration-300">
          {activeTab === 'weekly' && <WeeklyStatsView stats={weeklyStats} />}
          {activeTab === 'bookings' && <BookingListView bookings={initialBookings} />}
          {activeTab === 'musicbox' && <MusicboxShiftView shifts={initialMusicboxShifts} />}
          {activeTab === 'photobooth' && <PhotoboothShiftView shifts={initialPhotoboothShifts} />}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <CashReconcileCalculator
                title="Máy Tính Đối Soát Ca Siêu Tốc (Âm / Dương)"
                subtitle="Nhập 4 chỉ số để tự động so sánh số tiền nhân viên đang giữ xem bị Âm hay Dương"
              />
              <div className="bg-white rounded-3xl p-6 border border-miso-light/70 shadow-xs space-y-3">
                <h4 className="font-serif text-base font-bold text-miso-dark flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-miso-primary" />
                  <span>Quy Tắc Đối Soát Ca Chuẩn MISO</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <div className="font-bold text-amber-900 mb-1">1. Xác định số tiền ca</div>
                    <p className="text-miso-secondary text-[11px] leading-relaxed">
                      Lấy tổng <strong>Tiền mặt thu</strong> cộng với <strong>Tiền số dư (chuyển khoản QR ngân hàng)</strong>.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200">
                    <div className="font-bold text-rose-900 mb-1">2. Trừ tiền cốt đầu ca</div>
                    <p className="text-miso-secondary text-[11px] leading-relaxed">
                      Trừ đi <strong>Tiền cốt đầu ca</strong> (khoản vốn lẻ giao lúc nhận ca) để ra doanh thu chuẩn cần nộp.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <div className="font-bold text-emerald-900 mb-1">3. So sánh với NV giữ</div>
                    <p className="text-miso-secondary text-[11px] leading-relaxed">
                      So sánh với <strong>Tiền nhân viên thực tế giữ</strong>: lớn hơn là <strong>DƯƠNG (+)</strong> (thừa tiền), nhỏ hơn là <strong>ÂM (-)</strong> (thiếu hụt quỹ).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
