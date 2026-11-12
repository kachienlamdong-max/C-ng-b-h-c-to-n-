import React from 'react';
import { X, Award, Star, CheckCircle, Lock } from 'lucide-react';
import { sound } from '../utils/sound';

interface BadgeModalProps {
  totalStars: number;
  unlocked: boolean;
  onClose: () => void;
}

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  color: string;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ totalStars, unlocked, onClose }) => {
  const badges: BadgeItem[] = [
    {
      id: 'lifetime_member',
      name: 'Bé Học Trọn Đời',
      description: 'Kích hoạt bản quyền trọn đời',
      icon: '👑',
      earned: unlocked,
      color: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      id: 'first_star',
      name: 'Ngôi Sao Đầu Tiên',
      description: 'Đạt được ít nhất 1 ngôi sao',
      icon: '⭐',
      earned: totalStars >= 1,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    },
    {
      id: 'star_collector_10',
      name: 'Ong Vàng Chăm Chỉ',
      description: 'Tích lũy được 10 ngôi sao',
      icon: '🐝',
      earned: totalStars >= 10,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'star_collector_30',
      name: 'Thám Tử Phép Tính',
      description: 'Tích lũy được 30 ngôi sao',
      icon: '🔍',
      earned: totalStars >= 30,
      color: 'bg-sky-100 text-sky-800 border-sky-300',
    },
    {
      id: 'star_collector_50',
      name: 'Bậc Thầy Tính Nhẩm',
      description: 'Tích lũy được 50 ngôi sao',
      icon: '🧙‍♂️',
      earned: totalStars >= 50,
      color: 'bg-purple-100 text-purple-800 border-purple-300',
    },
    {
      id: 'star_collector_100',
      name: 'Siêu Nhân Toán Học',
      description: 'Chinh phục 100 ngôi sao sáng',
      icon: '🦸‍♂️',
      earned: totalStars >= 100,
      color: 'bg-rose-100 text-rose-800 border-rose-300',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-4 border-amber-300 relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-amber-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-amber-950">
                Khu Vườn Huy Hiệu Của Bé
              </h3>
              <p className="text-xs font-semibold text-amber-700">
                Bộ sưu tập thành tích học tập vẻ vang
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

        {/* Current Stars Overview */}
        <div className="bg-amber-50 rounded-2xl p-3 my-3 border border-amber-200 flex items-center justify-between">
          <span className="text-xs font-black text-amber-900 uppercase">
            Tổng sao hiện tại:
          </span>
          <div className="flex items-center gap-1.5 text-lg font-black text-amber-600 bg-white px-3 py-1 rounded-xl border border-amber-200 shadow-sm">
            <span>{totalStars}</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
          </div>
        </div>

        {/* Badges Grid */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                badge.earned
                  ? `${badge.color} shadow-sm`
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                  badge.earned ? 'bg-white' : 'bg-slate-200'
                }`}>
                  {badge.earned ? badge.icon : '🔒'}
                </div>
                <div>
                  <div className="text-sm font-black text-slate-800">
                    {badge.name}
                  </div>
                  <div className="text-xs font-semibold">
                    {badge.description}
                  </div>
                </div>
              </div>

              <div>
                {badge.earned ? (
                  <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                    <CheckCircle className="w-3 h-3" /> Đạt được
                  </span>
                ) : (
                  <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Chưa mở
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
