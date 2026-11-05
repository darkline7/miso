import { PricingCategory } from '@/types';

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'rooms',
    title: 'Giá Giờ Hát Theo Phòng',
    items: [
      { name: 'Phòng Tiêu Chuẩn (2-4 khách)', detail: '09:00 - 16:00: 69.000đ/h • Sau 16:00 & Cuối tuần', price: '99.000đ/h' },
      { name: 'Phòng VIP Lounge (5-8 khách)', detail: '09:00 - 16:00: 109.000đ/h • Sau 16:00 & Cuối tuần', price: '149.000đ/h', popular: true },
      { name: 'Phòng Party Suite (8-15 khách)', detail: 'Âm thanh rạp hát, màn chiếu cực đại 150 inch', price: '219.000đ/h' },
      { name: 'Phòng Grand Suite (12-20 khách)', detail: 'Có quầy bar riêng, sân khấu biểu diễn & spotlight', price: '289.000đ/h' },
    ],
  },
  {
    id: 'photobooth',
    title: 'Dịch Vụ Photobooth Chuẩn Hàn',
    items: [
      { name: 'Chụp dải 4 khung hình (2 dải)', detail: 'Tự do chọn khung mẫu, filter làm mịn da chuẩn Hàn', price: '70.000đ', popular: true },
      { name: 'Chụp dải 6 khung hình (2 dải)', detail: 'Nhiều góc pose hơn, tặng kèm túi zip bảo vệ ảnh', price: '90.000đ' },
      { name: 'In thêm mỗi dải phụ', detail: 'In thêm ảnh cùng loại cho từng thành viên trong nhóm', price: '25.000đ/dải' },
      { name: 'Gói chụp Unlimited 30 phút', detail: 'Chụp thỏa thích không giới hạn số lượng ảnh in trong 30p', price: '199.000đ' },
    ],
  },
  {
    id: 'combos',
    title: 'Combo Tiết Kiệm Trọn Gói',
    items: [
      { name: 'Combo Hẹn Hò Sweet Date', detail: '2h hát phòng tiêu chuẩn + 2 trà hoa quả + 1 snack', price: '349.000đ' },
      { name: 'Combo Sinh Nhật Birthday MISO', detail: '2h hát VIP + setup decor tiệc + 2 dải ảnh Photobooth', price: '599.000đ', popular: true },
      { name: 'Combo Party All Night', detail: '3h hát Party Suite + tháp nước ngọt/bia + đĩa trái cây lớn', price: '1.199.000đ' },
      { name: 'Combo Cạ Cứng Tám Chuyện', detail: '2h hát + chụp 2 dải photobooth + trà sữa cho 4 người', price: '459.000đ' },
    ],
  },
  {
    id: 'fnb',
    title: 'Thực Đơn Nước & Đồ Ăn Vặt',
    items: [
      { name: 'Trà Đào Cam Sả / Trà Vải Hoa Hồng', detail: 'Pha chế tươi mát, thơm ngọt tự nhiên', price: '45.000đ', popular: true },
      { name: 'Trà Sữa Oolong Nướng Trân Châu', detail: 'Vị trà đậm đà kèm trân châu hoàng kim dai giòn', price: '49.000đ' },
      { name: 'Bắp Rang Bơ Caramen / Phô Mai', detail: 'Nóng giòn thơm lừng tại quầy', price: '35.000đ' },
      { name: 'Khoai Tây Chiên Lắc Phô Mai', detail: 'Phục vụ kèm sốt tương cà & mayonnaise', price: '45.000đ' },
      { name: 'Đĩa Trái Cây Tươi Theo Mùa', detail: 'Dưa hấu, ổi, xoài, táo kèm muối ớt Tây Ninh', price: '89.000đ' },
    ],
  },
];
