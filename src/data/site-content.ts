import { Promotion, Review, FaqItem } from '@/types';

export const PROMOTIONS: Promotion[] = [
  {
    id: 'birthday-combo',
    title: 'Combo Sinh Nhật MISO',
    tag: 'Đang diễn ra',
    tagColor: 'primary',
    description: 'Miễn phí setup trang trí bong bóng & banner tiệc, tặng 1 dải ảnh photobooth cho nhóm từ 4 người.',
    benefits: ['Free gói trang trí phòng cơ bản', 'Tặng 1 dải ảnh Photobooth lưu niệm', 'Giảm 10% tổng hoá đơn nước & đồ ăn'],
    highlightText: 'Tiết kiệm đến 250.000đ',
  },
  {
    id: 'happy-hour',
    title: 'Happy Hour Giờ Vàng',
    tag: 'Thứ 2 - Thứ 6',
    tagColor: 'accent',
    description: 'Giảm 30% giá giờ hát từ 09:00 đến 16:00 mỗi ngày trong tuần. Phù hợp cho sinh viên và nhóm bạn thư giãn.',
    benefits: ['Áp dụng tất cả các hạng phòng', 'Tặng kèm 1 đĩa snack bắp rang bơ', 'Không giới hạn số giờ hát'],
    highlightText: 'Chỉ từ 69.000đ / giờ',
  },
  {
    id: 'photobooth-checkin',
    title: 'Photobooth Check-in Deal',
    tag: 'Hot Trend',
    tagColor: 'primary',
    description: 'Chụp 2 dải ảnh tặng ngay 1 dải miễn phí. Nhận file gốc kèm video hậu trường quay chậm qua mã QR tức thì.',
    benefits: ['In ảnh giấy bóng studio siêu nét', 'Sử dụng miễn phí 50+ phụ kiện cute', 'Nhận ngay video hậu trường GIF'],
    highlightText: 'Mua 2 tặng 1 dải ảnh',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Nguyễn Thu Uyên',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'Sinh viên RMIT',
    rating: 5,
    roomUsed: 'Phòng 201 Acoustic',
    comment: 'Không gian ấm cúng và sạch sẽ bất ngờ! Mình đi với người yêu, mic hát cực nhẹ và tôn giọng. Góc photobooth bên ngoài chụp hình siêu xinh, da sáng mịn không cần chỉnh.',
    date: '3 ngày trước',
  },
  {
    id: 'rev-2',
    name: 'Trần Minh Quân',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'Team Lead tại Tiki',
    rating: 5,
    roomUsed: 'Phòng 205 Cinema Luxe',
    comment: 'Team mình tổ chức sinh nhật cho sếp ở đây. Dịch vụ decor phòng rất chu đáo, nhân viên lễ tân nhiệt tình hỗ trợ chọn nhạc. Dàn âm thanh nghe rất đã, không bị chói tai!',
    date: '1 tuần trước',
  },
  {
    id: 'rev-3',
    name: 'Lê Hoàng Yến Nhi',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    role: 'Content Creator',
    rating: 5,
    roomUsed: 'Phòng 203 Neon Dream',
    comment: 'Phụ kiện chụp hình photobooth đa dạng xỉu, có nhiều nón thú bông Hàn Quốc cưng lắm. Vừa hát vừa chụp ảnh sống ảo được cả rổ hình up cả tháng chưa hết.',
    date: '2 tuần trước',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'Tôi có cần đặt phòng trước khi đến không?',
    answer: 'Để đảm bảo có phòng trống theo đúng khung giờ và phong cách bạn yêu thích (đặc biệt vào buổi tối và các ngày cuối tuần), MISO khuyến khích bạn nên đặt lịch trước ít nhất 2 - 4 tiếng qua website hoặc hotline 1900 6476.',
  },
  {
    question: 'MISO có cho phép mang đồ ăn thức uống từ ngoài vào không?',
    answer: 'MISO có phục vụ đầy đủ menu nước uống pha chế, bánh snack và trái cây sạch tươi ngon. Đối với bánh kem sinh nhật, bạn được mang vào hoàn toàn miễn phí và được nhân viên hỗ trợ đĩa, muỗng, nến.',
  },
  {
    question: 'Hình ảnh chụp từ Photobooth lấy file gốc như thế nào?',
    answer: 'Ngay sau khi in ảnh giấy tại máy, trên mỗi dải ảnh sẽ có một mã QR code riêng biệt. Bạn chỉ cần quét mã QR bằng camera điện thoại là có thể tải ngay ảnh chất lượng cao và video hậu trường GIF 15 giây về máy.',
  },
  {
    question: 'Phòng hát có chức năng kết nối Bluetooth và chọn bài qua điện thoại không?',
    answer: 'Có! 100% các phòng tại MISO đều trang bị màn hình cảm ứng 4K hiện đại nhất kết hợp tính năng quét mã QR để mọi thành viên trong phòng cùng chọn bài hát trực tiếp từ smartphone cá nhân qua YouTube, SoundCloud hoặc danh sách bài hát có sẵn.',
  },
  {
    question: 'Chính sách hoàn hủy hoặc đổi giờ đặt phòng như thế nào?',
    answer: 'Bạn có thể đổi giờ hoặc dời lịch hẹn miễn phí trước ít nhất 2 giờ so với thời gian đã hẹn. Vui lòng gọi trực tiếp vào hotline 1900 6476 để nhân viên hỗ trợ nhanh nhất.',
  },
];
