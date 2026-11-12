import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  KeyRound, 
  ShieldCheck, 
  HeartHandshake, 
  Lock, 
  ArrowRight,
  GraduationCap,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface LockScreenProps {
  onUnlock: (code?: string) => void;
  onTryDemo: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, onTryDemo }) => {
  const [activationCode, setActivationCode] = useState('');
  const [copiedStk, setCopiedStk] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showQrZoom, setShowQrZoom] = useState(false);

  const bankName = 'Agribank';
  const fullBankName = 'Ngân hàng Nông nghiệp & PTNT Việt Nam';
  const accountNumber = '54955215016444';
  const amount = '15.000 VNĐ';
  const transferContent = 'TOAN HOC VUI NHON';

  // Real VietQR quick scan URL
  const qrUrl = `https://img.vietqr.io/image/agribank-${accountNumber}-compact2.png?amount=15000&addInfo=${encodeURIComponent(transferContent)}&accountName=TOAN%20HOC%20VUI%20NHON`;

  const copyToClipboard = (text: string, type: 'stk' | 'content') => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    if (type === 'stk') {
      setCopiedStk(true);
      setTimeout(() => setCopiedStk(false), 2000);
    } else {
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    }
  };

  const handleConfirmPaid = () => {
    sound.playWin();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10B981', '#F59E0B', '#EC4899', '#3B82F6', '#8B5CF6']
    });
    onUnlock('CONFIRMED_TRANSFER');
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = activationCode.trim().toUpperCase();
    if (!cleanCode) {
      setErrorMessage('Vui lòng nhập mã kích hoạt hoặc bấm nút "Xác nhận vào học" bên dưới.');
      sound.playWrong();
      return;
    }

    // Accept popular demo/voucher codes or any input from parent
    sound.playWin();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#F59E0B', '#EC4899', '#10B981', '#3B82F6']
    });
    onUnlock(cleanCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-pink-100 py-6 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Decorative whimsical floating elements */}
      <div className="absolute top-6 left-6 text-5xl opacity-40 animate-float pointer-events-none select-none">🎈</div>
      <div className="absolute top-20 right-8 text-5xl opacity-40 animate-bounce-slow pointer-events-none select-none">⭐</div>
      <div className="absolute bottom-8 left-10 text-6xl opacity-30 animate-pulse-glow pointer-events-none select-none">🍎</div>
      <div className="absolute bottom-12 right-10 text-6xl opacity-30 animate-float pointer-events-none select-none">🍬</div>

      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden relative z-10 transition-all">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 p-6 text-white text-center relative shadow-inner">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-extrabold uppercase tracking-wider mb-2 border border-white/30 animate-pulse">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Bản Quyền Học Tập Trọn Đời
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-md">
            Toán Học Vui Nhộn - Bé Giỏi Tính Nhẩm
          </h1>
          <p className="text-amber-100 text-sm sm:text-base font-semibold mt-1 max-w-xl mx-auto">
            Học toán hào hứng với hình ảnh sinh động, bảng cửu chương thông minh và âm thanh vui nhộn cho bé tiểu học!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Fee & Perks Highlight Box */}
          <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30 font-black">
                15K
              </div>
              <div>
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">Chi phí kích hoạt duy nhất</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-900">{amount} <span className="text-sm font-semibold text-amber-600">/ Trọn đời</span></div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs font-bold text-emerald-800">
              <span className="bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Dùng vĩnh viễn
              </span>
              <span className="bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Mở khóa 4 phép tính
              </span>
              <span className="bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Không quảng cáo
              </span>
            </div>
          </div>

          {/* Bank Transfer Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* QR Code Column */}
            <div className="md:col-span-5 bg-gradient-to-b from-red-50 to-amber-50 rounded-2xl p-4 border-2 border-red-200 flex flex-col items-center justify-center text-center">
              <div className="text-xs font-black text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                Quét mã VietQR nhanh
              </div>
              
              <div 
                className="relative bg-white p-2.5 rounded-2xl shadow-md border-2 border-red-300 cursor-pointer group hover:shadow-lg transition-all"
                onClick={() => setShowQrZoom(!showQrZoom)}
                title="Bấm để phóng to mã QR"
              >
                <img 
                  src={qrUrl} 
                  alt="Mã QR Chuyển khoản Agribank" 
                  className="w-44 h-44 object-contain rounded-xl"
                  onError={(e) => {
                    // Fallback to stylized SVG QR visual if network image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.svg-qr-fallback')) {
                      const div = document.createElement('div');
                      div.className = 'w-44 h-44 bg-amber-100 rounded-xl flex flex-col items-center justify-center p-3 text-center svg-qr-fallback';
                      div.innerHTML = `
                        <div class="text-3xl mb-1">📱</div>
                        <div class="font-extrabold text-sm text-red-700">Agribank QR</div>
                        <div class="font-mono text-xs text-slate-700 mt-1">54955215016444</div>
                        <div class="text-xs font-bold text-emerald-700 mt-1">15.000 VNĐ</div>
                      `;
                      parent.appendChild(div);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-red-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-md shadow">Mở app Ngân hàng để quét</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-2">
                Hỗ trợ tất cả ứng dụng ngân hàng & ví điện tử
              </p>
            </div>

            {/* Bank Info Details Column */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                {/* Bank Name */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Ngân hàng thụ hưởng</div>
                  <div className="text-base sm:text-lg font-black text-red-700 flex items-center justify-between">
                    <span>{bankName}</span>
                    <span className="text-xs font-semibold text-slate-500 hidden sm:inline">{fullBankName}</span>
                  </div>
                </div>

                {/* Account Number */}
                <div className="bg-red-50/70 rounded-xl p-3 border-2 border-red-300 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-red-600 uppercase">Số tài khoản</div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-red-800 tracking-wider">
                      {accountNumber}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(accountNumber, 'stk')}
                    className="btn-candy flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/30"
                  >
                    {copiedStk ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedStk ? 'Đã sao chép!' : 'Sao chép'}</span>
                  </button>
                </div>

                {/* Amount & Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Số tiền thanh toán</div>
                    <div className="text-lg font-black text-emerald-600">15.000 VNĐ</div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase">Nội dung chuyển khoản</div>
                      <div className="text-sm font-black text-slate-800 font-mono">{transferContent}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(transferContent, 'content')}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-200 rounded-lg transition"
                      title="Sao chép nội dung"
                    >
                      {copiedContent ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Instant Unlock Button */}
              <button
                type="button"
                onClick={handleConfirmPaid}
                className="btn-candy w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg shadow-emerald-500/40 flex items-center justify-center gap-2 border-b-4 border-emerald-700 active:border-b-0 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                <span>Tôi đã chuyển khoản / Xác nhận vào học</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Activation Code Form & Demo Button */}
          <div className="pt-2 border-t-2 border-dashed border-amber-200">
            <form onSubmit={handleCodeSubmit} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Hoặc nhập mã kích hoạt bản quyền (nếu có):
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={activationCode}
                    onChange={(e) => {
                      setActivationCode(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Ví dụ: BEGIOITOAN hoặc VIP15K..."
                    className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-200 rounded-xl font-bold text-slate-800 uppercase outline-none transition text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-candy px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl shadow-md shadow-amber-500/30 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Kích hoạt ngay</span>
                </button>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-xs font-bold mt-1 bg-red-50 p-2 rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}
            </form>

            {/* Trial / Demo Option */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-2 text-xs font-bold text-slate-600 bg-amber-50/70 p-3 rounded-xl border border-amber-200">
              <span className="flex items-center gap-1.5 text-slate-700">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                Muốn trải nghiệm thử trước?
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onTryDemo();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-100 text-amber-800 rounded-lg border border-amber-300 font-extrabold shadow-sm transition cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-amber-600" />
                Học thử miễn phí 3 câu
              </button>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="bg-slate-100 px-6 py-3.5 text-center text-xs font-semibold text-slate-600 flex items-center justify-center gap-2 border-t border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Bảo hành hỗ trợ trọn đời cho phụ huynh & học sinh Việt Nam</span>
          <span className="text-slate-300">•</span>
          <HeartHandshake className="w-4 h-4 text-rose-500" />
          <span>Đồng hành cùng bé giỏi toán</span>
        </div>
      </div>
    </div>
  );
};
