'use client';

import React, { useState } from 'react';
import {
  Navbar,
  Hero,
  Promotions,
  RoomExplorer,
  PhotoboothSection,
  PricingCalculator,
  Testimonials,
  FaqSection,
  ContactSection,
  Footer,
  BookingModal,
} from '@/components';
import { Room } from '@/types';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomCode, setSelectedRoomCode] = useState<string>('201');
  const [bookingHours, setBookingHours] = useState<number>(2);

  const handleOpenBooking = (roomCode?: string, hours?: number) => {
    if (roomCode) setSelectedRoomCode(roomCode);
    if (hours) setBookingHours(hours);
    setIsBookingOpen(true);
  };

  const handleSelectRoom = (room: Room) => {
    handleOpenBooking(room.code);
  };

  const handleSelectPromo = (promoId: string) => {
    if (promoId === 'birthday-combo') {
      handleOpenBooking('205', 3);
    } else if (promoId === 'happy-hour') {
      handleOpenBooking('201', 2);
    } else {
      handleOpenBooking('203', 2);
    }
  };

  const handlePlanBooking = (plan: { roomType: string; hours: number }) => {
    const code = plan.roomType === 'vip' ? '203' : plan.roomType === 'party' ? '205' : '201';
    handleOpenBooking(code, plan.hours);
  };

  return (
    <div className="flex min-h-screen flex-col bg-miso-bg text-miso-dark">
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <Promotions onSelectPromo={handleSelectPromo} />
        <RoomExplorer onSelectRoom={handleSelectRoom} />
        <PhotoboothSection onOpenBooking={() => handleOpenBooking('203', 2)} />
        <PricingCalculator onOpenBookingWithPlan={handlePlanBooking} />
        <Testimonials />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialRoomCode={selectedRoomCode}
        initialHours={bookingHours}
      />
    </div>
  );
}

