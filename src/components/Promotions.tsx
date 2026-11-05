'use client';

import React from 'react';
import { PROMOTIONS } from '@/data';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface PromotionsProps {
  onSelectPromo: (promoId: string) => void;
}

export function Promotions({ onSelectPromo }: PromotionsProps) {
  return (
    <section id="promotions" className="py-20 bg-white border-y border-miso-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-miso-subtle text-miso-primary text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-miso-accent" />
            <span>Ưu Đãi Độc Quyền</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-miso-dark mb-4">
            Chương Trình Khuyến Mãi Nổi Bật
          </h2>
          <p className="text-sm md:text-base text-miso-dark/70">
            Tận hưởng trọn vẹn từng khoảnh khắc ca hát và chụp ảnh cùng các combo ưu đãi hấp dẫn được thiết kế riêng cho bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              className="bg-miso-bg rounded-2xl p-7 border border-miso-light/70 hover:border-miso-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      promo.tagColor === 'primary'
                        ? 'bg-miso-primary text-white'
                        : 'bg-miso-accent-light text-miso-dark font-semibold'
                    }`}
                  >
                    {promo.tag}
                  </span>
                  {promo.highlightText && (
                    <span className="text-xs font-bold text-miso-accent">
                      {promo.highlightText}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-miso-dark group-hover:text-miso-primary transition-colors mb-3">
                  {promo.title}
                </h3>
                <p className="text-sm text-miso-dark/75 leading-relaxed mb-6">
                  {promo.description}
                </p>

                <div className="space-y-2.5 mb-6 pt-4 border-t border-miso-light/60">
                  {promo.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-miso-dark/80">
                      <div className="w-4 h-4 rounded-full bg-miso-accent-light text-miso-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPromo(promo.id)}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-miso-light hover:border-miso-primary hover:bg-miso-primary hover:text-white text-miso-dark text-xs font-bold transition-all shadow-xs cursor-pointer group/btn"
              >
                <span>Nhận ưu đãi này ngay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
