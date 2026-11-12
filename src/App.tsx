/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MathOperation, GradeLevel, MathQuestion } from './types/math';
import { generateQuizSet } from './utils/mathGenerator';
import { sound } from './utils/sound';
import { LockScreen } from './components/LockScreen';
import { HomeScreen } from './components/HomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultModal } from './components/ResultModal';
import { MultiplicationTableModal } from './components/MultiplicationTableModal';
import { BadgeModal } from './components/BadgeModal';
import { LicenseInfoModal } from './components/LicenseInfoModal';

export default function App() {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('math_kids_activated') === 'true';
  });

  const [activationCodeUsed, setActivationCodeUsed] = useState<string>(() => {
    return localStorage.getItem('math_kids_code') || '';
  });

  const [totalStars, setTotalStars] = useState<number>(() => {
    const saved = localStorage.getItem('math_kids_total_stars');
    return saved ? parseInt(saved, 10) : 15; // friendly start with 15 stars
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.enabled);

  const [currentView, setCurrentView] = useState<'lock' | 'home' | 'quiz'>(() => {
    const isAct = localStorage.getItem('math_kids_activated') === 'true';
    return isAct ? 'home' : 'lock';
  });

  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('lop1');
  const [currentOperation, setCurrentOperation] = useState<MathOperation>('addition');
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  // Modals
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [lastQuizScore, setLastQuizScore] = useState<{ score: number; starsEarned: number }>({
    score: 0,
    starsEarned: 0,
  });
  const [showMultiplicationModal, setShowMultiplicationModal] = useState<boolean>(false);
  const [showBadgeModal, setShowBadgeModal] = useState<boolean>(false);
  const [showLicenseModal, setShowLicenseModal] = useState<boolean>(false);

  // Sync stars to localStorage
  useEffect(() => {
    localStorage.setItem('math_kids_total_stars', String(totalStars));
  }, [totalStars]);

  const handleUnlock = (code = 'CONFIRMED_VIP') => {
    setUnlocked(true);
    setActivationCodeUsed(code);
    setIsDemoMode(false);
    localStorage.setItem('math_kids_activated', 'true');
    localStorage.setItem('math_kids_code', code);
    setCurrentView('home');
  };

  const handleTryDemo = () => {
    setIsDemoMode(true);
    setCurrentOperation('addition');
    const demoQuestions = generateQuizSet('addition', selectedGrade, 3);
    setQuestions(demoQuestions);
    setCurrentView('quiz');
  };

  const handleSelectOperation = (op: MathOperation) => {
    setCurrentOperation(op);
    const newQuestions = generateQuizSet(op, selectedGrade, 10);
    setQuestions(newQuestions);
    setIsDemoMode(false);
    setCurrentView('quiz');
  };

  const handleFinishQuiz = (score: number, starsEarned: number) => {
    setLastQuizScore({ score, starsEarned });
    setTotalStars((prev) => prev + starsEarned);
    setShowResultModal(true);
  };

  const handlePlayAgain = () => {
    setShowResultModal(false);
    const newQuestions = generateQuizSet(currentOperation, selectedGrade, isDemoMode ? 3 : 10);
    setQuestions(newQuestions);
  };

  const handleGoHome = () => {
    setShowResultModal(false);
    setCurrentView('home');
  };

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans">
      {/* 1. Màn hình Khóa / Xác nhận Kích Hoạt */}
      {currentView === 'lock' && (
        <LockScreen
          onUnlock={handleUnlock}
          onTryDemo={handleTryDemo}
        />
      )}

      {/* 2. Màn hình Chính (Giao diện chọn 4 dạng toán dạng khung thẻ bo tròn) */}
      {currentView === 'home' && (
        <HomeScreen
          onSelectOperation={handleSelectOperation}
          selectedGrade={selectedGrade}
          onChangeGrade={(grade) => setSelectedGrade(grade)}
          totalStars={totalStars}
          unlocked={unlocked}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenMultiplicationTable={() => setShowMultiplicationModal(true)}
          onOpenBadges={() => setShowBadgeModal(true)}
          onOpenLicenseInfo={() => setShowLicenseModal(true)}
        />
      )}

      {/* 3. Màn hình Làm bài Trắc nghiệm Trực quan */}
      {currentView === 'quiz' && (
        <QuizScreen
          operation={currentOperation}
          grade={selectedGrade}
          questions={questions}
          onBackToHome={() => setCurrentView(unlocked ? 'home' : 'lock')}
          onFinishQuiz={handleFinishQuiz}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          isDemo={isDemoMode}
          onRequireActivation={() => {
            setCurrentView('lock');
          }}
        />
      )}

      {/* Result Modal after completing a round */}
      {showResultModal && (
        <ResultModal
          score={lastQuizScore.score}
          totalQuestions={questions.length}
          starsEarned={lastQuizScore.starsEarned}
          onPlayAgain={handlePlayAgain}
          onGoHome={handleGoHome}
          onOpenMultiplicationTable={() => {
            setShowResultModal(false);
            setShowMultiplicationModal(true);
          }}
        />
      )}

      {/* Visual Multiplication Table Modal */}
      {showMultiplicationModal && (
        <MultiplicationTableModal
          onClose={() => setShowMultiplicationModal(false)}
        />
      )}

      {/* Badges and Stars Collection Modal */}
      {showBadgeModal && (
        <BadgeModal
          totalStars={totalStars}
          unlocked={unlocked}
          onClose={() => setShowBadgeModal(false)}
        />
      )}

      {/* License & Payment Info Modal */}
      {showLicenseModal && (
        <LicenseInfoModal
          unlocked={unlocked}
          activationCodeUsed={activationCodeUsed}
          onClose={() => setShowLicenseModal(false)}
          onReActivate={() => {
            setShowLicenseModal(false);
            setCurrentView('lock');
          }}
        />
      )}
    </div>
  );
}
