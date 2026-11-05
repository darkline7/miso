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
