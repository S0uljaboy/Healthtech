import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
  label: string;
  value: string;
  score: number;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  index: number;
  total: number;
  onSelect: (value: string, score: number) => void;
  isActive: boolean;
}

export function QuestionCard({ question, options, index, total, onSelect, isActive }: QuestionCardProps) {
  // Keyboard navigation logic
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num > 0 && num <= options.length) {
        const option = options[num - 1];
        onSelect(option.value, option.score);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, options, onSelect]);

  if (!isActive) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-2xl mx-auto flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <span className="text-indigo-500 font-semibold tracking-wide flex items-center gap-2">
            Pergunta {index + 1} de {total}
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight">
            {question}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {options.map((option, i) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value, option.score)}
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-md border border-zinc-700 bg-zinc-800 flex items-center justify-center text-sm text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white transition-colors shadow-sm">
                  {i + 1}
                </div>
                <span className="text-lg text-zinc-300 group-hover:text-white font-medium">
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>
        
        <p className="text-zinc-500 text-sm mt-4 text-center">
          Você pode usar os números <kbd className="px-2 py-1 bg-zinc-800 rounded mx-1">1</kbd> a <kbd className="px-2 py-1 bg-zinc-800 rounded mx-1">{options.length}</kbd> no teclado.
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
