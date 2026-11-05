'use client';

import React, { useState } from 'react';
import { DayWeeklyStat } from '@/types';
import { Sparkles, Calendar, ArrowUpRight, Users, TrendingUp, Music2, Camera, Layers, Clock } from 'lucide-react';

interface WeeklyStatsViewProps {
  stats: DayWeeklyStat[];
}

export function WeeklyStatsView({ stats }: WeeklyStatsViewProps) {
  const [selectedDay, setSelectedDay] = useState<DayWeeklyStat>(stats[stats.length - 3] || stats[0]);

  const totalBookings = stats.reduce((acc, cur) => acc + cur.totalBookings, 0);
  const totalRevenue = stats.reduce((acc, cur) => acc + cur.revenue, 0);
  const totalGuests = stats.reduce((acc, cur) => acc + cur.totalGuests, 0);
  const avgOccupancy = Math.round(stats.reduce((acc, cur) => acc + cur.occupancyRate, 0) / stats.length);
  const maxBookings = Math.max(...stats.map((s) => s.totalBookings), 1);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-miso-dark via-[#4E342E] to-miso-primary rounded-3xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-miso-accent-light text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Báo Cáo Hoạt Động Tuần Hiện Tại</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide">
              Thống Kê Đặt Chỗ & Doanh Thu
            </h2>
            <p className="text-white/75 text-xs sm:text-sm mt-1">
              Phân tích số lượt khách theo ngày, loại dịch vụ Musicbox, Photobooth và Combo.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-xs self-start md:self-auto">
            <Calendar className="w-4 h-4 text-miso-accent-light" />
            <div>
              <div className="text-[10px] text-white/60 uppercase font-semibold">Chu kỳ</div>
              <div className="font-bold">{stats[0]?.date} - {stats[stats.length - 1]?.date}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-5 border-t border-white/10">
          <div className="bg-black/20 rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center justify-between text-white/70 text-xs mb-1">
              <span>Tổng Lượt Đặt</span>
              <span className="flex items-center text-emerald-300 text-[10px] font-bold">
                +18% <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
            <div className="text-2xl font-extrabold text-white">{totalBookings}</div>
            <div className="text-[10px] text-white/60">Lượt phòng & booth</div>
          </div>

          <div className="bg-black/20 rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center justify-between text-white/70 text-xs mb-1">
              <span>Doanh Thu Tuần</span>
              <span className="flex items-center text-emerald-300 text-[10px] font-bold">
                +24% <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
            <div className="text-2xl font-extrabold text-miso-accent-light">
              {(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-[10px] text-white/60">{totalRevenue.toLocaleString('vi-VN')} đ</div>
          </div>

          <div className="bg-black/20 rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center justify-between text-white/70 text-xs mb-1">
              <span>Khách Trải Nghiệm</span>
              <Users className="w-3.5 h-3.5 text-white/50" />
            </div>
            <div className="text-2xl font-extrabold text-white">{totalGuests}</div>
            <div className="text-[10px] text-white/60">Khách đón tiếp</div>
          </div>

          <div className="bg-black/20 rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center justify-between text-white/70 text-xs mb-1">
              <span>Công Suất Phòng</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-300">{avgOccupancy}%</div>
            <div className="text-[10px] text-white/60">Bình quân tuần</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-miso-light/60 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-miso-dark">
                Biểu Đồ Lượt Đặt Theo Các Ngày
              </h3>
              <p className="text-xs text-miso-secondary">Bấm vào từng cột ngày để xem chi tiết</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-miso-primary">
                <span className="w-2.5 h-2.5 rounded-full bg-miso-primary" /> Musicbox
              </span>
              <span className="flex items-center gap-1.5 text-miso-accent">
                <span className="w-2.5 h-2.5 rounded-full bg-miso-accent" /> Photobooth
              </span>
            </div>
          </div>

          <div className="pt-4 pb-2">
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-miso-light">
              {stats.map((day) => {
                const isSelected = selectedDay.date === day.date;
                const hPercent = Math.round((day.totalBookings / maxBookings) * 100);
                const mbPercent = Math.round((day.musicboxCount / day.totalBookings) * 100);
                const pbPercent = 100 - mbPercent;

                return (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDay(day)}
                    className="flex-1 flex flex-col items-center h-full justify-end group focus:outline-none cursor-pointer"
                  >
                    <span className={`text-[10px] font-bold mb-1 transition-all ${isSelected ? 'text-miso-primary scale-110' : 'text-miso-secondary'}`}>
                      {day.totalBookings}
                    </span>
                    <div
                      style={{ height: `${hPercent}%` }}
                      className={`w-full max-w-[38px] rounded-t-lg overflow-hidden flex flex-col justify-end transition-all ${
                        isSelected ? 'ring-2 ring-miso-primary ring-offset-2 shadow-md' : 'opacity-85 hover:opacity-100 group-hover:scale-105'
                      }`}
                    >
                      <div style={{ height: `${pbPercent}%` }} className="w-full bg-miso-accent" />
                      <div style={{ height: `${mbPercent}%` }} className="w-full bg-miso-primary" />
                    </div>
                    <div className="mt-2 text-center">
                      <div className={`text-xs font-bold ${isSelected ? 'text-miso-primary' : 'text-miso-dark'}`}>
                        {day.dayName}
                      </div>
                      <div className="text-[10px] text-miso-secondary">{day.date.slice(5)}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-miso-secondary gap-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-miso-accent" />
              Giờ cao điểm: <b className="text-miso-dark">18:30 - 22:30</b>
            </span>
            <span className="text-[11px] bg-miso-subtle px-3 py-1 rounded-full font-medium">
              Thứ 6 - CN tăng <b className="text-emerald-600">+42%</b>
            </span>
          </div>
        </div>
        {/* Selected Day Details */}
        <div className="bg-white rounded-3xl p-6 border border-miso-light/60 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-miso-light/60">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-miso-secondary">Chi tiết</span>
                <h4 className="font-serif text-xl font-bold text-miso-dark">{selectedDay.fullDay}</h4>
                <div className="text-xs text-miso-secondary">{selectedDay.date}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                Lấp đầy: {selectedDay.occupancyRate}%
              </span>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-miso-primary text-white flex items-center justify-center">
                    <Music2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-miso-dark">Phòng Hát Musicbox</div>
                    <div className="text-[10px] text-miso-secondary">Karaoke boutique</div>
                  </div>
                </div>
                <div className="text-sm font-extrabold text-miso-dark">{selectedDay.musicboxCount} lượt</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-miso-accent text-white flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-miso-dark">Photobooth Studio</div>
                    <div className="text-[10px] text-miso-secondary">Studio ảnh Hàn</div>
                  </div>
                </div>
                <div className="text-sm font-extrabold text-miso-dark">{selectedDay.photoboothCount} lượt</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-miso-dark text-white flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-miso-dark">Combo Trọn Gói</div>
                    <div className="text-[10px] text-miso-secondary">Hát + Chụp + Nước</div>
                  </div>
                </div>
                <div className="text-sm font-extrabold text-miso-dark">{selectedDay.comboCount} combo</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-miso-light/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-miso-secondary">Doanh thu ngày:</span>
              <span className="text-base font-extrabold text-miso-primary">
                {selectedDay.revenue.toLocaleString('vi-VN')} đ
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-miso-secondary">Khách phục vụ:</span>
              <span className="font-bold text-miso-dark">{selectedDay.totalGuests} người</span>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}
