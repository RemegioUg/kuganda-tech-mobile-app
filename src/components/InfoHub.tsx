import React, { useState } from 'react';
import { Search, Compass, BookOpen, AlertTriangle, CloudSun, Leaf, Send, Sparkles, MessageSquare } from 'lucide-react';
import { FarmingTip } from '../types';

interface InfoHubProps {
  tips: FarmingTip[];
  isOnline: boolean;
}

export default function InfoHub({ tips, isOnline }: InfoHubProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTipId, setActiveTipId] = useState<string | null>(null);

  // Chat advisory AI states
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'farmer' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Habari! I am your local agronomist advisor. You are currently offline, but my cached advice models are active! Ask me anything about planting Maize, CAN top-dressing, or armyworm protection.",
      time: 'Just now',
    },
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isBotLoading, setIsBotLoading] = useState<boolean>(false);

  // Heuristic offline AI agronomist responses
  const getOfflineResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('maize') || q.includes('seed')) {
      return "For East African soils, plant Hybrid Maize seeds 5cm deep with 25cm spacing between seeds and 75cm between rows. Hand-weed twice before canopy closure.";
    }
    if (q.includes('fertilizer') || q.includes('can') || q.includes('nitrogen') || q.includes('urea')) {
      return "Apply Calcium Ammonium Nitrate (CAN) exactly when maize is knee-high (week 5 or 6). Use 1 tablespoon per crop, placed 15cm from the stem in moist condition.";
    }
    if (q.includes('worm') || q.includes('army') || q.includes('pest') || q.includes('insect')) {
      return "Always check seedling whorls. If you find small pinholes, spray organic neem oil soap water at sunset, or apply clean fine sand/wood ash into the crop whorls to suppress caterpillar growth.";
    }
    if (q.includes('weather') || q.includes('rain') || q.includes('climate')) {
      return "Our localized satellite index indicates standard short rains starting this October. Ensure seeds are sowed dry 7 days before expected rains to prevent waterlogging.";
    }
    return "Mkulima, that is a great question. For high yield harvesting, maintain organic mulch around crop roots, rotate crops with beans or cowpeas, and compost compostable residue during dry transitions.";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = userInput;
    setChatMessages((prev) => [...prev, { sender: 'farmer', text: userMsg, time: 'Now' }]);
    setUserInput('');
    setIsBotLoading(true);

    setTimeout(() => {
      const responseText = getOfflineResponse(userMsg);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: responseText, time: 'Now' },
      ]);
      setIsBotLoading(false);
    }, 1200);
  };

  const categories = ['All', 'Maize Expert', 'Soil Health', 'Pest Control'];

  const filteredTips = tips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Weather Bar */}
      <div className="bg-[#1E5E3A] text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
        {/* Sky circles */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/20 rounded-full filter blur-lg" />
        <div className="flex justify-between items-center relative z-10 mb-4">
          <div className="flex items-center gap-2">
            <CloudSun size={24} className="text-amber-300" />
            <div>
              <span className="text-xs text-forest-light/90 block font-bold">Kampala Regional Weather Index</span>
              <span className="text-sm font-bold block">Scattered Showers • Temp 27°C</span>
            </div>
          </div>
          <span className="bg-white/15 px-2 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
            Guaranteed Offline Cached
          </span>
        </div>

        {/* Custom Input */}
        <div className="relative z-10 w-full bg-white text-on-surface rounded-xl flex items-center px-3 border border-outline-variant shadow-inner">
          <Search size={18} className="text-on-surface-variant flex-shrink-0" />
          <input
            type="text"
            placeholder="Search crop manuals, planting dates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs font-semibold px-2 py-3 outline-none"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-[10px] text-on-surface-variant font-bold">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 bg-surface-container-low p-1 rounded-xl border border-outline-variant overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap scroll-mx-4 ${
              selectedCategory === cat
                ? 'bg-forest text-white'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* VIEW: Tips List and Expansion */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
          <Compass size={14} className="text-[#1E5E3A]" /> Planting Advisories
        </h3>

        {filteredTips.length === 0 ? (
          <div className="text-center py-8 text-xs text-on-surface-variant bg-white rounded-2xl border border-outline-variant">
            No cached agricultural manuals match your keywords.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTips.map((tip) => {
              const isActive = activeTipId === tip.id;
              return (
                <div
                  key={tip.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isActive ? 'border-forest ring-1 ring-forest' : 'border-outline-variant/60 hover:border-forest'
                  }`}
                >
                  <button
                    onClick={() => setActiveTipId(isActive ? null : tip.id)}
                    className="w-full p-4 flex gap-3 text-left items-start cursor-pointer"
                  >
                    <img
                      src={tip.imageUrl}
                      alt={tip.title}
                      className="w-16 h-16 rounded-xl object-cover bg-surface-container-high border border-outline-variant flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-grow">
                      <span className="bg-forest-light text-forest font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {tip.category}
                      </span>
                      <h4 className="font-headline-sm text-sm text-on-surface font-bold mt-1">
                        {tip.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                        {tip.summary}
                      </p>
                    </div>
                  </button>

                  {isActive && (
                    <div className="px-4 pb-4 pt-2 border-t border-outline-variant bg-forest-light/5 text-xs text-on-surface space-y-3 leading-relaxed">
                      <p className="font-medium text-on-surface-variant">
                        {tip.content}
                      </p>
                      <div className="p-3 bg-white rounded-xl border border-outline-variant space-y-1">
                        <span className="text-[10px] font-bold text-[#1E5E3A] block uppercase tracking-wide">
                          Agricultural Schedule Hint
                        </span>
                        <span className="block font-semibold text-on-surface">
                          Optimal Period: {tip.seasonMonth}
                        </span>
                        <span className="block text-on-surface-variant italic">
                          Weather Assist: {tip.weatherHint}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION: Offline LLaMA Agbot Advisor */}
      <div className="bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
        <div className="bg-[#1E5E3A] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-300 animate-pulse" />
            <div>
              <h3 className="font-headline-sm text-sm font-bold">Kuganda Copilot</h3>
              <span className="text-[10px] text-green-200 block">Offline Neural LLM Helper Engine Active</span>
            </div>
          </div>
          <span className="text-[10px] bg-white/10 px-2 py-1 rounded font-bold">
            {isOnline ? 'Cloud Cloud' : 'Direct Edge'}
          </span>
        </div>

        {/* Chat window */}
        <div className="p-4 space-y-3 max-h-[220px] overflow-y-auto bg-surface-container-low border-b border-outline-variant flex flex-col no-scrollbar">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                msg.sender === 'ai'
                  ? 'bg-white text-on-surface self-start rounded-tl-none border border-outline-variant/60 shadow-xs'
                  : 'bg-forest text-white self-end rounded-tr-none'
              }`}
            >
              <p className="font-medium">{msg.text}</p>
            </div>
          ))}

          {isBotLoading && (
            <div className="bg-white text-on-surface self-start rounded-2xl rounded-tl-none border border-outline-variant/60 p-3 flex gap-2 items-center text-xs text-on-surface-variant">
              <Sparkles size={12} className="animate-spin text-forest" />
              <span>AI agronomist is reading cached manuals...</span>
            </div>
          )}
        </div>

        {/* Message Input bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder={isBotLoading ? "AI is processing..." : "Ask: 'How to grow maize?'..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isBotLoading}
            className="w-full text-xs font-semibold px-3 py-2.5 bg-surface-container-low rounded-xl outline-none focus:bg-white border border-outline-variant/40"
          />
          <button
            type="submit"
            disabled={isBotLoading || !userInput.trim()}
            className="p-2.5 rounded-xl bg-[#1E5E3A] text-white hover:bg-[#123e25] disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer active:scale-95 transition-transform"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
