
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_NEWS, RADIO_STATIONS, COLORS } from './constants';
import { NewsItem } from './types';
import NewsCard from './components/NewsCard';
import CJAssistant from './components/CJAssistant';
import { fetchLatestGTANews } from './services/geminiService';

const App: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [aiNews, setAiNews] = useState<{text: string, sources: any[]}>({ text: '', sources: [] });
  const [loadingAi, setLoadingAi] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'lore' | 'stats'>('home');

  const statsData = [
    { name: 'Respeito', value: 85 },
    { name: 'Fôlego', value: 60 },
    { name: 'Músculo', value: 75 },
    { name: 'Gordura', value: 20 },
    { name: 'Sex Appeal', value: 90 },
  ];

  useEffect(() => {
    const loadAiNews = async () => {
      setLoadingAi(true);
      const data = await fetchLatestGTANews();
      setAiNews(data);
      setLoadingAi(false);
    };
    loadAiNews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Alert Banner for Updates/Bugs */}
      <div className="bg-yellow-500 text-black px-4 py-1 text-center text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
        <span className="animate-pulse">⚠️</span> 
        O Sistema está em atualização - Notificaremos qualquer bug detectado 
        <span className="animate-pulse">⚠️</span>
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 grove-bg rounded-lg flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-green-500/20">
              SAN
            </div>
            <div>
              <h1 className="text-xl font-black gta-font tracking-tighter">San Andreas Network</h1>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-[0.2em]">Live from Grove Street</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setActiveTab('home')}
              className={`text-sm font-bold uppercase transition-colors ${activeTab === 'home' ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
            >
              Feed de Notícias
            </button>
            <button 
              onClick={() => setActiveTab('lore')}
              className={`text-sm font-bold uppercase transition-colors ${activeTab === 'lore' ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
            >
              IA CJ Assistant
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`text-sm font-bold uppercase transition-colors ${activeTab === 'stats' ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
            >
              Stats do Grove
            </button>
          </nav>

          <div className="flex items-center gap-3">
             <div className="hidden sm:block text-right">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Respeito +++</p>
                <div className="h-1 w-24 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                   <div className="h-full bg-green-500 w-[85%]"></div>
                </div>
             </div>
             <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase transition-all">
                Login
             </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Traditional News */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                   <h2 className="text-2xl font-black uppercase tracking-tight">Manchetes da Semana</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_NEWS.map(news => (
                    <NewsCard key={news.id} news={news} onClick={setSelectedNews} />
                  ))}
                </div>
              </section>

              {/* Gemini AI Powered Section */}
              <section className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                   <svg width="200" height="200" viewBox="0 0 24 24" fill="white"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                </div>
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-white font-bold">IA</div>
                   <div>
                     <h2 className="text-xl font-black uppercase">Weasel News AI</h2>
                     <p className="text-xs text-gray-400 uppercase font-bold">Sumário automático da comunidade</p>
                   </div>
                </div>

                {loadingAi ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                    <div className="h-4 bg-zinc-800 rounded w-full"></div>
                    <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed">
                    <p className="whitespace-pre-line">{aiNews.text}</p>
                    
                    {aiNews.sources && aiNews.sources.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-white/5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Fontes de Grounding:</p>
                        <div className="flex flex-wrap gap-2">
                          {aiNews.sources.map((chunk: any, idx) => (
                             chunk.web && (
                               <a 
                                 key={idx} 
                                 href={chunk.web.uri} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="text-[10px] bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-full text-green-400 transition-colors border border-white/5"
                               >
                                 {chunk.web.title || 'Link Externo'}
                               </a>
                             )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>

            {/* Right Column: Radio & Side Info */}
            <div className="space-y-8">
              <section className="bg-[#121212] rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-black uppercase text-gray-400 mb-4 tracking-widest">Sintonize sua Rádio</h3>
                <div className="space-y-3">
                  {RADIO_STATIONS.map((radio, idx) => (
                    <div key={idx} className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-green-500/30 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: radio.color }}>
                          {radio.name[0]}
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase leading-none">{radio.name}</p>
                          <p className="text-[10px] text-gray-500 font-bold">{radio.genre}</p>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-gradient-to-br from-[#1a4d1a] to-black rounded-2xl p-8 border border-white/10 text-center">
                 <h3 className="text-2xl font-black gta-font mb-2">Seja Membro do Grove</h3>
                 <p className="text-xs text-gray-300 mb-6">Acesse mods exclusivos, fóruns secretos e chats de IA personalizados.</p>
                 <button className="w-full bg-white text-black py-3 rounded-xl font-black uppercase tracking-tighter hover:bg-green-500 hover:text-white transition-all">
                    Entrar para a Família
                 </button>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'lore' && (
          <div className="max-w-2xl mx-auto py-4">
             <div className="mb-8 text-center">
               <h2 className="text-3xl font-black uppercase mb-2">Troque ideia com o CJ</h2>
               <p className="text-gray-400">O mano CJ tá ligado em tudo que rola em San Andreas. Tira suas dúvidas sobre missões, lore ou o que tá rolando na quebrada.</p>
             </div>
             <CJAssistant />
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-12">
             <div className="text-center">
               <h2 className="text-3xl font-black uppercase mb-2">Métricas de Performance da Grove Street</h2>
               <p className="text-gray-400">Dados reais sobre a saúde da nossa comunidade e progresso global.</p>
             </div>

             <div className="bg-[#121212] p-8 rounded-3xl border border-white/5 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                      itemStyle={{ color: '#2d8a2d', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="value" fill="#2d8a2d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Membros Ativos", value: "1.2M", change: "+12%" },
                  { label: "Mods Lançados", value: "450k", change: "+5%" },
                  { label: "Speedruns Verificadas", value: "12,402", change: "+22%" }
                ].map((stat, i) => (
                  <div key={i} className="bg-zinc-900 p-6 rounded-2xl border border-white/5 text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">{stat.label}</p>
                    <p className="text-3xl font-black mb-2">{stat.value}</p>
                    <p className="text-xs text-green-500 font-bold">{stat.change} este mês</p>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 grove-bg rounded flex items-center justify-center font-black text-white">SAN</div>
              <p className="text-xs text-gray-500">© 2024 San Andreas Network. Uma produção Weasel News & Grove Street Families.</p>
           </div>
           <div className="flex gap-6">
              {['Facebook', 'Twitter', 'LifeInvader', 'Bleeter'].map(social => (
                <a key={social} href="#" className="text-xs font-bold uppercase text-gray-500 hover:text-green-500 transition-colors">{social}</a>
              ))}
           </div>
        </div>
      </footer>

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
            <div className="relative h-64">
              <img src={selectedNews.imageUrl} alt={selectedNews.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className={`text-xs font-bold uppercase ${selectedNews.category === 'POLITICS' ? 'text-red-500' : 'text-green-500'}`}>
                  {selectedNews.category}
                </span>
                <span className="text-xs text-gray-500 uppercase">{selectedNews.date}</span>
              </div>
              <h2 className="text-3xl font-black mb-4 leading-tight">{selectedNews.title}</h2>
              <div className="prose prose-invert max-w-none text-gray-300">
                <p className="leading-relaxed">{selectedNews.content}</p>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full grove-bg flex items-center justify-center text-white font-bold">
                    {selectedNews.author[0]}
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Publicado por</p>
                    <p className="text-sm font-black uppercase text-green-500">{selectedNews.author}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
