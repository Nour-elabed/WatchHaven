import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Suggestion {
  label: string;
  icon: string;
  action: string;
}

const SUGGESTIONS: Suggestion[] = [
  { label: 'Men Watches', icon: '👔', action: 'men' },
  { label: 'Women Watches', icon: '👗', action: 'women' },
  { label: 'Unisex Watches', icon: '⌚', action: 'unisex' },
  { label: 'Under $500', icon: '💰', action: 'low-budget' },
  { label: 'Premium $1000+', icon: '💎', action: 'high-budget' },
  { label: 'Sport Collection', icon: '🏃', action: 'sport' },
  { label: 'Luxury Collection', icon: '👑', action: 'luxury' },
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Welcome to WatchHaven! What are you looking for today?' }
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showSuggestions]);

  const navigateAndClose = (path: string, delay = 1200) => {
    setTimeout(() => {
      navigate(path);
      setIsOpen(false);
    }, delay);
  };

  const processMessage = (userMsg: string) => {
    const lower = userMsg.toLowerCase();
    let botResponse = "I can help you find the perfect watch! Try asking about price ranges, gender, or styles.";
    let navPath = '';

    if (lower.includes('under $') || lower.includes('below $') || lower.includes('budget')) {
      const price = lower.match(/\d+/);
      if (price) {
        botResponse = `Great choice! Showing watches under $${price[0]}...`;
        navPath = `/shop?maxPrice=${price[0]}`;
      } else {
        botResponse = 'Showing our best affordable options under $500...';
        navPath = '/shop?maxPrice=500';
      }
    } else if (lower.includes('women') || lower.includes('feminine') || lower.includes('lady') || lower.includes('her')) {
      botResponse = "Opening our elegant women's collection ✨";
      navPath = '/shop?gender=WOMEN';
    } else if (lower.includes('men') || lower.includes('masculine') || lower.includes('him')) {
      botResponse = "Showing our refined men's timepieces 🎩";
      navPath = '/shop?gender=MEN';
    } else if (lower.includes('unisex') || lower.includes('everyone') || lower.includes('all')) {
      botResponse = 'Here are our versatile unisex designs ⌚';
      navPath = '/shop?gender=UNISEX';
    } else if (lower.includes('sport')) {
      botResponse = 'Opening our Sport collection 🏃';
      navPath = '/shop?category=Sport';
    } else if (lower.includes('luxury') || lower.includes('premium') || lower.includes('expensive')) {
      botResponse = 'Showing our exclusive Luxury collection 👑';
      navPath = '/shop?category=Luxury';
    } else if (lower.includes('classic')) {
      botResponse = 'Opening our timeless Classic collection 🕰️';
      navPath = '/shop?category=Classic';
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      botResponse = "Hello! I'm here to help you find your perfect timepiece. Pick a suggestion below or ask me anything!";
    } else if (lower.includes('sell') || lower.includes('list')) {
      botResponse = 'You can sell your watches through your profile! Go to Profile → Seller Dashboard.';
      navPath = '/profile';
    } else if (lower.includes('order') || lower.includes('track')) {
      botResponse = "Let me take you to your orders page!";
      navPath = '/orders';
    }

    return { botResponse, navPath };
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    let userText = suggestion.label;
    let botResponse = '';
    let navPath = '';

    switch (suggestion.action) {
      case 'men':
        botResponse = "Showing our refined men's timepieces 🎩";
        navPath = '/shop?gender=MEN';
        break;
      case 'women':
        botResponse = "Opening our elegant women's collection ✨";
        navPath = '/shop?gender=WOMEN';
        break;
      case 'unisex':
        botResponse = 'Here are our versatile unisex designs ⌚';
        navPath = '/shop?gender=UNISEX';
        break;
      case 'low-budget':
        botResponse = 'Great picks under $500 coming right up! 💰';
        navPath = '/shop?maxPrice=500';
        break;
      case 'high-budget':
        botResponse = 'Our premium collection over $1000 — only the finest 💎';
        navPath = '/shop?minPrice=1000';
        break;
      case 'sport':
        botResponse = 'Opening our Sport collection 🏃';
        navPath = '/shop?category=Sport';
        break;
      case 'luxury':
        botResponse = 'Showing our exclusive Luxury collection 👑';
        navPath = '/shop?category=Luxury';
        break;
    }

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setShowSuggestions(false);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      if (navPath) navigateAndClose(navPath);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setShowSuggestions(false);

    setTimeout(() => {
      const { botResponse, navPath } = processMessage(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      if (navPath) {
        navigateAndClose(navPath);
      } else {
        setTimeout(() => setShowSuggestions(true), 500);
      }
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-black dark:bg-gray-800 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">WatchHaven Assistant</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 dark:bg-gray-950/50 min-h-0" style={{ maxHeight: 'calc(85vh - 140px)' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {msg.role === 'bot' && (
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-gray-600 dark:text-gray-300" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-black dark:bg-white text-white dark:text-black rounded-br-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm border border-gray-100 dark:border-gray-700 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Smart Suggestions */}
            {showSuggestions && (
              <div className="pt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 ml-8">Quick actions</p>
                <div className="flex flex-wrap gap-1.5 ml-8">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.action}
                      onClick={() => handleSuggestionClick(s)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-sm"
                    >
                      <span>{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about watches..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition-all text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                className="bg-black dark:bg-white text-white dark:text-black p-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
