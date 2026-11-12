import { VisualItemType, VisualItemInfo } from '../types/math';

export const VISUAL_ITEMS: Record<VisualItemType, VisualItemInfo> = {
  apple: { type: 'apple', emoji: '🍎', nameVi: 'quả táo', colorBg: 'bg-red-100 text-red-600' },
  candy: { type: 'candy', emoji: '🍬', nameVi: 'viên kẹo ngọt', colorBg: 'bg-pink-100 text-pink-600' },
  balloon: { type: 'balloon', emoji: '🎈', nameVi: 'quả bóng bay', colorBg: 'bg-sky-100 text-sky-600' },
  strawberry: { type: 'strawberry', emoji: '🍓', nameVi: 'quả dâu tây', colorBg: 'bg-rose-100 text-rose-600' },
  duck: { type: 'duck', emoji: '🐥', nameVi: 'chú vịt con', colorBg: 'bg-amber-100 text-amber-600' },
  star: { type: 'star', emoji: '⭐', nameVi: 'ngôi sao sáng', colorBg: 'bg-yellow-100 text-yellow-600' },
  icecream: { type: 'icecream', emoji: '🍦', nameVi: 'cây kem mát', colorBg: 'bg-purple-100 text-purple-600' },
  donut: { type: 'donut', emoji: '🍩', nameVi: 'bánh donut sô-cô-la', colorBg: 'bg-orange-100 text-orange-600' },
  carrot: { type: 'carrot', emoji: '🥕', nameVi: 'củ cà rốt giòn', colorBg: 'bg-amber-100 text-amber-700' },
  fish: { type: 'fish', emoji: '🐠', nameVi: 'chú cá nhỏ', colorBg: 'bg-cyan-100 text-cyan-600' },
};
