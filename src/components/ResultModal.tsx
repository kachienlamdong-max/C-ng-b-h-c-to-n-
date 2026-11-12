import React from 'react';
import { Trophy, Star, RotateCcw, Home, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface ResultModalProps {
  score: number;
  totalQuestions: number;
  starsEarned: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
  onOpenMultiplicationTable: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  score,
  totalQuestions,
  starsEarned,
  onPlayAgain,
  onGoHome,
  onOpenMultiplicationTable,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const starsCount = percentage >= 90 ? 3 : percentage >= 60 ? 2 : 1;

  let title = 'Tuyệt Vời!';
  let subText = 'Bé tính toán siêu đẳng!';
  if (starsCount === 3) {
    title = 'Thiên Tài Tính Nhẩm!';
    subText = 'Bé trả lời đúng hầu hết các câu hỏi. Quá xuất sắc!';
  } else if (starsCount === 2) {
    title = 'Bé Rất Giỏi!';
    subText = 'Cố gắng một chút nữa là đạt điểm tối đa rồi nhé!';
  } else {
    title = 'Cố Lên Bé Ơi!';
    subText = 'Luyện tập thêm một lần nữa sẽ giỏi hơn nhiều nè!';
  }

  const triggerCelebrate = () => {
    sound.playWin();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center border-4 border-amber-300 shadow-2xl relative overflow-hidden animate-scale-up">
        {/* Decorative background circle */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-yellow-200 rounded-full blur-2xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-pink-200 rounded-full blur-2xl opacity-60 pointer-events-none" />

        {/* Mascot / Trophy Icon */}
        <div className="relative inline-block mb-3">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-xl shadow-amber-400/40 mx-auto text-white">
            <Trophy className="w-13 h-13 drop-shadow animate-bounce-slow" />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-rose-500 text-white text-xs font-black px-2 py-0.5 rounded-full border-2 border-white shadow">
            +{starsEarned} ⭐
          </span>
        </div>

        {/* Animated 3-Star Rating */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              className={`w-10 h-10 transition-all duration-500 ${
                starIdx <= starsCount
                  ? 'fill-amber-400 text-amber-500 scale-110 drop-shadow'
                  : 'fill-slate-200 text-slate-300'
              }`}
            />
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          {title}
        </h2>
        <p className="text-slate-600 font-bold text-sm mt-1 mb-4">
          {subText}
        </p>

        {/* Score Card Stats */}
        <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 mb-6 grid grid-cols-2 gap-3 text-center">
          <div className="bg-white rounded-xl p-3 border border-amber-200">
            <div className="text-xs font-bold text-slate-500 uppercase">Trả lời đúng</div>
            <div className="text-2xl font-black text-emerald-600">
              {score} / {totalQuestions}
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-amber-200">
            <div className="text-xs font-bold text-slate-500 uppercase">Sao thưởng</div>
            <div className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
              <span>+{starsEarned}</span>
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => {
              triggerCelebrate();
              onPlayAgain();
            }}
            className="btn-candy w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer border-b-4 border-emerald-700 active:border-b-0"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Luyện tập lại vòng này</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onGoHome();
            }}
            className="btn-candy w-full py-3.5 px-6 bg-amber-500 hover:bg-amber-600 text-white font-black text-base rounded-2xl shadow-md shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer border-b-4 border-amber-700 active:border-b-0"
          >
            <Home className="w-5 h-5" />
            <span>Về màn hình chính</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenMultiplicationTable();
            }}
            className="w-full py-2.5 text-xs font-extrabold text-slate-600 hover:text-amber-700 flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Xem Bảng Cửu Chương Hình Ảnh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
