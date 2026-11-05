'use client';

import React from 'react';
import { REVIEWS } from '@/data';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export function Testimonials() {
  return (
    <section id="reviews" className="py-20 bg-white border-b border-miso-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-miso-subtle text-miso-primary text-xs font-semibold mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-miso-accent" />
            <span>Trải Nghiệm Khách Hàng</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-miso-dark mb-4">
            Khách Hàng Nói Gì Về MISO?
          </h2>
          <p className="text-sm md:text-base text-miso-dark/70">
            Hơn 5.000 khách hàng đã có những phút giây bùng nổ cảm xúc và lưu giữ kỷ niệm đáng nhớ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-miso-bg rounded-3xl p-7 border border-miso-light/70 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Room tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-miso-primary bg-white px-2.5 py-0.5 rounded-full border border-miso-light/60">
                    {rev.roomUsed}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm text-miso-dark/80 italic leading-relaxed mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Reviewer info */}
              <div className="flex items-center gap-3 pt-4 border-t border-miso-light/50">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-miso-dark">{rev.name}</h4>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-miso-secondary">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
