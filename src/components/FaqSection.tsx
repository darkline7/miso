'use client';

import React, { useState } from 'react';
import { FAQS } from '@/data';
import { HelpCircle, ChevronDown } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-miso-bg border-b border-miso-light/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-miso-light text-miso-primary text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-miso-accent" />
            <span>Giải Đáp Thắc Mắc</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-miso-dark mb-3">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-sm text-miso-dark/70">
            Mọi thông tin bạn cần biết để có trải nghiệm trọn vẹn nhất tại MISO.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-miso-light/70 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-sm text-miso-dark">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-miso-subtle flex items-center justify-center text-miso-primary shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-miso-primary text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-miso-dark/75 leading-relaxed border-t border-miso-light/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
