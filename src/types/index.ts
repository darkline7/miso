export interface Room {
  id: string;
  name: string;
  code: string;
  category: 'standard' | 'vip' | 'party';
  capacity: string;
  pricePerHour: number;
  image: string;
  description: string;
  features: string[];
  isAvailable?: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  tag: string;
  tagColor: 'primary' | 'accent' | 'gray';
  description: string;
  benefits: string[];
  validUntil?: string;
  highlightText?: string;
}

export interface PricingItem {
  name: string;
  detail: string;
  price: string;
  popular?: boolean;
}

export interface PricingCategory {
  id: string;
  title: string;
  items: PricingItem[];
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  comment: string;
  roomUsed: string;
  date: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email?: string;
  roomType: string;
  roomId?: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  estimatedHours: number;
  addons: string[];
  note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
export type BookingStatus = 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type ServiceCategory = 'musicbox' | 'photobooth' | 'combo';

export interface CustomerBooking {
  id: string;
  bookingCode: string;
  customerName: string;
  phone: string;
  serviceType: ServiceCategory;
  roomCode?: string;
  roomName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "14:00 - 16:00"
  hours: number;
  guestCount: number;
  status: BookingStatus;
  totalAmount: number;
  paymentMethod: 'cash' | 'transfer' | 'card' | 'pending';
  note?: string;
  createdAt: string;
}

export interface DayWeeklyStat {
  dayName: string; // 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'
  fullDay: string; // 'Thứ Hai', 'Thứ Ba', ...
  date: string;
  musicboxCount: number;
  photoboothCount: number;
  comboCount: number;
  totalBookings: number;
  totalGuests: number;
  revenue: number;
  occupancyRate: number; // 0 - 100%
}

export interface MusicboxShiftReport {
  id: string;
  shiftName: 'Ca 1 (09:00 - 17:00)' | 'Ca 2 (17:00 - 02:00)';
  staffName: string;
  date: string;
  roomsServed: number;
  totalHours: number;
  cashRevenue: number;
  transferRevenue: number;
  foodBeverageRevenue: number;
  totalRevenue: number;
  initialCash: number;
  handedOverCash: number;
  difference: number;
  micCount: { total: number; intact: number; charging: number };
  tabletCount: { total: number; intact: number };
  roomHygieneClean: boolean;
  notes: string;
  status: 'completed' | 'in_progress';
  closedAt?: string;
}

export interface PhotoboothShiftReport {
  id: string;
  shiftName: 'Ca 1 (09:00 - 17:00)' | 'Ca 2 (17:00 - 02:00)';
  staffName: string;
  date: string;
  totalSessions: number;
  printsSold: number;
  wastedPrints: number;
  cashRevenue: number;
  transferRevenue: number;
  totalRevenue: number;
  initialCash: number;
  handedOverCash: number;
  difference: number;
  paperRollsRemaining: number;
  propsIntact: boolean;
  brokenPropsCount: number;
  printerStatus: 'good' | 'maintenance' | 'need_ink';
  screenAndLightingStatus: 'good' | 'issue';
  notes: string;
  status: 'completed' | 'in_progress';
  closedAt?: string;
}

