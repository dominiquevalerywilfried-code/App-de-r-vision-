
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { askGemma } from '../services/geminiService';

const STORAGE_KEY = 'mit_path_v1_history';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Chargement de l'historique au montage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {
        console.error("Storage load error", e);
      }
    } else {
      setMessages([{
        id: 'welcome',
        text: "Bienvenue futur bachelier. Je suis Gemma. Notre conversation est sauvegardée automatiquement pour tes révisions hors-ligne.",
        sender: 'gemma',
        timestamp: new Date()
      }]);
    }
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await askGemma(input);

    const gemmaMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'gemma',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, gemmaMsg]);
    setIsLoading(false);
  };

  const clearHistory = () => {
    if (confirm("Effacer tout l'historique ?")) {
      localStorage.removeItem(STORAGE_KEY);
      setMessages([{
        id: 'welcome',
        text: "Historique réinitialisé. Nouveau départ !",
        sender: 'gemma',
        timestamp: new Date()
      }]);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center font-bold">G</div>
          <div>
            <div className="text-sm font-bold leading-none">Mentor Gemma</div>
            <div className="text-[9px] text-green-400 uppercase tracking-tighter">Auto-Save Actif</div>
          </div>
        </div>
        <button onClick={clearHistory} className="text-slate-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
              msg.sender === 'user' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs text-indigo-500 animate-pulse font-bold">Gemma réfléchit...</div>}
      </div>

      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pose une question..."
            className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />
          <button onClick={handleSend} disabled={isLoading} className="bg-indigo-600 text-white p-2 rounded-full disabled:opacity-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
