import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Star, 
  HelpCircle,
  Lightbulb,
  CheckCircle,
  XCircle,
  Trophy,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathOperation, GradeLevel, MathQuestion } from '../types/math';
import { OPERATION_CARDS } from '../data/operations';
import { VisualMathDisplay } from './VisualMathDisplay';
import { sound } from '../utils/sound';

interface QuizScreenProps {
  operation: MathOperation;
  grade: GradeLevel;
  questions: MathQuestion[];
  onBackToHome: () => void;
  onFinishQuiz: (score: number, starsEarned: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isDemo?: boolean;
  onRequireActivation?: () => void;
}

const PRAISE_MESSAGES = [
  'Bé giỏi quá! Tuyệt vời! 🌟',
  'Chính xác 100%! Bé siêu thông minh! 🎉',
  'Xuất sắc luôn! Tiến lên nào! 🚀',
  'Đúng rồi! Bé là thiên tài tính nhẩm! 👑',
  'Hoan hô bé! Quá cừ luôn! 👏',
  'Tính nhanh như chớp! Thêm 1 ngôi sao vàng! ⭐',
];

const ENCOURAGE_MESSAGES = [
  'Gần đúng rồi, bé thử đếm lại xem nhé! 💡',
  'Đừng nản nhé, cùng đếm các hình nào! 🐥',
  'Không sao cả, bé thử lại một lần nữa nha! 🌈',
  'Bé quan sát kỹ số lượng từng nhóm nhé! ✨'
];

export const QuizScreen: React.FC<QuizScreenProps> = ({
  operation,
  questions,
  onBackToHome,
  onFinishQuiz,
  soundEnabled,
  onToggleSound,
  isDemo = false,
  onRequireActivation
}) => {
  const cardConfig = OPERATION_CARDS.find((c) => c.id === operation) || OPERATION_CARDS[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [praiseText, setPraiseText] = useState('');
  const [shakeWrong, setShakeWrong] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  const buttonColors = [
    {
      bg: 'bg-emerald-500 hover:bg-emerald-600 border-b-6 border-emerald-700 active:border-b-2 text-white',
      badge: 'bg-emerald-600 text-white'
    },
    {
      bg: 'bg-sky-500 hover:bg-sky-600 border-b-6 border-sky-700 active:border-b-2 text-white',
      badge: 'bg-sky-600 text-white'
    },
    {
      bg: 'bg-amber-500 hover:bg-amber-600 border-b-6 border-amber-700 active:border-b-2 text-white',
      badge: 'bg-amber-600 text-white'
    },
    {
      bg: 'bg-purple-500 hover:bg-purple-600 border-b-6 border-purple-700 active:border-b-2 text-white',
      badge: 'bg-purple-600 text-white'
    },
  ];

  const handleSelectOption = (opt: number) => {
    if (isAnswered) return;

    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === currentQ.result) {
      // Correct!
      setIsCorrect(true);
      setCorrectCount((prev) => prev + 1);
      setEarnedStars((prev) => prev + 1);
      sound.playCorrect();
      sound.playStar();

      // Trigger Confetti
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.65 }
      });

