import React, { useState } from 'react';
import { X, ShieldCheck, Copy, Check, QrCode, Lock, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface LicenseInfoModalProps {
  unlocked: boolean;
  activationCodeUsed?: string;
  onClose: () => void;
  onReActivate: () => void;
}

export const LicenseInfoModal: React.FC<LicenseInfoModalProps> = ({
  unlocked,
  activationCodeUsed,
  onClose,
  onReActivate,
}) => {
  const [copiedStk, setCopiedStk] = useState(false);

  const accountNumber = '54955215016444';
  const transferContent = 'TOAN HOC VUI NHON';
  const qrUrl = `https://img.vietqr.io/image/agribank-${accountNumber}-compact2.png?amount=15000&addInfo=${encodeURIComponent(transferContent)}&accountName=TOAN%20HOC%20VUI%20NHON`;

  const copyStk = () => {
    sound.playClick();
    navigator.clipboard.writeText(accountNumber);
    setCopiedStk(true);
    setTimeout(() => setCopiedStk(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-4 border-amber-300 relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-amber-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Thông Tin Bản Quyền Ứng Dụng
              </h3>
              <p className="text-xs font-semibold text-emerald-700">
                Toán Học Vui Nhộn - Bé Giỏi Tính Nhẩm
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="my-3 p-4 rounded-2xl border-2 flex items-center gap-3 bg-emerald-50 border-emerald-300">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-sm font-black text-emerald-900">
              Trạng thái: {unlocked ? 'Đã kích hoạt Trọn Đời (VIP)' : 'Bản dùng thử miễn phí'}
            </div>
            <div className="text-xs font-semibold text-emerald-700">
              {unlocked
                ? `Mã kích hoạt: ${activationCodeUsed || 'CONFIRMED_VIP'} • Sử dụng vĩnh viễn trên thiết bị này`
                : 'Vui lòng kích hoạt 15.000 VNĐ để mở khóa không giới hạn'}
            </div>
          </div>
        </div>

        {/* Banking Detail */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs font-bold text-slate-700">
          <div className="text-slate-500 font-extrabold uppercase text-[11px]">
            Thông tin thanh toán kích hoạt:
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200">
            <span className="text-slate-500">Ngân hàng:</span>
            <span className="text-red-700 font-black">Agribank (Ngân hàng Nông nghiệp)</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200">
            <span className="text-slate-500">Số tài khoản:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black text-red-800">{accountNumber}</span>
              <button
                type="button"
                onClick={copyStk}
                className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-[10px] font-black flex items-center gap-1 cursor-pointer"
              >
                {copiedStk ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedStk ? 'Đã chép' : 'Chép STK'}</span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200">
            <span className="text-slate-500">Chi phí bản quyền:</span>
            <span className="text-emerald-700 font-black text-sm">15.000 VNĐ (Trọn đời)</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">Nội dung chuyển khoản:</span>
            <span className="font-mono text-slate-800 font-bold">{transferContent}</span>
          </div>
        </div>

        {/* QR Preview Mini */}
        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-2xl border border-amber-200 mt-3">
          <img
            src={qrUrl}
            alt="VietQR Agribank"
            className="w-16 h-16 object-contain rounded-lg border border-amber-300 bg-white p-1 shrink-0"
          />
          <div className="text-xs text-amber-900 font-semibold">
            <span className="font-black block text-amber-950">Mã VietQR Agribank</span>
            Quét mã để kích hoạt nhanh trên mọi ứng dụng ngân hàng di động.
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-4 flex gap-2">
          {!unlocked ? (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onReActivate();
              }}
              className="btn-candy flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Mở Màn Hình Kích Hoạt</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="btn-candy flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-2xl shadow-md cursor-pointer"
            >
              Đóng lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
