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
  const [bookingGuests, setBookingGuests] = useState<number>(4);
  const [bookingHours, setBookingHours] = useState<number>(2);

  const handleOpenBooking = (guests: number = 4, hours: number = 2) => {
    setBookingGuests(guests);
    setBookingHours(hours);
    setIsBookingOpen(true);
  };

  const handleSelectRoom = (room: Room) => {
    // Pass recommended guest capacity so modal pre-selects the right group size
    const guestCount = room.category === 'party' ? 12 : room.category === 'vip' ? 6 : 4;
    handleOpenBooking(guestCount, 2);
  };

  const handleSelectPromo = (promoId: string) => {
    if (promoId === 'birthday-combo') {
      handleOpenBooking(10, 3);
    } else if (promoId === 'happy-hour') {
      handleOpenBooking(4, 2);
    } else {
      handleOpenBooking(4, 2);
    }
  };

  const handlePlanBooking = (plan: { roomType: string; hours: number }) => {
    const guestCount = plan.roomType === 'party' ? 12 : plan.roomType === 'vip' ? 6 : 4;
    handleOpenBooking(guestCount, plan.hours);
  };

  return (
    <div className="flex min-h-screen flex-col bg-miso-bg text-miso-dark">
      <Navbar onOpenBooking={() => handleOpenBooking(4, 2)} />

      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking(4, 2)} />
        <Promotions onSelectPromo={handleSelectPromo} />
        <RoomExplorer onSelectRoom={handleSelectRoom} />
        <PhotoboothSection onOpenBooking={() => handleOpenBooking(2, 2)} />
        <PricingCalculator onOpenBookingWithPlan={handlePlanBooking} />
        <Testimonials />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialGuests={bookingGuests}
        initialHours={bookingHours}
      />
    </div>
  );
}

