import React, { useState } from 'react';
import { X, Sparkles, Volume2, Star } from 'lucide-react';
import { sound } from '../utils/sound';

interface MultiplicationTableModalProps {
  onClose: () => void;
}

export const MultiplicationTableModal: React.FC<MultiplicationTableModalProps> = ({ onClose }) => {
  const [selectedTable, setSelectedTable] = useState<number>(2);

  const tables = [2, 3, 4, 5, 6, 7, 8, 9];

  const handleSelectTable = (num: number) => {
    sound.playClick();
    setSelectedTable(num);
  };

  const handleRowClick = (multiplier: number) => {
    sound.playTapItem(0.9 + (multiplier % 5) * 0.1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border-4 border-purple-300 relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-purple-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-xl font-black shadow-md">
              ×
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-purple-900">
                Bảng Cửu Chương Thông Minh
              </h3>
              <p className="text-xs font-semibold text-purple-600">
                Chọn bảng để xem và nhẩm nhanh nhé bé!
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

        {/* Number Selector Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 my-3 overflow-x-auto pb-1 scrollbar-none">
          {tables.map((tbl) => (
            <button
              key={tbl}
              type="button"
              onClick={() => handleSelectTable(tbl)}
              className={`btn-candy px-3.5 sm:px-4 py-2 rounded-2xl font-black text-sm sm:text-base shrink-0 transition-all cursor-pointer ${
                selectedTable === tbl
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              Bảng {tbl}
            </button>
          ))}
        </div>

        {/* Content of the chosen times table */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2">
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 mb-3 text-center">
            <span className="text-xs font-black text-purple-700 uppercase tracking-wider">
              Khám phá Bảng nhân {selectedTable}
            </span>
            <div className="text-2xl font-black text-purple-950 mt-0.5">
              {selectedTable} nhân với các số từ 1 đến 10
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Array.from({ length: 10 }).map((_, idx) => {
              const multiplier = idx + 1;
              const result = selectedTable * multiplier;
              return (
                <div
                  key={multiplier}
                  onClick={() => handleRowClick(multiplier)}
                  className="bg-white hover:bg-purple-50/80 p-3 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      {multiplier}
                    </div>
                    <span className="text-lg font-black text-slate-800 tracking-wide">
                      {selectedTable} × {multiplier} ={' '}
                      <span className="text-purple-600">{result}</span>
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-400 group-hover:text-purple-600 transition-colors">
                    💡
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-purple-100 text-center text-xs font-bold text-slate-500 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Học thuộc bảng nhân giúp bé tính nhẩm siêu tốc!</span>
        </div>
      </div>
    </div>
  );
};
