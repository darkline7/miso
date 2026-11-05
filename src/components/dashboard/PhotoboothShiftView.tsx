'use client';

import React, { useState } from 'react';
import { PhotoboothShiftReport } from '@/types';
import {
  Camera,
  CheckCircle2,
  Clock,
  Printer,
  Sparkles,
  User,
  AlertTriangle,
  FileCheck,
  Glasses,
  Film,
} from 'lucide-react';

interface PhotoboothShiftViewProps {
  shifts: PhotoboothShiftReport[];
}

export function PhotoboothShiftView({ shifts: initialShifts }: PhotoboothShiftViewProps) {
  const [shifts, setShifts] = useState<PhotoboothShiftReport[]>(initialShifts);
  const [selectedShiftId, setSelectedShiftId] = useState<string>(initialShifts[0]?.id || '');
  const [successToast, setSuccessToast] = useState(false);

  // Form states
  const [staffName, setStaffName] = useState('Phạm Thị Mai');
  const [shiftType, setShiftType] = useState<'Ca 1 (09:00 - 17:00)' | 'Ca 2 (17:00 - 02:00)'>('Ca 1 (09:00 - 17:00)');
  const [totalSessions, setTotalSessions] = useState(18);
  const [printsSold, setPrintsSold] = useState(42);
  const [wastedPrints, setWastedPrints] = useState(2);
  const [cashRevenue, setCashRevenue] = useState(1280000);
  const [transferRevenue, setTransferRevenue] = useState(2450000);
  const [initialCash, setInitialCash] = useState(500000);
  const [handedOverCash, setHandedOverCash] = useState(1780000);
  const [paperRollsRemaining, setPaperRollsRemaining] = useState(4);
  const [brokenPropsCount, setBrokenPropsCount] = useState(0);
  const [printerStatus, setPrinterStatus] = useState<'good' | 'maintenance' | 'need_ink'>('good');
  const [notes, setNotes] = useState('Máy in DNP hoạt động sắc nét, không kẹt giấy. Đạo cụ đầy đủ.');

  const totalCalculatedRevenue = cashRevenue + transferRevenue;
  const expectedCash = initialCash + cashRevenue;
  const cashDifference = handedOverCash - expectedCash;

  const handleCloseShift = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: PhotoboothShiftReport = {
      id: `pb-shift-${Date.now()}`,
      shiftName: shiftType,
      staffName,
      date: new Date().toISOString().split('T')[0],
      totalSessions,
      printsSold,
      wastedPrints,
      cashRevenue,
      transferRevenue,
      totalRevenue: totalCalculatedRevenue,
      initialCash,
      handedOverCash,
      difference: cashDifference,
      paperRollsRemaining,
      propsIntact: brokenPropsCount === 0,
      brokenPropsCount,
      printerStatus,
      screenAndLightingStatus: 'good',
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
      {/* Banner */}
      <div className="bg-white rounded-3xl p-6 border border-miso-light/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-miso-accent/15 text-miso-accent text-xs font-bold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Đối Soát Ca Studio Photobooth</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-miso-dark">
            Kết Ca Photobooth Hàn Quốc
          </h3>
          <p className="text-xs text-miso-secondary mt-1">
            Chốt số lượt chụp, dải ảnh bán ra, kiểm kê kho giấy in nhiệt và phụ kiện đạo cụ.
          </p>
        </div>

        {successToast && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 border border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Biên bản kết ca Photobooth đã được lưu thành công!</span>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form
            onSubmit={handleCloseShift}
            className="bg-white rounded-3xl p-6 border border-miso-light/60 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-miso-light/60">
              <h4 className="font-serif text-lg font-bold text-miso-dark flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-miso-accent" />
                <span>Chốt Doanh Thu & Lượt Chụp Booth</span>
              </h4>
              <span className="text-xs bg-amber-50 text-amber-700 font-bold px-3 py-1 rounded-full border border-amber-200">
                Ca Đang Mở
              </span>
            </div>

            {/* Shift & Staff */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-miso-dark mb-1.5">Ca Làm Việc</label>
                <select
                  value={shiftType}
                  onChange={(e) => setShiftType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-miso-light bg-miso-subtle focus:bg-white focus:outline-none focus:ring-1 focus:ring-miso-accent"
                >
                  <option value="Ca 1 (09:00 - 17:00)">Ca 1 (09:00 - 17:00)</option>
                  <option value="Ca 2 (17:00 - 02:00)">Ca 2 (17:00 - 02:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-miso-dark mb-1.5">Nhân Viên Trực Booth</label>
                <div className="relative">
                  <User className="w-4 h-4 text-miso-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-miso-light bg-miso-subtle focus:bg-white focus:outline-none focus:ring-1 focus:ring-miso-accent"
                  />
                </div>
              </div>
            </div>

            {/* Sessions & Prints */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-3.5 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <label className="block text-[11px] font-bold text-miso-secondary mb-1">Số Lượt Chụp (Sessions)</label>
                <input
                  type="number"
                  value={totalSessions}
                  onChange={(e) => setTotalSessions(Number(e.target.value))}
                  className="w-full text-sm font-extrabold text-miso-dark bg-white rounded-lg px-2.5 py-1.5 border border-miso-light focus:outline-none focus:ring-1 focus:ring-miso-accent"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <label className="block text-[11px] font-bold text-miso-secondary mb-1">Dải Ảnh Đã In (Strips)</label>
                <input
                  type="number"
                  value={printsSold}
                  onChange={(e) => setPrintsSold(Number(e.target.value))}
                  className="w-full text-sm font-extrabold text-miso-primary bg-white rounded-lg px-2.5 py-1.5 border border-miso-light focus:outline-none focus:ring-1 focus:ring-miso-accent"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <label className="block text-[11px] font-bold text-miso-secondary mb-1">Ảnh Hỏng / Thử Máy</label>
                <input
                  type="number"
                  value={wastedPrints}
                  onChange={(e) => setWastedPrints(Number(e.target.value))}
                  className="w-full text-sm font-extrabold text-rose-600 bg-white rounded-lg px-2.5 py-1.5 border border-miso-light focus:outline-none focus:ring-1 focus:ring-miso-accent"
                />
              </div>
            </div>

            {/* Revenue Photobooth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <label className="block text-[11px] font-bold text-miso-secondary mb-1">Tiền Mặt Booth (VNĐ)</label>
                <input
                  type="number"
                  value={cashRevenue}
                  onChange={(e) => setCashRevenue(Number(e.target.value))}
                  className="w-full text-sm font-extrabold text-miso-dark bg-white rounded-lg px-2.5 py-1.5 border border-miso-light focus:outline-none focus:ring-1 focus:ring-miso-accent"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-miso-subtle border border-miso-light/50">
                <label className="block text-[11px] font-bold text-miso-secondary mb-1">Chuyển Khoản QR Booth (VNĐ)</label>
                <input
                  type="number"
                  value={transferRevenue}
                  onChange={(e) => setTransferRevenue(Number(e.target.value))}
                  className="w-full text-sm font-extrabold text-miso-primary bg-white rounded-lg px-2.5 py-1.5 border border-miso-light focus:outline-none focus:ring-1 focus:ring-miso-accent"
                />
              </div>
            </div>

            {/* Inventory Photobooth */}
            <div className="p-4 rounded-2xl bg-[#FCE4EC]/40 border border-[#F8BBD0] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span>Kiểm Kê Kho Vật Tư & Đạo Cụ Booth</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-rose-200">
                  <span className="text-[10px] text-miso-secondary">Cuộn giấy DNP còn:</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Film className="w-4 h-4 text-rose-600" />
                    <input
                      type="number"
                      value={paperRollsRemaining}
                      onChange={(e) => setPaperRollsRemaining(Number(e.target.value))}
                      className="w-16 font-extrabold text-miso-dark text-xs border rounded px-1.5 py-0.5"
                    />
                    <span className="text-[10px] font-bold text-miso-secondary">cuộn</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-rose-200">
                  <span className="text-[10px] text-miso-secondary">Phụ kiện & Đạo cụ:</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Glasses className="w-4 h-4 text-miso-accent" />
                    <span className="font-bold text-emerald-700">Đầy Đủ Đạo Cụ</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-rose-200">
                  <span className="text-[10px] text-miso-secondary">Máy in nhiệt:</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Printer className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-emerald-700">In sắc nét</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash Handover */}
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
                    className="w-full text-xs font-extrabold text-emerald-700 bg-white rounded-lg px-2 py-1 border border-miso-light focus:outline-none focus:ring-1 focus:ring-miso-accent mt-0.5"
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
              <label className="block text-xs font-bold text-miso-dark mb-1">Ghi Chú Ca Photobooth</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-miso-light bg-miso-subtle focus:bg-white focus:outline-none focus:ring-1 focus:ring-miso-accent"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-miso-accent hover:bg-miso-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Chốt Kết Ca Photobooth & Lưu Báo Cáo</span>
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-miso-light/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base font-bold text-miso-dark">Lịch Sử Ca Photobooth</h4>
              <span className="text-[10px] text-miso-secondary font-bold uppercase">{shifts.length} ca</span>
            </div>

            <div className="space-y-2.5">
              {shifts.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedShiftId(s.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedShiftId === s.id
                      ? 'border-miso-accent bg-miso-accent/5 shadow-xs'
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
                    <span className="text-miso-accent font-bold">{(s.totalRevenue / 1000000).toFixed(2)}M đ</span>
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
                  <span className="text-miso-secondary">Lượt chụp & in:</span>
                  <div className="font-bold text-miso-dark">{activeShift.totalSessions} lượt ({activeShift.printsSold} ảnh)</div>
                </div>
                <div>
                  <span className="text-miso-secondary">Ảnh hỏng/thử:</span>
                  <div className="font-bold text-rose-600">{activeShift.wastedPrints} tấm</div>
                </div>
                <div>
                  <span className="text-miso-secondary">Tiền mặt bàn giao:</span>
                  <div className="font-bold text-miso-dark">{activeShift.handedOverCash.toLocaleString('vi-VN')} đ</div>
                </div>
                <div>
                  <span className="text-miso-secondary">Chuyển khoản QR:</span>
                  <div className="font-bold text-miso-dark">{activeShift.transferRevenue.toLocaleString('vi-VN')} đ</div>
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
