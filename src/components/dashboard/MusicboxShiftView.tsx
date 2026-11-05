'use client';

import React, { useState } from 'react';
import { MusicboxShiftReport } from '@/types';
import {
  Music2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  User,
  DollarSign,
  AlertTriangle,
  FileCheck,
  BatteryCharging,
  Tablet,
  Mic,
} from 'lucide-react';

interface MusicboxShiftViewProps {
  shifts: MusicboxShiftReport[];
}

export function MusicboxShiftView({ shifts: initialShifts }: MusicboxShiftViewProps) {
  const [shifts, setShifts] = useState<MusicboxShiftReport[]>(initialShifts);
  const [selectedShiftId, setSelectedShiftId] = useState<string>(initialShifts[0]?.id || '');
  const [successToast, setSuccessToast] = useState(false);

  // Form states for closing a shift
  const [staffName, setStaffName] = useState('Trần Văn Hùng');
  const [shiftType, setShiftType] = useState<'Ca 1 (09:00 - 17:00)' | 'Ca 2 (17:00 - 02:00)'>('Ca 1 (09:00 - 17:00)');
  const [cashRevenue, setCashRevenue] = useState(3420000);
  const [transferRevenue, setTransferRevenue] = useState(5860000);
  const [foodBeverageRevenue, setFoodBeverageRevenue] = useState(1250000);
  const [roomsServed, setRoomsServed] = useState(8);
  const [totalHours, setTotalHours] = useState(21);
  const [initialCash, setInitialCash] = useState(1000000);
  const [handedOverCash, setHandedOverCash] = useState(4420000);
  const [notes, setNotes] = useState('Đã kiểm tra 6/6 phòng, micro đã sạc đầy pin. Không có phát sinh sự cố hư hại thiết bị.');

  const totalCalculatedRevenue = cashRevenue + transferRevenue + foodBeverageRevenue;
  const expectedCash = initialCash + cashRevenue;
  const cashDifference = handedOverCash - expectedCash;

  const handleCloseShift = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: MusicboxShiftReport = {
      id: `mb-shift-${Date.now()}`,
      shiftName: shiftType,
      staffName,
      date: new Date().toISOString().split('T')[0],
      roomsServed,
      totalHours,
      cashRevenue,
      transferRevenue,
      foodBeverageRevenue,
      totalRevenue: totalCalculatedRevenue,
      initialCash,
      handedOverCash,
      difference: cashDifference,
      micCount: { total: 12, intact: 12, charging: 4 },
      tabletCount: { total: 6, intact: 6 },
      roomHygieneClean: true,
      notes,
      status: 'completed',
      closedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setShifts([newReport, ...shifts]);
    setSelectedShiftId(newReport.id);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  const activeShift = shifts.find((s) => s.id === selectedShiftId) || shifts[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-miso-light/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-miso-primary/10 text-miso-primary text-xs font-bold mb-2">
            <Music2 className="w-3.5 h-3.5" />
            <span>Đối Soát & Bàn Giao Ca Phòng Hát</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-miso-dark">
            Kết Ca Musicbox Karaoke
          </h3>
          <p className="text-xs text-miso-secondary mt-1">
            Chốt doanh thu tiền mặt, kiểm kê hệ thống micro/tablet và bàn giao tiền quỹ cho ca tiếp theo.
          </p>
        </div>

        {successToast && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 border border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Biên bản kết ca Musicbox đã được chốt và lưu thành công!</span>
          </div>
        )}
      </div>

      {/* Grid: Form on Left, History & Shift Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Container placeholder */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleCloseShift}
            className="bg-white rounded-3xl p-6 border border-miso-light/60 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-miso-light/60">
              <h4 className="font-serif text-lg font-bold text-miso-dark flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-miso-primary" />
                <span>Biên Bản Chốt Doanh Thu Ca Trực</span>
              </h4>
              <span className="text-xs bg-amber-50 text-amber-700 font-bold px-3 py-1 rounded-full border border-amber-200">
                Ca Đang Mở
              </span>
            </div>

            {/* Shift & Staff info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-miso-dark mb-1.5">Ca Làm Việc</label>
                <select
                  value={shiftType}
                  onChange={(e) => setShiftType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-miso-light bg-miso-subtle focus:bg-white focus:outline-none focus:ring-1 focus:ring-miso-primary"
                >
                  <option value="Ca 1 (09:00 - 17:00)">Ca 1 (09:00 - 17:00)</option>
                  <option value="Ca 2 (17:00 - 02:00)">Ca 2 (17:00 - 02:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-miso-dark mb-1.5">Nhân Viên Trực Ca</label>
                <div className="relative">
                  <User className="w-4 h-4 text-miso-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-miso-light bg-miso-subtle focus:bg-white focus:outline-none focus:ring-1 focus:ring-miso-primary"
                  />
                </div>
              </div>
            </div>

            {/* Revenue Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-3.5 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <label className="block text-[11px] font-bold text-miso-secondary mb-1">Tiền Mặt Hát (VNĐ)</label>
                <input
                  type="number"
                  value={cashRevenue}
                  onChange={(e) => setCashRevenue(Number(e.target.value))}
                  className="w-full text-sm font-extrabold text-miso-dark bg-white rounded-lg px-2.5 py-1.5 border border-miso-light focus:outline-none focus:ring-1 focus:ring-miso-primary"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <label className="block text-[11px] font-bold text-miso-secondary mb-1">Chuyển Khoản QR (VNĐ)</label>
                <input
                  type="number"
                  value={transferRevenue}
                  onChange={(e) => setTransferRevenue(Number(e.target.value))}
                  className="w-full text-sm font-extrabold text-miso-primary bg-white rounded-lg px-2.5 py-1.5 border border-miso-light focus:outline-none focus:ring-1 focus:ring-miso-primary"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <label className="block text-[11px] font-bold text-miso-secondary mb-1">Nước & Đồ Ăn (VNĐ)</label>
                <input
                  type="number"
                  value={foodBeverageRevenue}
                  onChange={(e) => setFoodBeverageRevenue(Number(e.target.value))}
                  className="w-full text-sm font-extrabold text-miso-accent bg-white rounded-lg px-2.5 py-1.5 border border-miso-light focus:outline-none focus:ring-1 focus:ring-miso-primary"
                />
              </div>
            </div>

            {/* Equipment Checklist */}
            <div className="p-4 rounded-2xl bg-[#FFF8E1]/40 border border-[#FFE082] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Kiểm Kê Thiết Bị Phòng Hát & Cơ Sở Vật Chất</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-amber-200">
                  <Mic className="w-4 h-4 text-miso-primary" />
                  <div>
                    <div className="font-bold text-miso-dark">Micro không dây</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">12/12 Đầy Đủ</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-amber-200">
                  <Tablet className="w-4 h-4 text-miso-accent" />
                  <div>
                    <div className="font-bold text-miso-dark">Tablet cảm ứng</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">6/6 Hoạt động tốt</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-amber-200">
                  <BatteryCharging className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="font-bold text-miso-dark">Đốc sạc pin mic</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">Đã sạc đầy ca sau</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash Handover Reconciliation */}
            <div className="p-4 rounded-2xl bg-miso-subtle border border-miso-light/70 space-y-3">
              <div className="text-xs font-bold text-miso-dark uppercase tracking-wider">
                Bàn Giao Tiền Mặt Cuối Ca
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-miso-secondary text-[11px]">Tiền quỹ đầu ca:</span>
                  <div className="font-bold text-miso-dark mt-0.5">{initialCash.toLocaleString('vi-VN')} đ</div>
                </div>
                <div>
                  <span className="text-miso-secondary text-[11px]">Cần bàn giao:</span>
                  <div className="font-bold text-miso-primary mt-0.5">{expectedCash.toLocaleString('vi-VN')} đ</div>
                </div>
                <div>
                  <span className="text-miso-secondary text-[11px]">Tiền thực tế bàn giao:</span>
                  <input
                    type="number"
                    value={handedOverCash}
                    onChange={(e) => setHandedOverCash(Number(e.target.value))}
                    className="w-full text-xs font-extrabold text-emerald-700 bg-white rounded-lg px-2 py-1 border border-miso-light focus:outline-none focus:ring-1 focus:ring-miso-primary mt-0.5"
                  />
                </div>
              </div>
              {cashDifference !== 0 && (
                <div className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 ${cashDifference > 0 ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'}`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Chênh lệch: {cashDifference > 0 ? `Thừa +${cashDifference.toLocaleString('vi-VN')} đ` : `Thiếu ${cashDifference.toLocaleString('vi-VN')} đ`}</span>
                </div>
              )}
            </div>

            {/* Notes & Submit */}
            <div>
              <label className="block text-xs font-bold text-miso-dark mb-1">Ghi Chú & Dặn Dò Ca Sau</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-miso-light bg-miso-subtle focus:bg-white focus:outline-none focus:ring-1 focus:ring-miso-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-miso-primary hover:bg-miso-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Chốt Kết Ca Musicbox & Xuất Biên Bản</span>
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-miso-light/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base font-bold text-miso-dark">Lịch Sử Kết Ca Musicbox</h4>
              <span className="text-[10px] text-miso-secondary font-bold uppercase">{shifts.length} ca</span>
            </div>

            <div className="space-y-2.5">
              {shifts.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedShiftId(s.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedShiftId === s.id
                      ? 'border-miso-primary bg-miso-primary/5 shadow-xs'
                      : 'border-miso-light/70 hover:bg-miso-subtle/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-miso-dark">{s.shiftName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {s.status === 'completed' ? 'Đã chốt' : 'Đang trực'}
                    </span>
                  </div>
                  <div className="text-[11px] text-miso-secondary flex items-center justify-between">
                    <span>NV: <b>{s.staffName}</b></span>
                    <span className="text-miso-primary font-bold">{(s.totalRevenue / 1000000).toFixed(2)}M đ</span>
                  </div>
                  <div className="text-[10px] text-miso-secondary/80 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-miso-accent" />
                    <span>{s.date} {s.closedAt ? `• Chốt lúc ${s.closedAt}` : ''}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Shift Card Details */}
          {activeShift && (
            <div className="bg-miso-subtle rounded-3xl p-5 border border-miso-light/70 text-xs space-y-3">
              <div className="font-bold text-miso-dark flex items-center justify-between pb-2 border-b border-miso-light">
                <span>Chi Tiết {activeShift.shiftName}</span>
                <span className="text-emerald-700 font-extrabold">{activeShift.totalRevenue.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-miso-secondary">Phòng phục vụ:</span>
                  <div className="font-bold text-miso-dark">{activeShift.roomsServed} phòng ({activeShift.totalHours}h)</div>
                </div>
                <div>
                  <span className="text-miso-secondary">Tiền mặt bàn giao:</span>
                  <div className="font-bold text-miso-dark">{activeShift.handedOverCash.toLocaleString('vi-VN')} đ</div>
                </div>
                <div>
                  <span className="text-miso-secondary">Chuyển khoản QR:</span>
                  <div className="font-bold text-miso-dark">{activeShift.transferRevenue.toLocaleString('vi-VN')} đ</div>
                </div>
                <div>
                  <span className="text-miso-secondary">Micro phòng hát:</span>
                  <div className="font-bold text-emerald-700">{activeShift.micCount.intact}/{activeShift.micCount.total} Tốt</div>
                </div>
              </div>
              {activeShift.notes && (
                <div className="p-2.5 bg-white rounded-xl text-[11px] text-miso-dark italic border border-miso-light">
                  "{activeShift.notes}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
