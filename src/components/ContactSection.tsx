'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle, Star } from 'lucide-react';

export function ContactSection() {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setName('');
    setPhone('');
    setContent('');
    setTimeout(() => setFeedbackSent(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-miso-subtle text-miso-primary text-xs font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5 text-miso-accent" />
              <span>Địa Điểm & Liên Hệ</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-miso-dark mb-4">Ghé Thăm MISO Studio</h2>
            <p className="text-sm text-miso-dark/70 mb-6">Nằm ngay trung tâm thành phố với bãi đỗ xe rộng rãi.</p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-miso-bg border border-miso-light/60 text-xs">
                <MapPin className="w-4 h-4 text-miso-primary shrink-0" />
                <span>123 Đường Nâu Trắng, Quận Trung Tâm, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-miso-bg border border-miso-light/60 text-xs font-bold">
                <Phone className="w-4 h-4 text-miso-primary shrink-0" />
                <span>Hotline: 1900 MISO (1900 6476)</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-miso-bg border border-miso-light/60 text-xs">
                <Clock className="w-4 h-4 text-miso-primary shrink-0" />
                <span>09:00 Sáng - 02:00 Khuya (Mỗi ngày)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-miso-bg rounded-3xl p-6 sm:p-7 border border-miso-light/80 shadow-md">
              <h3 className="font-serif text-xl font-bold text-miso-dark mb-1">Góp Ý & Phản Hồi</h3>
              <p className="text-xs text-miso-dark/70 mb-4">Ý kiến của bạn giúp MISO hoàn thiện dịch vụ.</p>

              {feedbackSent ? (
                <div className="py-8 text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-miso-dark">Cảm ơn bạn đã phản hồi!</h4>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-miso-dark block mb-1">Họ và tên</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-white border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-miso-dark block mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full bg-white border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-miso-dark block mb-1">Đánh giá</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star className={`w-4 h-4 ${star <= rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-miso-dark block mb-1">Nội dung</label>
                    <textarea
                      rows={2}
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Chia sẻ trải nghiệm của bạn..."
                      className="w-full bg-white border border-miso-light rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-miso-primary text-white text-xs font-bold py-2.5 rounded-xl hover:bg-miso-dark cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi Góp Ý Cho MISO</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