      const randomPraise = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
      setPraiseText(randomPraise);
    } else {
      // Wrong
      setIsCorrect(false);
      sound.playWrong();
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 600);

      const randomEncourage = ENCOURAGE_MESSAGES[Math.floor(Math.random() * ENCOURAGE_MESSAGES.length)];
      setPraiseText(randomEncourage);
    }
  };

  const handleNext = () => {
    sound.playClick();

    if (isDemo && currentIndex >= 2) {
      // Reached demo limit (3 questions)
      if (onRequireActivation) {
        onRequireActivation();
      }
      return;
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setShowHint(false);
      setPraiseText('');
    } else {
      // Finished quiz!
      sound.playWin();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.4 }
      });
      onFinishQuiz(correctCount + (isCorrect ? 0 : 0), earnedStars);
    }
  };

  const getOperatorSign = (op: MathOperation) => {
    switch (op) {
      case 'addition': return '+';
      case 'subtraction': return '−';
      case 'multiplication': return '×';
      case 'division': return '÷';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-pink-50 py-4 px-3 sm:px-6 flex flex-col justify-between">
      {/* Top Header Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between gap-3 mb-3">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onBackToHome();
          }}
          className="btn-candy flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-amber-100 text-amber-900 font-extrabold rounded-2xl shadow-sm border-2 border-amber-200 cursor-pointer text-sm"
        >
          <ArrowLeft className="w-5 h-5 text-amber-600" />
          <span className="hidden sm:inline">Quay lại</span>
        </button>

        {/* Progress & Title */}
        <div className="flex-1 max-w-md mx-2">
          <div className="flex items-center justify-between text-xs font-black text-slate-700 mb-1">
            <span className="flex items-center gap-1 text-slate-800">
              <span className="text-base">{cardConfig.symbol}</span>
              <span>{cardConfig.title}</span>
            </span>
            <span className="text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
              Câu {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full h-3.5 bg-amber-200/60 rounded-full overflow-hidden p-0.5 border border-amber-300">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Stars count & Audio toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400/30 border-2 border-yellow-400 text-yellow-900 rounded-2xl font-black text-sm shadow-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-500 animate-wiggle" />
            <span>{earnedStars}</span>
          </div>

          <button
            type="button"
            onClick={onToggleSound}
            className="p-2 bg-white text-slate-700 hover:text-amber-600 rounded-2xl border-2 border-slate-200 shadow-sm cursor-pointer"
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Main Quiz Card */}
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col justify-center my-2">
        <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl border-4 ${cardConfig.themeColor.border} relative overflow-hidden transition-transform ${shakeWrong ? 'animate-wiggle' : ''}`}>
          
          {/* Demo badge if playing demo */}
          {isDemo && (
            <div className="absolute top-2 right-4 bg-rose-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow animate-pulse">
              Học thử miễn phí (Câu {currentIndex + 1}/3)
            </div>
          )}

          {/* Question Text / Prompt */}
          <div className="text-center mb-3">
            <p className="text-slate-600 font-bold text-sm sm:text-base max-w-xl mx-auto">
              {currentQ.storyPrompt}
            </p>

            {/* Giant Math Equation Display */}
            <div className="my-2 inline-flex items-center justify-center gap-3 sm:gap-6 bg-amber-50/80 px-6 sm:px-10 py-3 rounded-2xl border-2 border-amber-200 shadow-inner">
              <span className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tight">
                {currentQ.num1}
              </span>
              <span className="text-3xl sm:text-5xl font-black text-amber-600">
                {getOperatorSign(currentQ.operation)}
              </span>
              <span className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tight">
                {currentQ.num2}
              </span>
              <span className="text-3xl sm:text-5xl font-black text-slate-400">
                =
              </span>
              <span className={`text-4xl sm:text-6xl font-black px-4 py-1 rounded-xl border-2 border-dashed ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-700'
                    : 'border-red-400 bg-red-100 text-red-600'
                  : 'border-amber-400 bg-white text-amber-500'
              }`}>
                {isAnswered ? selectedOption : '?'}
              </span>
            </div>
          </div>

          {/* Interactive Visual Counter (Tập đếm trực quan) */}
          <div className="bg-gradient-to-r from-amber-50/50 via-white to-amber-50/50 rounded-2xl p-2.5 border border-amber-200/70 mb-4">
            <VisualMathDisplay
              operation={currentQ.operation}
              num1={currentQ.num1}
              num2={currentQ.num2}
              result={currentQ.result}
              itemType={currentQ.itemType}
            />
          </div>

          {/* 4 Big Kid-Friendly Answer Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-2">
            {currentQ.options.map((opt, idx) => {
              const color = buttonColors[idx % buttonColors.length];
              let stateStyle = color.bg;

              if (isAnswered) {
                if (opt === currentQ.result) {
                  // highlight correct in bright green
                  stateStyle = 'bg-emerald-500 text-white border-b-6 border-emerald-700 ring-4 ring-emerald-300 scale-105';
                } else if (opt === selectedOption && !isCorrect) {
                  // highlight wrong picked in rose
                  stateStyle = 'bg-rose-500 text-white border-b-6 border-rose-700 opacity-80';
                } else {
                  // other options dimmed
                  stateStyle = 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 opacity-60';
                }
              }

              return (
                <button
                  key={`${currentQ.id}_opt_${opt}_${idx}`}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`btn-candy py-4 sm:py-6 px-4 rounded-3xl font-black text-3xl sm:text-5xl transition-all cursor-pointer flex flex-col items-center justify-center relative select-none shadow-lg ${stateStyle}`}
                >
                  <span className="leading-none">{opt}</span>
                  {isAnswered && opt === currentQ.result && (
                    <span className="absolute -top-3 -right-2 bg-yellow-400 text-yellow-950 text-xs font-black px-2 py-0.5 rounded-full border border-white shadow">
                      Đúng rồi ⭐
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Bar after Answering */}
          {isAnswered && (
            <div className={`mt-4 p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in ${
              isCorrect 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md ${
                  isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                }`}>
                  {isCorrect ? <CheckCircle className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black">{praiseText}</div>
                  <div className="text-xs sm:text-sm font-semibold opacity-90">{currentQ.explanation}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="btn-candy w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-base rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>{currentIndex + 1 < questions.length ? (isDemo && currentIndex >= 2 ? 'Kích hoạt để học tiếp' : 'Câu tiếp theo') : 'Xem kết quả'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Hint button if child needs help */}
          {!isAnswered && (
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowHint(!showHint);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 bg-amber-100/80 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>{showHint ? 'Ẩn gợi ý' : 'Bé cần gợi ý? Bấm đây!'}</span>
              </button>

              <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline">
                Chạm vào 1 trong 4 đáp án to ở trên nha!
              </span>
            </div>
          )}

          {showHint && !isAnswered && (
            <div className="mt-2 p-3 bg-yellow-50 rounded-xl border border-yellow-300 text-xs text-yellow-900 font-bold flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
              <span>
                💡 Mẹo nhỏ cho bé: Bé hãy chạm ngón tay vào từng hình ở khung trên để nghe đếm theo thứ tự, rồi so sánh với các đáp án nhé!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Motivational Mascot Text */}
      <div className="text-center text-xs font-bold text-amber-800/80 py-2">
        🌟 Chúc mừng bé đang luyện tập cùng Toán Học Vui Nhộn!
      </div>
    </div>
  );
};
