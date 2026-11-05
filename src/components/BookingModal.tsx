'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';
import { BookingForm } from './BookingForm';
import { BookingSuccess } from './BookingSuccess';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGuests?: number;
  initialHours?: number;
  initialRoomCode?: string; // backwards compatibility
}

export function BookingModal({
  isOpen,
  onClose,
  initialGuests,
  initialHours = 2,
  initialRoomCode,
}: BookingModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [bookingCode, setBookingCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [guests, setGuests] = useState(initialGuests || 4);
  const [hours, setHours] = useState(initialHours);
  const [includeBooth, setIncludeBooth] = useState(true);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (initialGuests) {
      setGuests(initialGuests);
    } else if (initialRoomCode) {
      // Map legacy room code to default capacity
      const legacyMap: Record<string, number> = { '201': 4, '202': 4, '203': 6, '204': 6, '205': 12, '206': 12 };
      setGuests(legacyMap[initialRoomCode] || 4);
    }
    if (initialHours) setHours(initialHours);
  }, [initialGuests, initialRoomCode, initialHours]);

  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'MISO-' + Math.floor(10000 + Math.random() * 90000);
    setBookingCode(code);
    setStep('success');

    try {
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    } catch {}
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-miso-light/70 relative">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-miso-subtle text-miso-dark flex items-center justify-center hover:bg-miso-light cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-miso-secondary">
                Đặt Slot Trực Tuyến
              </span>
              <h3 className="font-serif text-2xl font-bold text-miso-dark mt-1">
                Đặt Slot Hát & Photobooth
              </h3>
              <p className="text-xs text-miso-dark/70 mt-1">
                Giữ chỗ không cần cọc • Quán tự động sắp xếp căn phòng phù hợp theo số người.
              </p>
            </div>

            <BookingForm
              fullName={fullName}
              setFullName={setFullName}
              phone={phone}
              setPhone={setPhone}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              guests={guests}
              setGuests={setGuests}
              hours={hours}
              setHours={setHours}
              includeBooth={includeBooth}
              setIncludeBooth={setIncludeBooth}
              note={note}
              setNote={setNote}
              onSubmit={handleSubmit}
            />
          </div>
        ) : (
          <BookingSuccess
            code={bookingCode}
            fullName={fullName}
            phone={phone}
            date={date}
            time={time}
            guests={guests}
            hours={hours}
            includeBooth={includeBooth}
            note={note}
            onClose={handleReset}
          />
        )}
      </div>
    </div>
  );
}
