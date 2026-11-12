export type MathOperation = 'addition' | 'subtraction' | 'multiplication' | 'division';

export type GradeLevel = 'lop1' | 'lop2' | 'lop3';

export type VisualItemType = 
  | 'apple' 
  | 'candy' 
  | 'balloon' 
  | 'strawberry' 
  | 'duck' 
  | 'star' 
  | 'icecream' 
  | 'donut' 
  | 'carrot' 
  | 'fish';

export interface VisualItemInfo {
  type: VisualItemType;
  emoji: string;
  nameVi: string;
  colorBg: string;
}

export interface MathQuestion {
  id: string;
  operation: MathOperation;
  num1: number;
  num2: number;
  result: number;
  options: number[];
  itemType: VisualItemType;
  storyPrompt?: string;
  explanation: string;
}

export interface OperationCardConfig {
  id: MathOperation;
  title: string;
  subtitle: string;
  badge: string;
  symbol: string;
  iconName: string;
  themeColor: {
    bg: string;
    border: string;
    hoverBg: string;
    text: string;
    badgeBg: string;
    lightBg: string;
    buttonBg: string;
    shadow: string;
  };
  sampleItems: string[];
}

export interface UserProgress {
  totalStars: number;
  unlocked: boolean;
  activationCodeUsed?: string;
  activatedAt?: string;
  scores: {
    addition: number;
    subtraction: number;
    multiplication: number;
    division: number;
  };
  badges: string[];
}
