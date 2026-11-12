import React, { useState } from 'react';
import { MathOperation, VisualItemType } from '../types/math';
import { VISUAL_ITEMS } from '../utils/visualItems';
import { sound } from '../utils/sound';

interface VisualMathDisplayProps {
  operation: MathOperation;
  num1: number;
  num2: number;
  result: number;
  itemType: VisualItemType;
}

export const VisualMathDisplay: React.FC<VisualMathDisplayProps> = ({
  operation,
  num1,
  num2,
  itemType,
}) => {
  const itemInfo = VISUAL_ITEMS[itemType] || VISUAL_ITEMS.apple;
  const [tappedItems, setTappedItems] = useState<Record<string, number>>({});

  const handleItemTap = (key: string, idx: number) => {
    sound.playTapItem((idx % 8) / 8 + 0.8);
    setTappedItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const renderAddition = () => {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 my-3">
        {/* Group 1 */}
        <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-3 sm:p-4 text-center min-w-[130px] shadow-sm">
          <div className="text-xs font-black text-emerald-700 uppercase tracking-wide mb-1.5 flex items-center justify-center gap-1">
            <span>Nhóm 1</span>
            <span className="bg-emerald-200 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {num1}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
            {Array.from({ length: num1 }).map((_, i) => {
              const key = `g1_${i}`;
              const count = tappedItems[key];
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleItemTap(key, i + 1)}
                  className="relative p-1 text-2xl sm:text-3xl hover:scale-125 active:scale-95 transition-transform cursor-pointer select-none"
                  title="Bấm vào để đếm"
                >
                  {itemInfo.emoji}
                  {count && (
                    <span className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow">
                      {i + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Big Plus Operator */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white text-3xl font-black flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce-slow">
          +
        </div>

        {/* Group 2 */}
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 text-center min-w-[130px] shadow-sm">
          <div className="text-xs font-black text-amber-700 uppercase tracking-wide mb-1.5 flex items-center justify-center gap-1">
            <span>Nhóm 2</span>
            <span className="bg-amber-200 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {num2}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
            {Array.from({ length: num2 }).map((_, i) => {
              const key = `g2_${i}`;
              const count = tappedItems[key];
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleItemTap(key, num1 + i + 1)}
                  className="relative p-1 text-2xl sm:text-3xl hover:scale-125 active:scale-95 transition-transform cursor-pointer select-none"
                  title="Bấm vào để đếm"
                >
                  {itemInfo.emoji}
                  {count && (
                    <span className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow">
                      {num1 + i + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderSubtraction = () => {
    // num1 total items, num2 items removed
    return (
      <div className="flex flex-col items-center justify-center gap-3 my-3">
        <div className="bg-sky-50 border-2 border-sky-300 rounded-2xl p-4 text-center w-full max-w-md shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-sky-800 uppercase tracking-wide">
              Ban đầu có {num1} {itemInfo.nameVi}
            </span>
            <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
              Bớt đi {num2} {itemInfo.nameVi} (gạch mờ)
            </span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center py-2">
            {Array.from({ length: num1 }).map((_, i) => {
              const isSubtracted = i >= (num1 - num2);
              const key = `sub_${i}`;
              const count = tappedItems[key];
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleItemTap(key, i + 1)}
                  className={`relative p-1 text-3xl sm:text-4xl transition-all cursor-pointer select-none ${
                    isSubtracted
                      ? 'opacity-40 grayscale line-through scale-90'
                      : 'hover:scale-125'
                  }`}
                  title={isSubtracted ? 'Đã bị bớt đi' : 'Còn lại, bấm để đếm'}
                >
                  {itemInfo.emoji}
                  {isSubtracted && (
                    <span className="absolute inset-0 flex items-center justify-center text-red-500 font-black text-xl">
                      ✕
                    </span>
                  )}
                  {count && !isSubtracted && (
                    <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow">
                      {i + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderMultiplication = () => {
    // num1 groups, each with num2 items
    return (
      <div className="my-3">
        <div className="text-center text-xs font-black text-purple-700 uppercase tracking-wider mb-2">
          {num1} nhóm × {num2} {itemInfo.nameVi} mỗi nhóm
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
          {Array.from({ length: num1 }).map((_, groupIdx) => (
            <div
              key={`grp_${groupIdx}`}
              className="bg-purple-50/90 border-2 border-purple-300 rounded-2xl p-2.5 text-center shadow-sm"
            >
              <div className="text-[11px] font-bold text-purple-800 mb-1">
                Nhóm {groupIdx + 1}
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {Array.from({ length: num2 }).map((_, itemIdx) => {
                  const key = `mul_${groupIdx}_${itemIdx}`;
                  const count = tappedItems[key];
                  const absoluteIndex = groupIdx * num2 + itemIdx + 1;
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => handleItemTap(key, absoluteIndex)}
                      className="relative p-1 text-2xl hover:scale-125 transition-transform cursor-pointer select-none"
                    >
                      {itemInfo.emoji}
                      {count && (
                        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow">
                          {absoluteIndex}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDivision = () => {
    // num1 items divided into num2 parts = result per part
    const itemsPerGroup = Math.floor(num1 / num2);
    return (
      <div className="my-3">
        <div className="text-center text-xs font-black text-amber-800 uppercase tracking-wider mb-2">
          Chia đều {num1} {itemInfo.nameVi} cho {num2} bạn
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
          {Array.from({ length: num2 }).map((_, groupIdx) => (
            <div
              key={`div_grp_${groupIdx}`}
              className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-2.5 text-center shadow-sm min-w-[90px]"
            >
              <div className="text-[11px] font-bold text-amber-900 mb-1 flex items-center justify-center gap-1">
                <span>Bạn {groupIdx + 1}</span>
                <span className="text-sm">🧒</span>
              </div>
              <div className="flex flex-wrap gap-1 justify-center min-h-[36px] bg-white/80 rounded-xl p-1.5 border border-amber-200">
                {Array.from({ length: itemsPerGroup }).map((_, itemIdx) => {
                  const key = `div_${groupIdx}_${itemIdx}`;
                  return (
                    <span
                      key={key}
                      className="text-2xl animate-wiggle inline-block"
                    >
                      {itemInfo.emoji}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full select-none">
      {operation === 'addition' && renderAddition()}
      {operation === 'subtraction' && renderSubtraction()}
      {operation === 'multiplication' && renderMultiplication()}
      {operation === 'division' && renderDivision()}
      <p className="text-center text-[11px] text-slate-400 font-semibold italic mt-1">
        💡 Bé chạm vào từng hình để nghe tiếng kêu và tập đếm nhé!
      </p>
    </div>
  );
};
