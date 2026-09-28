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
  onNavigateToCatalog?: () => void;
}

export const CustomerSupportChat: React.FC<CustomerSupportChatProps> = ({
  initialTopic,
  onNavigateToCatalog,
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
      text: `Hello! Welcome to iCare Computers, Ballari. I'm your digital support assistant. How can Venkata Reddy and our technical team assist you today?`,
      timestamp: 'Just now',
      options: [
        { label: '💻 Laptop Repair & Screen Quote', action: 'repair_quote' },
        { label: '📦 Check Product Availability & Price', action: 'product_check' },
        { label: '📹 Book CCTV Site Survey in Ballari', action: 'cctv_survey' },
        { label: '📍 Store Location & Working Hours', action: 'location_info' },
        { label: '⚡ Fast SSD / RAM Upgrade Price', action: 'upgrade_info' },
        { label: '💬 Talk to Venkata Reddy on WhatsApp', action: 'whatsapp_direct' },
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

  // Handle external topic triggers (e.g. from Services section)
  useEffect(() => {
    if (initialTopic) {
      setIsOpen(true);
      handleUserInput(`I would like to inquire about: ${initialTopic}`);
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
    handleUserInput(option.label);
  };

  const generateBotResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase();

    if (q.includes('repair') || q.includes('screen') || q.includes('display') || q.includes('motherboard') || q.includes('hinge')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `We specialize in chip-level laptop repairs at our workshop beside UCO Bank! 
• Screen replacements: ₹2,800 – ₹4,500 (Same-day)
• Motherboard dead / liquid spill chip-level rework: ₹1,200 – ₹2,900
• Hinge fabrication: ₹750 – ₹1,400

All repairs include a 90-day store guarantee. Would you like to bring your laptop in today or talk to proprietor Venkata Reddy?`,
        timestamp: 'Just now',
        options: [
          { label: '💬 WhatsApp Venkata Reddy directly', action: 'whatsapp_direct' },
          { label: '📍 View store location on Google Maps', action: 'location_info' },
        ],
      };
    }

    if (q.includes('cctv') || q.includes('camera') || q.includes('security') || q.includes('hikvision') || q.includes('cp plus')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `We are authorized installers for CP PLUS, Hikvision, and Dahua in Ballari! 
• 4-Camera 1080p Full Kit with 1TB HDD & installation starts from ₹11,999.
• We provide free mobile viewing setup so you can watch live video on your smartphone from anywhere.
• Site surveys are free for stores, clinics, and residences in Ballari.`,
        timestamp: 'Just now',
        options: [
          { label: '💬 Book Free CCTV Site Survey', action: 'whatsapp_direct' },
          { label: '📦 View CCTV Kits in Catalog', action: 'view_catalog' },
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

📞 Direct Contact: +91 7406059999 (Venkata Reddy)`,
        timestamp: 'Just now',
        options: [
          { label: '📞 Call Store Now', action: 'call_phone' },
          { label: '💬 WhatsApp Store', action: 'whatsapp_direct' },
        ],
      };
    }

    if (q.includes('ssd') || q.includes('ram') || q.includes('upgrade') || q.includes('slow')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `Upgrading to a Gen4 NVMe SSD makes any laptop or desktop up to 10x faster!
• 256GB SSD Upgrade + Windows Installation: ₹1,850
• 512GB SSD Upgrade: ₹2,750
• 1TB Crucial P3 Plus SSD: ₹5,499
• DDR4 8GB / 16GB RAM: from ₹1,450

Turnaround time is just 45 minutes at our express counter.`,
        timestamp: 'Just now',
        options: [
          { label: '💬 Reserve SSD Upgrade Slot', action: 'whatsapp_direct' },
          { label: '📦 Browse Accessories in Catalog', action: 'view_catalog' },
        ],
      };
    }

    if (q.includes('whatsapp') || q.includes('talk') || q.includes('call') || q.includes('contact')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `You can reach proprietor Venkata Reddy directly at +91 7406059999 via phone call or WhatsApp for quick quotations, doorstep delivery coordination, or custom configurations!`,
        timestamp: 'Just now',
        options: [
          { label: '💬 Open WhatsApp with Venkata Reddy', action: 'whatsapp_direct' },
          { label: '📞 Call +91 7406059999', action: 'call_phone' },
        ],
      };
    }

    // Default Fallback
    return {
      id: `b-${Date.now()}`,
      sender: 'bot',
      text: `Thank you for your message! At iCare Computers, we supply laptops (HP, Dell, Lenovo, ASUS), custom PCs, Epson printers, and CCTV surveillance, alongside fast repairs. 

Would you like to browse our online catalog, or would you like Venkata Reddy to review this directly?`,
      timestamp: 'Just now',
      options: [
        { label: '📦 View Store Catalog & Order', action: 'view_catalog' },
        { label: '💬 Forward query to WhatsApp: 7406059999', action: 'whatsapp_direct' },
        { label: '📍 Store Location & Hours', action: 'location_info' },
      ],
    };
  };

  const executeAction = (action: string) => {
    if (action === 'whatsapp_direct') {
      window.open(
        `https://wa.me/91${STORE_INFO.phone}?text=${encodeURIComponent(
          'Hello Venkata Reddy sir, I am contacting you from the iCare Computers website for customer support.'
        )}`,
        '_blank'
      );
    } else if (action === 'call_phone') {
      window.location.href = `tel:${STORE_INFO.phone}`;
    } else if (action === 'view_catalog' && onNavigateToCatalog) {
      onNavigateToCatalog();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open iCare Customer Support Chat"
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
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-lg whitespace-nowrap hidden sm:flex items-center gap-1.5 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Need help? Chat with iCare Support</span>
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-20 right-4 sm:right-6 z-40 w-[92vw] sm:w-[390px] h-[540px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-300"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white p-0.5 shadow-sm flex items-center justify-center">
                <BrandLogo variant="icon-only" size="sm" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight font-heading">
                  iCare Support Desk
                </h3>
                <p className="text-[11px] text-sky-200 flex items-center gap-1">
                  <span>Venkata Reddy &amp; Tech Team</span>
                  <span>·</span>
                  <span className="text-emerald-300 font-medium">Online</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Call Shop"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick WhatsApp Handoff Strip */}
          <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center justify-between text-xs text-emerald-800">
            <span className="truncate">Instant WhatsApp help available:</span>
            <a
              href={`https://wa.me/91${STORE_INFO.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-emerald-700 hover:text-emerald-900 shrink-0 ml-2"
            >
              Connect
            </a>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                <span className="text-[10px] text-slate-400 px-1 mt-0.5 font-mono">
                  {msg.timestamp}
                </span>

                {/* Interactive Option Chips / Buttons */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-2 max-w-[95%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (['whatsapp_direct', 'call_phone', 'view_catalog', 'view_gallery'].includes(opt.action)) {
                            executeAction(opt.action);
                          } else {
                            handleOptionClick(opt);
                          }
                        }}
                        className="text-left px-3 py-1.5 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl text-[11px] font-semibold text-slate-700 hover:text-sky-700 transition-colors shadow-2xs flex items-center justify-between group cursor-pointer"
                      >
                        <span>{opt.label}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border border-slate-200 w-20">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce delay-150" />
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce delay-300" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserInput(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your question (e.g., SSD cost, repair time)..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
              <span>iCare Computers · Ballari</span>
              <span>Proprietor: Venkata Reddy</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
