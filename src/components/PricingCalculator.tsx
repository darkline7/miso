'use client';

import React, { useState } from 'react';
import { PRICING_CATEGORIES } from '@/data';
import { Calculator, Tag, ArrowRight } from 'lucide-react';

interface Props {
  onOpenBookingWithPlan?: (plan: { roomType: string; hours: number }) => void;
}

export function PricingCalculator({ onOpenBookingWithPlan }: Props) {
  const [activeTab, setActiveTab] = useState(PRICING_CATEGORIES[0].id);
  const [calcRoom, setCalcRoom] = useState<'standard' | 'vip' | 'party'>('standard');
  const [calcHours, setCalcHours] = useState(2);
  const [includeBooth, setIncludeBooth] = useState(true);

  const roomRates = { standard: 99000, vip: 149000, party: 219000 };
  const rawTotal = roomRates[calcRoom] * calcHours + (includeBooth ? 70000 : 0);
  const discount = calcHours >= 3 ? Math.round(rawTotal * 0.1) : 0;
  const finalTotal = rawTotal - discount;

  const currentCategory = PRICING_CATEGORIES.find((c) => c.id === activeTab) || PRICING_CATEGORIES[0];

  return (
    <section id="pricing" className="py-20 bg-miso-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-miso-light text-miso-primary text-xs font-semibold mb-3">
            <Tag className="w-3.5 h-3.5 text-miso-accent" />
            <span>Bảng Giá & Dự Tính</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-miso-dark mb-3">Bảng Giá Minh Bạch</h2>
          <p className="text-sm text-miso-dark/70">Không phụ thu ẩn. Niêm yết rõ ràng cho từng loại phòng và combo.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {PRICING_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer ${
                activeTab === cat.id ? 'bg-miso-primary text-white' : 'bg-white text-miso-dark/80 border border-miso-light/70'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-miso-light/80 mb-10 max-w-4xl mx-auto divide-y divide-miso-light/60">
          {currentCategory.items.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-sm text-miso-dark">{item.name}</h3>
                <p className="text-xs text-miso-dark/65">{item.detail}</p>
              </div>
              <span className="font-serif text-base font-bold text-miso-primary shrink-0">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="bg-miso-primary text-white rounded-3xl p-6 shadow-xl max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-miso-accent-light" />
            <h3 className="font-serif text-xl font-bold">Tính Nhanh Chi Phí</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-xs text-white/80 block mb-1">Hạng phòng</label>
              <select
                value={calcRoom}
                onChange={(e) => setCalcRoom(e.target.value as any)}
                aria-label="Hạng phòng"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="standard" className="text-black">Tiêu Chuẩn (99k/h)</option>
                <option value="vip" className="text-black">VIP Lounge (149k/h)</option>
                <option value="party" className="text-black">Party Suite (219k/h)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/80 block mb-1">Thời gian hát</label>
              <select
                value={calcHours}
                onChange={(e) => setCalcHours(Number(e.target.value))}
                aria-label="Thời gian hát"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value={1} className="text-black">1 Giờ</option>
                <option value={2} className="text-black">2 Giờ</option>
                <option value={3} className="text-black">3 Giờ (-10%)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/80 block mb-1">Photobooth</label>
              <label className="flex items-center gap-2 text-xs pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeBooth}
                  onChange={(e) => setIncludeBooth(e.target.checked)}
                />
                <span>Kèm photobooth (+70k)</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-white/70">Tạm tính:</span>
              <p className="font-serif text-2xl font-bold text-miso-accent-light">{finalTotal.toLocaleString('vi-VN')}đ</p>
            </div>
            <button
              onClick={() => onOpenBookingWithPlan?.({ roomType: calcRoom, hours: calcHours })}
              className="inline-flex items-center gap-2 bg-miso-accent text-miso-dark font-bold text-xs px-5 py-3 rounded-full hover:bg-white cursor-pointer"
            >
              <span>Đặt theo ước tính này</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
