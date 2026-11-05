'use client';

import React, { useState, useEffect } from 'react';
import { CustomerBooking, BookingStatus, ServiceCategory } from '@/types';
import { exportBookingsToExcel } from '@/utils/exportExcel';
import {
  Search,
  Calendar,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Filter,
  Download,
  Phone,
  Music2,
  Camera,
  Layers,
} from 'lucide-react';

interface BookingListViewProps {
  bookings: CustomerBooking[];
  onUpdateStatus?: (id: string, status: BookingStatus) => void;
}

export function BookingListView({ bookings: initialList, onUpdateStatus }: BookingListViewProps) {
  const [list, setList] = useState<CustomerBooking[]>(initialList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [exportSuccess, setExportSuccess] = useState(false);
  const [todayStr, setTodayStr] = useState('');

  useEffect(() => {
    setTodayStr(new Date().toISOString().split('T')[0]);
  }, []);

  const handleStatusChange = (id: string, nextStatus: BookingStatus) => {
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
    );
    if (onUpdateStatus) onUpdateStatus(id, nextStatus);
  };

  const filteredBookings = list.filter((b) => {
    if (selectedDate && b.date !== selectedDate) return false;
    if (serviceFilter !== 'all' && b.serviceType !== serviceFilter) return false;
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = b.customerName.toLowerCase().includes(q);
      const matchPhone = b.phone.includes(q);
      const matchCode = b.bookingCode.toLowerCase().includes(q);
      const matchRoom = b.roomName.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchCode && !matchRoom) return false;
    }
    return true;
  });

  const handleExport = () => {
    const success = exportBookingsToExcel(filteredBookings, selectedDate || 'all');
    if (success) {
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3500);
    }
  };

  const totalFilteredAmount = filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Top Filter & Export Bar */}
      <div className="bg-white rounded-3xl p-6 border border-miso-light/60 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-miso-dark flex items-center gap-2">
              <span>Danh Sách Khách Đặt Chỗ</span>
              <span className="text-xs bg-miso-primary/10 text-miso-primary px-2.5 py-0.5 rounded-full font-bold">
                {filteredBookings.length} lượt
              </span>
            </h3>
            <p className="text-xs text-miso-secondary mt-0.5">
              Tra cứu thông tin, quản lý trạng thái và xuất dữ liệu báo cáo sang file Excel theo ngày.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-sm transition-all cursor-pointer"
              title="Xuất danh sách sang file Excel .csv chuẩn tiếng Việt"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Xuất Excel ({filteredBookings.length})</span>
              <Download className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>
        {/* Filters Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-miso-light/50">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-miso-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm tên, SĐT, mã đặt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-miso-light bg-miso-subtle focus:bg-white focus:outline-none focus:ring-1 focus:ring-miso-primary"
            />
          </div>

          {/* Date Picker & Quick presets */}
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-2.5 py-2 text-xs rounded-xl border border-miso-light bg-miso-subtle focus:bg-white focus:outline-none focus:ring-1 focus:ring-miso-primary"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate('')}
                className="text-[11px] px-2 py-2 text-miso-secondary hover:text-miso-dark rounded-lg hover:bg-miso-light/40"
                title="Xóa lọc ngày"
              >
                Tất cả
              </button>
            )}
          </div>

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-miso-light bg-miso-subtle focus:bg-white focus:outline-none focus:ring-1 focus:ring-miso-primary"
          >
            <option value="all">Tất cả dịch vụ</option>
            <option value="musicbox">Phòng Hát Musicbox</option>
            <option value="photobooth">Studio Photobooth</option>
            <option value="combo">Combo Trọn Gói</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-miso-light bg-miso-subtle focus:bg-white focus:outline-none focus:ring-1 focus:ring-miso-primary"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="in_progress">Đang phục vụ</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="cancelled">Đã huỷ</option>
          </select>
        </div>

        {/* Quick Date Shortcuts Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-miso-secondary">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-medium text-[11px]">Chọn nhanh:</span>
            <button
              onClick={() => setSelectedDate(todayStr)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                selectedDate === todayStr ? 'bg-miso-primary text-white' : 'bg-miso-subtle text-miso-dark hover:bg-miso-light/60'
              }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => {
                const d = new Date();
                d.setDate(d.getDate() - 1);
                setSelectedDate(d.toISOString().split('T')[0]);
              }}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-miso-subtle text-miso-dark hover:bg-miso-light/60"
            >
              Hôm qua
            </button>
            <button
              onClick={() => {
                const d = new Date();
                d.setDate(d.getDate() + 1);
                setSelectedDate(d.toISOString().split('T')[0]);
              }}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-miso-subtle text-miso-dark hover:bg-miso-light/60"
            >
              Ngày mai
            </button>
          </div>

          <div className="text-[11px] font-medium">
            Tổng tiền lọc được: <b className="text-miso-primary text-xs font-bold">{totalFilteredAmount.toLocaleString('vi-VN')} đ</b>
          </div>
        </div>


        {exportSuccess && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Đã xuất thành công file Excel! Kiểm tra thư mục Tải xuống (Downloads).</span>
          </div>
        )}
      </div>
      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-miso-light/60 shadow-sm overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-10 h-10 text-miso-secondary/50 mx-auto mb-3" />
            <p className="text-sm font-semibold text-miso-dark">Không tìm thấy lượt đặt chỗ nào</p>
            <p className="text-xs text-miso-secondary mt-1">
              Thử thay đổi bộ lọc ngày, loại dịch vụ hoặc từ khóa tìm kiếm.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-miso-subtle text-miso-secondary uppercase text-[10px] tracking-wider border-b border-miso-light/60">
                  <th className="py-3 px-4 font-bold">Khách Hàng</th>
                  <th className="py-3 px-4 font-bold">Dịch Vụ / Phòng</th>
                  <th className="py-3 px-4 font-bold">Thời Gian</th>
                  <th className="py-3 px-4 font-bold text-center">Khách</th>
                  <th className="py-3 px-4 font-bold">Tổng Tiền</th>
                  <th className="py-3 px-4 font-bold text-center">Trạng Thái</th>
                  <th className="py-3 px-4 font-bold text-right">Chuyển Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-miso-light/40">
                {filteredBookings.map((b) => {
                  const isMusic = b.serviceType === 'musicbox';
                  const isPhoto = b.serviceType === 'photobooth';

                  return (
                    <tr key={b.id} className="hover:bg-miso-subtle/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-miso-dark text-[13px]">{b.customerName}</div>
                        <div className="flex items-center gap-1 text-[11px] text-miso-secondary mt-0.5">
                          <Phone className="w-3 h-3 text-miso-accent" />
                          <span>{b.phone}</span>
                        </div>
                        <div className="text-[10px] font-mono text-miso-primary mt-0.5">
                          #{b.bookingCode}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-miso-dark">{b.roomName}</div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md mt-1 bg-miso-light/40 text-miso-secondary">
                          {isMusic ? (
                            <><Music2 className="w-3 h-3 text-miso-primary" /> Phòng Hát</>
                          ) : isPhoto ? (
                            <><Camera className="w-3 h-3 text-miso-accent" /> Photobooth</>
                          ) : (
                            <><Layers className="w-3 h-3 text-miso-dark" /> Combo</>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-miso-dark">{b.timeSlot}</div>
                        <div className="text-[11px] text-miso-secondary">{b.date} ({b.hours}h)</div>
                      </td>

                      <td className="py-3.5 px-4 text-center font-bold text-miso-dark">
                        {b.guestCount}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-miso-primary text-[13px]">
                          {b.totalAmount.toLocaleString('vi-VN')} đ
                        </div>
                        <div className="text-[10px] text-miso-secondary capitalize">
                          {b.paymentMethod === 'transfer' ? 'Chuyển khoản' : b.paymentMethod === 'card' ? 'Quẹt thẻ' : b.paymentMethod === 'cash' ? 'Tiền mặt' : 'Tại quầy'}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            b.status === 'confirmed'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : b.status === 'in_progress'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : b.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {b.status === 'confirmed'
                            ? 'Đã xác nhận'
                            : b.status === 'in_progress'
                            ? 'Đang phục vụ'
                            : b.status === 'completed'
                            ? 'Hoàn thành'
                            : 'Đã huỷ'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                          className="px-2 py-1 text-[11px] font-medium rounded-lg border border-miso-light bg-white focus:outline-none focus:ring-1 focus:ring-miso-primary cursor-pointer"
                        >
                          <option value="confirmed">Xác nhận</option>
                          <option value="in_progress">Phục vụ</option>
                          <option value="completed">Hoàn thành</option>
                          <option value="cancelled">Huỷ</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
