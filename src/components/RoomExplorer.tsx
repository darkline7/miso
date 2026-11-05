'use client';

import React, { useState } from 'react';
import { ROOMS } from '@/data';
import { Room } from '@/types';
import { Users, Sparkles, Check, ArrowRight } from 'lucide-react';

interface RoomExplorerProps {
  onSelectRoom: (room: Room) => void;
}

export function RoomExplorer({ onSelectRoom }: RoomExplorerProps) {
  const [filter, setFilter] = useState<'all' | 'standard' | 'vip' | 'party'>('all');

  const filteredRooms = filter === 'all'
    ? ROOMS
    : ROOMS.filter((room) => room.category === filter);

  const categories = [
    { key: 'all', label: 'Tất Cả Các Phòng' },
    { key: 'standard', label: 'Tiêu Chuẩn (2-4 ng)' },
    { key: 'vip', label: 'VIP Lounge (5-8 ng)' },
    { key: 'party', label: 'Party Suite (8-20 ng)' },
  ] as const;

  return (
    <section id="rooms" className="py-20 bg-miso-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-miso-light text-miso-primary text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-miso-accent" />
            <span>Hệ Thống Không Gian</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-miso-dark mb-4">
            Khám Phá Các Phòng Hát MISO
          </h2>
          <p className="text-sm md:text-base text-miso-dark/70">
            Mỗi phòng tại MISO là một phong cách độc đáo, cách âm tuyệt đối và trang bị hệ thống âm thanh tiêu chuẩn phòng thu.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === cat.key
                  ? 'bg-miso-primary text-white shadow-sm'
                  : 'bg-white text-miso-dark/80 hover:bg-miso-subtle border border-miso-light/70'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-miso-light/70 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-miso-light">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5 bg-miso-primary text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {room.code}
                </div>
                <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md text-miso-dark text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <Users className="w-3 h-3 text-miso-secondary" />
                  <span>{room.capacity}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-miso-dark mb-2">
                    {room.name}
                  </h3>
                  <p className="text-xs text-miso-dark/70 line-clamp-2 leading-relaxed mb-4">
                    {room.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-miso-light/50 mb-6">
                    {room.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-miso-secondary">
                        <Check className="w-3 h-3 text-miso-accent" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-miso-light/60 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-miso-secondary block">Giá từ</span>
                    <span className="text-base font-bold text-miso-primary font-serif">
                      {room.pricePerHour.toLocaleString('vi-VN')}đ
                      <span className="text-xs font-normal text-miso-dark/60 font-sans">/giờ</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectRoom(room)}
                    className="flex items-center gap-1.5 bg-miso-primary text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-miso-dark transition-colors cursor-pointer"
                  >
                    <span>Chọn phòng</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
