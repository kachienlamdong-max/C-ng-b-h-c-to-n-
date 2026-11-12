import { VisualItemType, MathOperation, GradeLevel, MathQuestion } from '../types/math';
import { VISUAL_ITEMS } from './visualItems';

const ITEM_KEYS: VisualItemType[] = [
  'apple', 'candy', 'balloon', 'strawberry', 'duck', 'star', 'icecream', 'donut', 'carrot', 'fish'
];

function getRandomItem(): VisualItemType {
  return ITEM_KEYS[Math.floor(Math.random() * ITEM_KEYS.length)];
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateQuestion(
  operation: MathOperation,
  grade: GradeLevel,
  idSuffix: number | string
): MathQuestion {
  const itemType = getRandomItem();
  const itemInfo = VISUAL_ITEMS[itemType];
  let num1 = 1;
  let num2 = 1;
  let result = 0;
  let storyPrompt = '';
  let explanation = '';

  switch (operation) {
    case 'addition': {
      if (grade === 'lop1') {
        num1 = Math.floor(Math.random() * 6) + 1; // 1..6
        num2 = Math.floor(Math.random() * (10 - num1)) + 1; // sum <= 10
      } else if (grade === 'lop2') {
        num1 = Math.floor(Math.random() * 12) + 2; // 2..13
        num2 = Math.floor(Math.random() * 10) + 1; // 1..10
      } else {
        // lop3
        num1 = Math.floor(Math.random() * 25) + 5;
        num2 = Math.floor(Math.random() * 20) + 5;
      }
      result = num1 + num2;
      storyPrompt = `Bé có ${num1} ${itemInfo.nameVi}, bạn tặng thêm ${num2} ${itemInfo.nameVi}. Hỏi bé có tất cả bao nhiêu?`;
      explanation = `${num1} cộng với ${num2} bằng ${result}. Bé cùng đếm tổng tất cả nhé!`;
      break;
    }

    case 'subtraction': {
      if (grade === 'lop1') {
        num1 = Math.floor(Math.random() * 7) + 3; // 3..9
        num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // 1..(num1-1)
      } else if (grade === 'lop2') {
        num1 = Math.floor(Math.random() * 15) + 6; // 6..20
        num2 = Math.floor(Math.random() * (num1 - 2)) + 1;
      } else {
        // lop3
        num1 = Math.floor(Math.random() * 30) + 10;
        num2 = Math.floor(Math.random() * (num1 - 5)) + 3;
      }
      result = num1 - num2;
      storyPrompt = `Có ${num1} ${itemInfo.nameVi}, bớt đi ${num2} ${itemInfo.nameVi}. Còn lại bao nhiêu ${itemInfo.nameVi}?`;
      explanation = `${num1} trừ đi ${num2} còn lại ${result}. Rất chính xác!`;
      break;
    }

    case 'multiplication': {
      if (grade === 'lop1' || grade === 'lop2') {
        // Simple multiplication: 2, 3, 4, 5
        const multipliers = [2, 3, 4, 5];
        num1 = multipliers[Math.floor(Math.random() * multipliers.length)];
        num2 = Math.floor(Math.random() * 5) + 1; // 1..5
      } else {
        // lop3: full times table 2..9
        num1 = Math.floor(Math.random() * 8) + 2; // 2..9
        num2 = Math.floor(Math.random() * 9) + 1; // 1..9
      }
      result = num1 * num2;
      storyPrompt = `Có ${num1} nhóm, mỗi nhóm có ${num2} ${itemInfo.nameVi}. Hỏi có tất cả bao nhiêu?`;
      explanation = `${num1} nhân với ${num2} bằng ${result}. Bé nhớ bảng cửu chương rất cừ!`;
      break;
    }

    case 'division': {
      if (grade === 'lop1' || grade === 'lop2') {
        num2 = Math.floor(Math.random() * 4) + 2; // divisor: 2, 3, 4, 5
        result = Math.floor(Math.random() * 5) + 1; // quotient: 1..5
      } else {
        num2 = Math.floor(Math.random() * 7) + 2; // 2..8
        result = Math.floor(Math.random() * 8) + 2; // 2..9
      }
      num1 = num2 * result; // always divides evenly
      storyPrompt = `Chia đều ${num1} ${itemInfo.nameVi} cho ${num2} bạn nhỏ. Mỗi bạn được bao nhiêu?`;
      explanation = `${num1} chia cho ${num2} bằng ${result}. Mỗi bạn được ${result} phần đều nhau!`;
      break;
    }
  }

  // Generate 4 distinct options including the correct answer
  const optionsSet = new Set<number>();
  optionsSet.add(result);

  // Reasonable distractors near the result
  const candidates = [
    result + 1,
    result - 1,
    result + 2,
    result - 2,
    result + (num2 > 0 ? num2 : 3),
    Math.max(1, result - (num2 > 0 ? num2 : 3)),
    result + 5,
    result - 5
  ];

  for (const cand of candidates) {
    if (cand >= 0 && cand !== result) {
      optionsSet.add(cand);
    }
    if (optionsSet.size >= 4) break;
  }

  // Fallback if needed
  let offset = 3;
  while (optionsSet.size < 4) {
    const fallback = result + offset;
    if (fallback >= 0 && fallback !== result) {
      optionsSet.add(fallback);
    }
    offset++;
  }

  const options = shuffle(Array.from(optionsSet).slice(0, 4));

  return {
    id: `q_${operation}_${idSuffix}_${Date.now()}`,
    operation,
    num1,
    num2,
    result,
    options,
    itemType,
    storyPrompt,
    explanation,
  };
}

export function generateQuizSet(
  operation: MathOperation,
  grade: GradeLevel,
  count = 10
): MathQuestion[] {
  const list: MathQuestion[] = [];
  for (let i = 0; i < count; i++) {
    list.push(generateQuestion(operation, grade, i + 1));
  }
  return list;
}
