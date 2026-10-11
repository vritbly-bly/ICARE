import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Phone, 
  Check, 
  ChevronRight, 
  Bot, 
  User, 
  HelpCircle,
  ExternalLink,
  Laptop,
  Camera,
  MapPin,
  Clock
} from 'lucide-react';
import { ChatMessage } from '../types';
import { STORE_INFO } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface CustomerSupportChatProps {
  initialTopic?: string;
  onNavigateToSection?: (sectionId: string) => void;
}

export const CustomerSupportChat: React.FC<CustomerSupportChatProps> = ({
  initialTopic,
  onNavigateToSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: `Hello! Welcome to iCare Computers, Ballari. We are a physical offline store & chip-level engineering center. We do in-store sales & service for all major brands (no online store cart). How can proprietor Naga Reddy and our team assist you today?`,
      timestamp: 'Just now',
      options: [
        { label: '🏬 Offline Store Sales (All Brands)', action: 'view_store' },
        { label: '💻 Chip-Level Motherboard Diagnostics', action: 'repair_quote' },
        { label: '📹 CCTV Security & Surveillance Setup', action: 'cctv_survey' },
        { label: '📍 Store Location & Working Hours', action: 'location_info' },
        { label: '💬 Talk to Naga Reddy on WhatsApp', action: 'whatsapp_direct' },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages]);

  // Handle external topic triggers
  useEffect(() => {
    if (initialTopic) {
      setIsOpen(true);
      handleUserInput(`I would like to inquire regarding: ${initialTopic}`);
    }
  }, [initialTopic]);

  const handleUserInput = (query: string) => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Generate intelligent contextual response
    setTimeout(() => {
      const botResponse = generateBotResponse(query);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleOptionClick = (option: { label: string; action: string }) => {
    if (option.action === 'whatsapp_direct') {
      executeAction('whatsapp_direct');
      return;
    }
    if (option.action === 'call_phone') {
      executeAction('call_phone');
      return;
    }
    if (option.action === 'location_info') {
      executeAction('location_info');
      return;
    }
    if (option.action === 'view_store') {
      executeAction('view_store');
      return;
    }
    if (option.action === 'view_portfolio') {
      executeAction('view_portfolio');
      return;
    }
    handleUserInput(option.label);
  };

  const generateBotResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase();

    if (q.includes('store') || q.includes('sale') || q.includes('buy') || q.includes('shop') || q.includes('cart') || q.includes('online') || q.includes('laptop') || q.includes('printer') || q.includes('price')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `🏬 We do Offline Store Sales & Service for ALL BRANDS at our physical showroom in Ballari!
• Important: We are an offline store — NOT an online shop (no online checkout or cart).
• In-store sales for all brands: Laptops (HP, Dell, Lenovo, ASUS, Apple), Desktops, Printers (Canon, Epson, HP), CCTV Systems (CP PLUS, Hikvision), and Accessories.
• 100% genuine products with manufacturer tax invoice & official warranty.
• Walk into our shop beside UCO Bank or contact Naga Reddy directly for offline pricing & availability!`,
        timestamp: 'Just now',
        options: [
          { label: '🏬 View In-Store Hardware Showcase', action: 'view_store' },
          { label: '💬 Check In-Store Price on WhatsApp', action: 'whatsapp_direct' },
          { label: '📞 Call Naga Reddy (+91 8217676626)', action: 'call_phone' },
        ],
      };
    }

    if (q.includes('repair') || q.includes('screen') || q.includes('display') || q.includes('motherboard') || q.includes('hinge') || q.includes('chip')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `We operate a specialized chip-level laptop engineering lab beside UCO Bank in Ballari! 
• Advanced infrared BGA IC rework & circuit tracing
• Original screen panels with 90-day warranty
• Liquid damage reclamation & hinge structural welding
• Sub-component micro-soldering under 45x stereo optical microscope

Would you like to bring your device in for same-day diagnosis or speak directly with Naga Reddy?`,
        timestamp: 'Just now',
        options: [
          { label: '💬 WhatsApp Naga Reddy directly', action: 'whatsapp_direct' },
          { label: '📍 Store Location on Google Maps', action: 'location_info' },
        ],
      };
    }

    if (q.includes('cctv') || q.includes('camera') || q.includes('security') || q.includes('surveillance')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `We design turnkey commercial & residential CCTV surveillance networks across Ballari:
• Hikvision & CP PLUS 4K IP cameras with ColorVu night-vision
• Secure NVR network setup with multi-user smartphone live streaming
• Concealed fire-retardant conduits and neat cable racks
• Free on-site survey and quotation for clinics, warehouses, and offices`,
        timestamp: 'Just now',
        options: [
          { label: '💬 Book Free CCTV Site Survey', action: 'whatsapp_direct' },
          { label: '📁 View Completed CCTV Projects', action: 'view_portfolio' },
        ],
      };
    }

    if (q.includes('portfolio') || q.includes('case') || q.includes('project')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `We have documented field deployments across Ballari for healthcare diagnostic clinics, educational institutes, textile distribution hubs, and architectural studios.`,
        timestamp: 'Just now',
        options: [
          { label: '📁 Open Projects Portfolio Section', action: 'view_portfolio' },
          { label: '💬 Inquire About Commercial Projects', action: 'whatsapp_direct' },
        ],
      };
    }

    if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('hours') || q.includes('timing') || q.includes('open')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `📍 Store Address:
#Opp Kumaraswamy Temple, Beside UCO Bank, Ballari, Karnataka 583104

🕒 Operating Hours:
• Monday – Saturday: 9:30 AM – 9:00 PM
• Sunday: 10:00 AM – 2:00 PM

📞 Direct Contact: +91 8217676626 (Naga Reddy)`,
        timestamp: 'Just now',
        options: [
          { label: '📞 Call Store Now', action: 'call_phone' },
          { label: '💬 WhatsApp Store', action: 'whatsapp_direct' },
        ],
      };
    }

    // Default Fallback
    return {
      id: `b-${Date.now()}`,
      sender: 'bot',
      text: `Thank you for contacting iCare Computers. We specialize in chip-level motherboard engineering, commercial CCTV deployments, structured LAN cabling, and corporate AMC maintenance SLAs across Ballari. 

Would you like proprietor Naga Reddy to review your technical requirements?`,
      timestamp: 'Just now',
      options: [
        { label: '💬 Forward inquiry to WhatsApp (8217676626)', action: 'whatsapp_direct' },
        { label: '📁 View Project Portfolio', action: 'view_portfolio' },
        { label: '📍 Store Location & Hours', action: 'location_info' },
      ],
    };
  };

  const executeAction = (action: string) => {
    if (action === 'whatsapp_direct') {
      window.open(
        `https://wa.me/91${STORE_INFO.phone}?text=${encodeURIComponent(
          'Hello Naga Reddy sir, I am contacting you from the iCare Computers website regarding technical services.'
        )}`,
        '_blank'
      );
    } else if (action === 'call_phone') {
      window.location.href = `tel:${STORE_INFO.phone}`;
    } else if (action === 'location_info') {
      window.open(STORE_INFO.googleMapsUrl, '_blank');
    } else if (action === 'view_store' && onNavigateToSection) {
      onNavigateToSection('offline-store');
      setIsOpen(false);
    } else if (action === 'view_portfolio' && onNavigateToSection) {
      onNavigateToSection('portfolio');
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open iCare Technical Support Chat"
          className="relative group p-3.5 bg-gradient-to-tr from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white rounded-full shadow-xl shadow-sky-600/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              {/* Green online presence indicator */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400" />
            </>
          )}

          {/* Unread Message Pill tooltip */}
          {!isOpen && hasUnread && (
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-lg border border-slate-700 flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Need Technical Advice? Chat with Naga Reddy</span>
            </span>
          )}
        </button>
      </div>

      {/* Slide-Up Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] max-w-sm sm:max-w-md h-[560px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center font-bold text-sm">
                iC
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>iCare Technical Inquiries</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] text-slate-300">
                  Naga Reddy · Ballari Lab Expert
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Call Directly"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200 shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick Action Options */}
                {msg.options && msg.options.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 w-full">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(opt)}
                        className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-sky-50 text-sky-700 font-semibold text-[11px] border border-sky-200 hover:border-sky-300 transition-all text-left shadow-2xs cursor-pointer flex items-center gap-1"
                      >
                        <span>{opt.label}</span>
                        <ChevronRight className="w-3 h-3 text-sky-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 p-2 bg-white rounded-xl border border-slate-200 w-fit text-slate-400 text-xs">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick WhatsApp Action Strip */}
          <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">Need urgent on-site response?</span>
            <button
              onClick={() => executeAction('whatsapp_direct')}
              className="font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>WhatsApp Naga Reddy</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserInput(inputValue);
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about repairs, CCTV, AMC..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-slate-100 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
