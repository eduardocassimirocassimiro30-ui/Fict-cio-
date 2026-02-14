
import React, { useState } from 'react';
import { getLoreAssistant } from '../services/geminiService';

const CJAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'cj', text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await getLoreAssistant(userMsg);
    setMessages(prev => [...prev, { role: 'cj', text: response || '' }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
      <div className="p-4 grove-bg border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
           <img src="https://picsum.photos/seed/cjface/100/100" alt="CJ" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-black text-white gta-font leading-none">Grove Assistant</h3>
          <span className="text-[10px] text-green-300 uppercase font-bold">Online na Ganton</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <p className="italic text-sm">"Grove Street. Home. At least it was before I fucked everything up."</p>
            <p className="mt-2 text-xs font-bold uppercase">Pergunte algo sobre San Andreas!</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-green-600 text-white rounded-tr-none' 
                : 'bg-zinc-800 text-gray-200 rounded-tl-none border border-white/5'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 p-3 rounded-2xl animate-pulse text-xs text-gray-400">
              CJ está pensando...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-[#1a1a1a] border-t border-white/5 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Mande o papo, mano..."
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CJAssistant;
