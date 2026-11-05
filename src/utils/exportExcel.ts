import { CustomerBooking } from '@/types';

export function exportBookingsToExcel(bookings: CustomerBooking[], filterDate?: string): boolean {
  if (typeof window === 'undefined') return false;

  const headers = [
    'Mã Đặt Chỗ',
    'Tên Khách Hàng',
    'Số Điện Thoại',
    'Dịch Vụ / Phòng',
    'Phân Loại',
    'Ngày Đặt',
    'Khung Giờ',
    'Thời Lượng (Giờ)',
    'Số Khách',
    'Trạng Thái',
    'Tổng Tiền (VNĐ)',
    'Phương Thức',
    'Ghi Chú',
    'Thời Gian Tạo',
  ];

  const statusMap: Record<string, string> = {
    confirmed: 'Đã xác nhận',
    in_progress: 'Đang phục vụ',
    completed: 'Đã hoàn thành',
    cancelled: 'Đã huỷ',
  };

  const serviceMap: Record<string, string> = {
    musicbox: 'Musicbox (Phòng hát)',
    photobooth: 'Studio Photobooth',
    combo: 'Combo Trọn Gói',
  };

  const paymentMap: Record<string, string> = {
    cash: 'Tiền mặt',
    transfer: 'Chuyển khoản QR',
    card: 'Quẹt thẻ POS',
    pending: 'Chờ thanh toán',
  };

  const escapeCSV = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = bookings.map((b) => [
    escapeCSV(b.bookingCode),
    escapeCSV(b.customerName),
    escapeCSV(`\t${b.phone}`), // Tab prefix ensures Excel doesn't strip leading 0
    escapeCSV(b.roomName),
    escapeCSV(serviceMap[b.serviceType] || b.serviceType),
    escapeCSV(b.date),
    escapeCSV(b.timeSlot),
    escapeCSV(b.hours),
    escapeCSV(b.guestCount),
    escapeCSV(statusMap[b.status] || b.status),
    escapeCSV(b.totalAmount.toLocaleString('vi-VN')),
    escapeCSV(paymentMap[b.paymentMethod] || b.paymentMethod),
    escapeCSV(b.note || ''),
    escapeCSV(b.createdAt),
  ]);

  const csvContent = [headers.map(escapeCSV).join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  // \uFEFF is UTF-8 Byte Order Mark (BOM) ensuring MS Excel on Windows displays Vietnamese characters cleanly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);

  const dateSuffix = filterDate ? filterDate : new Date().toISOString().split('T')[0];
  link.setAttribute('download', `Danh_Sach_Dat_MISO_${dateSuffix}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
}
