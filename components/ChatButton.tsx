import { useState } from 'react';
import ChatWindow from './ChatWindow';
import { Sparkles } from 'lucide-react'; // Optional icon, install via: `npm i lucide-react`

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleChatWindow}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-xl rounded-full p-4 transition-all duration-300 hover:scale-105 flex items-center gap-2 z-50"
        aria-label="Toggle AI Chat"
      >
        <Sparkles size={20} />
        <span className="font-semibold">Ask AI</span>
      </button>

      {isOpen && <ChatWindow onClose={toggleChatWindow} />}
    </>
  );
};

export default ChatButton;