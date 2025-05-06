import { useState } from 'react';
import { useStore } from '../store/useNotesStore';

const ChatWindow = () => {
  const { activeNoteId, addChatMessage } = useStore();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      addChatMessage(activeNoteId || '', { sender: 'user', message });
      setMessage('');
      
      setTimeout(() => {
        addChatMessage(activeNoteId || '', { sender: 'ai', message: 'Mock AI Response' });
      }, 1000);
    }
  };

  type ChatMessage = { sender: string; message: string };
  const chatHistory: ChatMessage[] = useStore.getState().notes.find((note: { id: string; chatHistory: ChatMessage[] }) => note.id === activeNoteId)?.chatHistory || [];

  return (
    <div className="fixed bottom-16 right-4 w-80 bg-white p-4 rounded-lg shadow-lg">
      <div className="h-64 overflow-auto">
        {chatHistory.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'text-right' : ''}>
            <div className="p-2">{msg.message}</div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} className="w-full mt-2 bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
