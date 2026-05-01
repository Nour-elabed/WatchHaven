import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Welcome to NEXTON. How can I assist you today? Try searching "under $500" or "feminine watches".' }
  ]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Simple AI Logic
    setTimeout(() => {
      let botResponse = "I'm not sure I understand. I can help you find watches by price or gender. For example, try 'under $1000'.";
      const lower = userMsg.toLowerCase();

      if (lower.includes('under $') || lower.includes('below $')) {
        const price = lower.match(/\d+/);
        if (price) {
          botResponse = `Searching for luxury watches under $${price[0]}...`;
          setTimeout(() => {
            navigate(`/shop?maxPrice=${price[0]}`);
            setIsOpen(false);
          }, 1500);
        }
      } else if (lower.includes('feminine') || lower.includes('women')) {
        botResponse = "Showing our exquisite collection of feminine watches.";
        setTimeout(() => {
          navigate('/shop?q=feminine');
          setIsOpen(false);
        }, 1500);
      } else if (lower.includes('masculine') || lower.includes('men')) {
        botResponse = "Showing our premium masculine timepieces.";
        setTimeout(() => {
          navigate('/shop?q=masculine');
          setIsOpen(false);
        }, 1500);
      } else if (lower.includes('sport')) {
        botResponse = "Opening our high-performance Sport collection.";
        setTimeout(() => {
          navigate('/shop?category=Sport');
          setIsOpen(false);
        }, 1500);
      } else if (lower.includes('luxury')) {
        botResponse = "Opening our exclusive Luxury collection.";
        setTimeout(() => {
          navigate('/shop?category=Luxury');
          setIsOpen(false);
        }, 1500);
      } else if (lower.includes('hello') || lower.includes('hi')) {
        botResponse = "Hello! Looking for a specific watch today? You can ask for 'sport watches', 'luxury items', or 'feminine styles'.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-black p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">NEXTON Assistant</p>
                <p className="text-[10px] text-white/60 mt-1 uppercase tracking-widest font-bold">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {msg.role === 'bot' && (
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-gray-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-black text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
              <button
                onClick={handleSend}
                className="bg-black text-white p-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all"
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
