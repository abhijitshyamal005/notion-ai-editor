import { useState } from 'react';
import { useStore } from '../store/useNotesStore';
import { X } from 'lucide-react';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const { activeNoteId, addChatMessage, notes } = useStore();
  const [message, setMessage] = useState('');

  // Retrieve chat history for the active note
  const chatHistory = notes.find((note) => note.id === activeNoteId)?.chatHistory || [];

  // Handle sending a message
  const sendMessage = () => {
    if (!message.trim()) return;

    // Add user message to chat history
    addChatMessage(activeNoteId || '', { sender: 'user', message });
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      addChatMessage(activeNoteId || '', {
        sender: 'ai',
        message: '🤖 AI says: This is a mock reply.',
      });
    }, 500);
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-bold text-lg">💬 AI Assistant</h3>
        <button onClick={onClose} aria-label="Close Chat">
          <X size={20} />
        </button>
      </div>

      {/* Chat History */}
      <div className="h-64 overflow-y-auto px-4 py-2 space-y-2">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`text-sm p-2 rounded-md max-w-[85%] ${
              msg.sender === 'user' ? 'bg-blue-100 ml-auto text-right' : 'bg-gray-100'
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex p-4 border-t gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;