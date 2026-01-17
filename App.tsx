
import React, { useState, useMemo } from 'react';
import { Subject, Chapter } from './types';
import { REVISION_DATA } from './constants';
import ChatBot from './components/ChatBot';
import QuizView from './components/QuizView';

const App: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.PHYSICS);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);

  const chapters = useMemo(() => REVISION_DATA[selectedSubject], [selectedSubject]);

  const filteredChapters = useMemo(() => {
    return chapters.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chapters, searchQuery]);

  const currentChapter = useMemo(() => {
    if (!activeChapterId) return null;
    return chapters.find(c => c.id === activeChapterId);
  }, [chapters, activeChapterId]);

  const handleSubjectChange = (s: Subject) => {
    setSelectedSubject(s);
    setActiveChapterId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col sticky top-0 md:h-screen">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold tracking-tighter text-indigo-400">MIT PATH</h1>
          <p className="text-xs text-slate-400 font-medium">EXCELLENCE 2NDE C - OBC</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">Matières</div>
          {Object.values(Subject).map((s) => (
            <button
              key={s}
              onClick={() => handleSubjectChange(s)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                selectedSubject === s 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${selectedSubject === s ? 'bg-white' : 'bg-slate-700'}`}></div>
              {s}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button 
            onClick={() => setShowChat(!showChat)}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${
              showChat ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-indigo-400 hover:bg-slate-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Mentor Gemini
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header with Search */}
        <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Chercher un chapitre (ex: Forces, Atome...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
             <div className="text-right hidden sm:block">
               <div className="text-sm font-bold text-slate-800">Objectif MIT</div>
               <div className="text-[10px] text-slate-500 uppercase">Progression 35%</div>
             </div>
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-md">
                <img src="https://picsum.photos/100/100" className="w-full h-full rounded-full border border-white" alt="Avatar" />
             </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-4 md:p-8 flex-1 overflow-y-auto">
          {showChat ? (
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Assistant Intelligence Artificielle</h2>
                    <p className="text-slate-500 text-sm">Pose tes questions sur le programme de 2nde C au Mentor Gemma.</p>
                </div>
                <ChatBot />
            </div>
          ) : !activeChapterId ? (
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Révision de {selectedSubject}</h2>
                <p className="text-slate-500 mt-1">Sélectionne un chapitre pour commencer tes exercices de niveau Concours.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapterId(chapter.id)}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-left hover:border-indigo-400 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">{chapter.title}</h3>
                    <p className="text-xs text-slate-500">{chapter.questions.length} Concepts clés & Exercices</p>
                    <div className="mt-4 flex items-center text-xs font-bold text-indigo-600">
                      Commencer 
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
              
              {filteredChapters.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-slate-300 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Aucun chapitre trouvé</h3>
                  <p className="text-slate-500">Essaie un autre terme de recherche ou change de matière.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <button 
                onClick={() => setActiveChapterId(null)}
                className="mb-6 text-slate-500 hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour aux chapitres
              </button>
              {currentChapter && (
                <QuizView 
                  questions={currentChapter.questions} 
                  subject={selectedSubject} 
                  chapterTitle={currentChapter.title} 
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
