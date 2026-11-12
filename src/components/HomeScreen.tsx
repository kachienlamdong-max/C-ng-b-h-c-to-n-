import React from 'react';
import { 
  Sparkles, 
  Star, 
  Volume2, 
  VolumeX, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight, 
  Flame,
  Zap,
  GraduationCap
} from 'lucide-react';
import { MathOperation, GradeLevel } from '../types/math';
import { OPERATION_CARDS } from '../data/operations';
import { sound } from '../utils/sound';

interface HomeScreenProps {
  onSelectOperation: (op: MathOperation) => void;
  selectedGrade: GradeLevel;
  onChangeGrade: (grade: GradeLevel) => void;
  totalStars: number;
  unlocked: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenMultiplicationTable: () => void;
  onOpenBadges: () => void;
  onOpenLicenseInfo: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectOperation,
  selectedGrade,
  onChangeGrade,
  totalStars,
  unlocked,
  soundEnabled,
  onToggleSound,
  onOpenMultiplicationTable,
  onOpenBadges,
  onOpenLicenseInfo,
}) => {
  const gradeLabels: { id: GradeLevel; label: string; desc: string }[] = [
    { id: 'lop1', label: 'Bé Lớp 1', desc: 'Phạm vi 10 - 20' },
    { id: 'lop2', label: 'Bé Lớp 2', desc: 'Phạm vi 100 & Nhân 2-5' },
    { id: 'lop3', label: 'Bé Lớp 3', desc: 'Bảng cửu chương 2-9 & Chia' },
  ];

  const handleCardClick = (opId: MathOperation) => {
    sound.playClick();
    onSelectOperation(opId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/70 to-pink-50 py-5 px-3 sm:px-6 relative overflow-x-hidden">
      {/* Decorative background whimsical elements */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-16 w-56 h-56 bg-pink-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Floating cute emojis */}
      <span className="absolute top-16 left-6 text-3xl opacity-30 animate-float pointer-events-none select-none">🍬</span>
      <span className="absolute top-36 right-8 text-4xl opacity-30 animate-bounce-slow pointer-events-none select-none">⭐</span>
      <span className="absolute bottom-20 left-12 text-4xl opacity-25 animate-float pointer-events-none select-none">🍎</span>
      <span className="absolute bottom-12 right-12 text-3xl opacity-25 animate-wiggle pointer-events-none select-none">🎈</span>

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        {/* Top Navbar */}
        <header className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-amber-300 shadow-lg">
          {/* Brand & Mascot */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-2xl shadow-md shadow-amber-400/30 animate-bounce-slow">
              🐱
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-black text-amber-950 tracking-tight">
                  Toán Học Vui Nhộn
                </h1>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                  Tiểu Học
                </span>
              </div>
              <p className="text-xs font-bold text-amber-700">
                Bé Giỏi Tính Nhẩm Mỗi Ngày 🌟
              </p>
            </div>
          </div>

          {/* Quick Access Badges & Stars */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Stars Box */}
            <div 
              onClick={() => { sound.playClick(); onOpenBadges(); }}
              className="btn-candy flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/20 hover:bg-yellow-400/30 border-2 border-yellow-400 rounded-2xl font-black text-amber-900 cursor-pointer shadow-sm text-sm"
              title="Bấm để xem kho sao & huy hiệu"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-wiggle" />
              <span>{totalStars}</span>
              <span className="text-xs font-bold text-amber-700 hidden sm:inline">sao</span>
            </div>

            {/* Badges Button */}
            <button
              type="button"
              onClick={() => { sound.playClick(); onOpenBadges(); }}
              className="btn-candy flex items-center gap-1 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 border-2 border-purple-300 rounded-2xl font-extrabold text-xs cursor-pointer shadow-sm"
            >
              <Award className="w-4 h-4 text-purple-600" />
              <span className="hidden sm:inline">Huy hiệu</span>
            </button>

            {/* Times Table Quick Button */}
            <button
              type="button"
              onClick={() => { sound.playClick(); onOpenMultiplicationTable(); }}
              className="btn-candy flex items-center gap-1 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-2 border-emerald-300 rounded-2xl font-extrabold text-xs cursor-pointer shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Cửu chương</span>
            </button>

            {/* License Status Badge */}
            <button
              type="button"
              onClick={() => { sound.playClick(); onOpenLicenseInfo(); }}
              className={`btn-candy flex items-center gap-1 px-3 py-1.5 rounded-2xl font-extrabold text-xs cursor-pointer shadow-sm border-2 ${
                unlocked
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}
              title="Thông tin bản quyền Agribank"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{unlocked ? 'VIP Trọn Đời' : 'Chưa Kích Hoạt'}</span>
            </button>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={onToggleSound}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl border border-slate-300 cursor-pointer transition shadow-sm"
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </header>

        {/* Grade Level Selector */}
        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-3xl border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2 text-slate-700">
            <GraduationCap className="w-5 h-5 text-amber-600" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wide">
              Chọn Lớp Học Của Bé:
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
            {gradeLabels.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onChangeGrade(g.id);
                }}
                className={`btn-candy px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer text-center ${
                  selectedGrade === g.id
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/40 ring-2 ring-amber-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-amber-100'
                }`}
              >
                <div>{g.label}</div>
                <div className="text-[10px] font-semibold opacity-85 hidden sm:block">
                  {g.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Hero Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 p-5 sm:p-7 rounded-3xl border-4 border-amber-200 shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black uppercase mb-2 border border-white/30">
              <Zap className="w-3.5 h-3.5 text-yellow-200" /> Bé Giỏi Tính Nhẩm
            </div>
            <h2 className="text-2xl sm:text-4xl font-black drop-shadow tracking-tight">
              Bé Muốn Chinh Phục Dạng Toán Nào?
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm font-bold mt-1">
              Bấm vào 1 trong 4 khung thẻ bên dưới để bắt đầu giải câu đố vui nhộn và rinh thật nhiều ngôi sao vàng nhé!
            </p>
          </div>

          {/* Cute mascot illustration in banner */}
          <div className="absolute -bottom-2 right-4 sm:right-10 text-6xl sm:text-8xl select-none animate-bounce-slow pointer-events-none drop-shadow-lg">
            🦁
          </div>
        </div>

        {/* 4 CARDS GRID (Bố cục 4 thẻ bo tròn nổi bật theo yêu cầu) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
          {OPERATION_CARDS.map((card, idx) => {
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`group relative bg-white rounded-3xl p-5 sm:p-6 border-4 ${card.themeColor.border} shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-1.5 cursor-pointer overflow-hidden flex flex-col justify-between`}
              >
                {/* Decorative Top Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-3 ${card.themeColor.bg}`} />

                {/* Top Card Section: Badge & Big Operator Icon */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full border ${card.themeColor.badgeBg} shadow-sm`}>
                    Khung {idx + 1}: {card.badge}
                  </span>

                  {/* Big Glowing Operator Sign */}
                  <div className={`w-14 h-14 rounded-2xl ${card.themeColor.bg} text-white font-black text-3xl sm:text-4xl flex items-center justify-center shadow-lg ${card.themeColor.shadow} group-hover:scale-110 transition-transform`}>
                    {card.symbol}
                  </div>
                </div>

                {/* Card Title & Description */}
                <div className="space-y-1.5 my-2">
                  <h3 className={`text-xl sm:text-2xl font-black ${card.themeColor.text} tracking-tight group-hover:text-amber-600 transition-colors`}>
                    {card.title}
                  </h3>
                  <p className="text-slate-600 font-bold text-xs sm:text-sm">
                    {card.subtitle}
                  </p>
                </div>

                {/* Sample visual items list */}
                <div className="flex items-center gap-2 my-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] font-black text-slate-500 uppercase">
                    Đếm hình:
                  </span>
                  <div className="flex items-center gap-1.5 text-xl">
                    {card.sampleItems.map((item, i) => (
                      <span key={i} className="hover:scale-125 transition-transform">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Call to Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    className={`btn-candy w-full py-3 px-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md ${card.themeColor.buttonBg} border-b-4 border-black/20 active:border-b-0`}
                  >
                    <span>Luyện Tập Ngay</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Educational Tip / Motivation */}
        <div className="bg-white/80 rounded-3xl p-4 border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-bold text-slate-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <span>
              Mỗi ngày bé chỉ cần dành 10 - 15 phút luyện tập để xây dựng nền tảng tư duy toán học vững chắc!
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenMultiplicationTable();
            }}
            className="text-purple-600 hover:text-purple-800 font-extrabold underline whitespace-nowrap cursor-pointer"
          >
            Mở bảng cửu chương ➔
          </button>
        </div>
      </div>
    </div>
  );
};
