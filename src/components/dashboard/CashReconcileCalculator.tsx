'use client';

import React, { useState } from 'react';
import {
  Calculator,
  RotateCcw,
  Wallet,
  CreditCard,
  Coins,
  HandCoins,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
} from 'lucide-react';

export interface CashReconcileData {
  cashAmount: number; // Tiền mặt thu
  balanceAmount: number; // Tiền số dư (chuyển khoản / ngân hàng)
  baseAmount: number; // Tiền cốt đầu ca
  staffHeldAmount: number; // Tiền nhân viên giữ
}

interface CashReconcileCalculatorProps {
  initialValues?: Partial<CashReconcileData>;
  onChange?: (result: {
    data: CashReconcileData;
    targetAmount: number;
    difference: number;
    status: 'duong' | 'am' | 'can_bang';
  }) => void;
  title?: string;
  subtitle?: string;
}

export function CashReconcileCalculator({
  initialValues,
  onChange,
  title = 'Bộ Đối Soát Tiền Ca (Âm / Dương)',
  subtitle = 'Công thức: Tiền mặt + Tiền số dư - Tiền cốt đầu ca rồi so sánh với Tiền nhân viên giữ',
}: CashReconcileCalculatorProps) {
  const [cashAmount, setCashAmount] = useState<number>(initialValues?.cashAmount ?? 3420000);
  const [balanceAmount, setBalanceAmount] = useState<number>(initialValues?.balanceAmount ?? 5860000);
  const [baseAmount, setBaseAmount] = useState<number>(initialValues?.baseAmount ?? 1000000);
  const [staffHeldAmount, setStaffHeldAmount] = useState<number>(
    initialValues?.staffHeldAmount ?? 8280000
  );

  // Công thức: Tiền mặt + Tiền số dư - Tiền cốt đầu ca
  const targetAmount = cashAmount + balanceAmount - baseAmount;
  // So sánh với Tiền nhân viên giữ:
  const difference = staffHeldAmount - targetAmount;

  let status: 'duong' | 'am' | 'can_bang' = 'can_bang';
  if (difference > 0) status = 'duong';
  else if (difference < 0) status = 'am';

  const notify = (c: number, b: number, base: number, s: number) => {
    if (!onChange) return;
    const target = c + b - base;
    const diff = s - target;
    const st = diff > 0 ? 'duong' : diff < 0 ? 'am' : 'can_bang';
    onChange({
      data: { cashAmount: c, balanceAmount: b, baseAmount: base, staffHeldAmount: s },
      targetAmount: target,
      difference: diff,
      status: st,
    });
  };

  const handleUpdate = (field: 'cash' | 'balance' | 'base' | 'staff', val: number) => {
    const v = Math.max(0, isNaN(val) ? 0 : val);
    let nextC = cashAmount, nextB = balanceAmount, nextBase = baseAmount, nextS = staffHeldAmount;
    if (field === 'cash') { nextC = v; setCashAmount(v); }
    else if (field === 'balance') { nextB = v; setBalanceAmount(v); }
    else if (field === 'base') { nextBase = v; setBaseAmount(v); }
    else if (field === 'staff') { nextS = v; setStaffHeldAmount(v); }
    notify(nextC, nextB, nextBase, nextS);
  };
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-miso-light/70 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-miso-light/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-miso-primary/10 text-miso-primary flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-miso-dark">{title}</h4>
          </div>
          <p className="text-xs text-miso-secondary mt-0.5">{subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCashAmount(0); setBalanceAmount(0); setBaseAmount(0); setStaffHeldAmount(0);
            notify(0, 0, 0, 0);
          }}
          className="inline-flex items-center gap-1.5 text-xs text-miso-secondary hover:text-miso-primary px-2.5 py-1 rounded-lg border border-miso-light hover:bg-miso-subtle transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* 4 Input Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Box 1: Tiền mặt */}
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-amber-700" />
              <span>Tiền Mặt</span>
            </span>
            <span className="text-[10px] bg-amber-200/60 text-amber-900 font-extrabold px-1.5 py-0.5 rounded">
              (+) Thu ca
            </span>
          </div>
          <input
            type="number"
            min={0}
            step={1000}
            value={cashAmount || ''}
            onChange={(e) => handleUpdate('cash', Number(e.target.value))}
            placeholder="0"
            className="w-full text-base font-extrabold text-miso-dark bg-white rounded-xl px-3 py-2 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <div className="text-[11px] font-semibold text-amber-800 text-right">
            {cashAmount.toLocaleString('vi-VN')} đ
          </div>
        </div>

        {/* Box 2: Tiền số dư */}
        <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-blue-700" />
              <span>Tiền Số Dư</span>
            </span>
            <span className="text-[10px] bg-blue-200/60 text-blue-900 font-extrabold px-1.5 py-0.5 rounded">
              (+) Chuyển khoản
            </span>
          </div>
          <input
            type="number"
            min={0}
            step={1000}
            value={balanceAmount || ''}
            onChange={(e) => handleUpdate('balance', Number(e.target.value))}
            placeholder="0"
            className="w-full text-base font-extrabold text-blue-800 bg-white rounded-xl px-3 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-[11px] font-semibold text-blue-800 text-right">
            {balanceAmount.toLocaleString('vi-VN')} đ
          </div>
        </div>
        {/* Box 3: Tiền cốt đầu ca */}
        <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-900 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-rose-700" />
              <span>Tiền Cốt Đầu Ca</span>
            </span>
            <span className="text-[10px] bg-rose-200/60 text-rose-900 font-extrabold px-1.5 py-0.5 rounded">
              (-) Vốn cốt
            </span>
          </div>
          <input
            type="number"
            min={0}
            step={1000}
            value={baseAmount || ''}
            onChange={(e) => handleUpdate('base', Number(e.target.value))}
            placeholder="0"
            className="w-full text-base font-extrabold text-rose-800 bg-white rounded-xl px-3 py-2 border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <div className="text-[11px] font-semibold text-rose-800 text-right">
            {baseAmount.toLocaleString('vi-VN')} đ
          </div>
        </div>

        {/* Box 4: Tiền nhân viên giữ */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-500 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-950 flex items-center gap-1">
              <HandCoins className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tiền Nhân Viên Giữ</span>
            </span>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 font-extrabold px-1.5 py-0.5 rounded">
              Thực tế
            </span>
          </div>
          <input
            type="number"
            min={0}
            step={1000}
            value={staffHeldAmount || ''}
            onChange={(e) => handleUpdate('staff', Number(e.target.value))}
            placeholder="0"
            className="w-full text-base font-extrabold text-emerald-900 bg-white rounded-xl px-3 py-2 border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <div className="text-[11px] font-semibold text-emerald-800 text-right">
            {staffHeldAmount.toLocaleString('vi-VN')} đ
          </div>
        </div>
      </div>

      {/* Visual Formula Strip */}
      <div className="p-3 rounded-2xl bg-miso-subtle border border-miso-light/70 text-xs text-miso-dark">
        <div className="flex flex-wrap items-center justify-center gap-2 text-center font-bold">
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900">
            Tiền mặt: {cashAmount.toLocaleString('vi-VN')}
          </span>
          <span className="text-miso-primary font-black">+</span>
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900">
            Tiền số dư: {balanceAmount.toLocaleString('vi-VN')}
          </span>
          <span className="text-rose-600 font-black">-</span>
          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900">
            Tiền cốt: {baseAmount.toLocaleString('vi-VN')}
          </span>
          <span className="text-miso-dark font-black">=</span>
          <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-900 font-extrabold">
            Tiêu chuẩn: {targetAmount.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>
      {/* Result Card: Âm or Dương */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          status === 'duong'
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950'
            : status === 'am'
            ? 'bg-rose-500/10 border-rose-500/40 text-rose-950'
            : 'bg-blue-500/10 border-blue-500/40 text-blue-950'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm ${
                status === 'duong'
                  ? 'bg-emerald-600'
                  : status === 'am'
                  ? 'bg-rose-600'
                  : 'bg-blue-600'
              }`}
            >
              {status === 'duong' && <TrendingUp className="w-6 h-6" />}
              {status === 'am' && <TrendingDown className="w-6 h-6" />}
              {status === 'can_bang' && <CheckCircle2 className="w-6 h-6" />}
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-miso-secondary">
                So Sánh Với Tiền Nhân Viên Giữ ({staffHeldAmount.toLocaleString('vi-VN')} đ)
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span
                  className={`text-xl sm:text-2xl font-serif font-black ${
                    status === 'duong'
                      ? 'text-emerald-700'
                      : status === 'am'
                      ? 'text-rose-700'
                      : 'text-blue-700'
                  }`}
                >
                  {status === 'duong' && 'KẾT QUẢ: DƯƠNG (+)'}
                  {status === 'am' && 'KẾT QUẢ: BỊ ÂM (-)'}
                  {status === 'can_bang' && 'KẾT QUẢ: CÂN BẰNG (0 Đ)'}
                </span>

                <span
                  className={`text-base sm:text-lg font-mono font-bold ${
                    status === 'duong'
                      ? 'text-emerald-800'
                      : status === 'am'
                      ? 'text-rose-800'
                      : 'text-blue-800'
                  }`}
                >
                  {difference > 0 ? `+${difference.toLocaleString('vi-VN')} đ` : `${difference.toLocaleString('vi-VN')} đ`}
                </span>
              </div>
            </div>
          </div>

          <div className="sm:text-right">
            <div
              className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                status === 'duong'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : status === 'am'
                  ? 'bg-rose-100 text-rose-900 border border-rose-300'
                  : 'bg-blue-100 text-blue-900 border border-blue-300'
              }`}
            >
              {status === 'duong' && '✓ Nhân viên giữ THỪA tiền'}
              {status === 'am' && '⚠ Nhân viên giữ THIẾU tiền (Bị hụt quỹ)'}
              {status === 'can_bang' && '✓ Khớp chuẩn 100%, không lệch'}
            </div>
            <div className="text-[11px] text-miso-secondary mt-1">
              {status === 'duong' && `Thừa: +${difference.toLocaleString('vi-VN')} đ so với tiêu chuẩn`}
              {status === 'am' && `Thiếu: ${Math.abs(difference).toLocaleString('vi-VN')} đ so với tiêu chuẩn`}
              {status === 'can_bang' && 'Khớp hoàn toàn với tiêu chuẩn ca'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



