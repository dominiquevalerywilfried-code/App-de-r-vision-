
import React, { useState } from 'react';
import { Question, Subject } from '../types';

interface QuizViewProps {
  questions: Question[];
  subject: Subject;
  chapterTitle: string;
}

const QuizView: React.FC<QuizViewProps> = ({ questions, subject, chapterTitle }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
        <p className="text-slate-500">Pas encore de contenu disponible pour ce chapitre.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">{chapterTitle}</h2>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
          {subject}
        </span>
      </div>

      {questions.map((q, idx) => (
        <div key={q.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 transition-all hover:shadow-lg">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                q.type === 'QCM' ? 'bg-blue-100 text-blue-700' : 
                q.type === 'PROBLEM' ? 'bg-orange-100 text-orange-700' : 
                'bg-green-100 text-green-700'
              }`}>
                {q.type}
              </span>
              <span className="text-slate-400 text-xs font-medium">Question {idx + 1}</span>
            </div>
            
            <p className="text-slate-800 font-medium text-lg leading-relaxed">
              {q.text}
            </p>

            {q.type === 'QCM' && q.options && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    disabled={revealed[q.id]}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      revealed[q.id] 
                        ? (oIdx === q.correctAnswer ? 'bg-green-50 border-green-500 text-green-800' : 'bg-slate-50 border-slate-200 opacity-50')
                        : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
                    }`}
                    onClick={() => toggleReveal(q.id)}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-center text-xs leading-6 mr-2">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 border-t border-slate-100 pt-4 flex flex-col items-center">
              {!revealed[q.id] ? (
                <button 
                  onClick={() => toggleReveal(q.id)}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Révéler la solution
                </button>
              ) : (
                <div className="w-full bg-indigo-50 border border-indigo-100 p-4 rounded-lg animate-fadeIn">
                  <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Points Clés & Solution
                  </h4>
                  <p className="text-indigo-800 text-sm whitespace-pre-wrap">{q.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizView;
