import { useState } from 'react';
import { useStore } from '../store/useNotesStore';

const ChatButton = () => {
  const { activeNoteId } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!activeNoteId) return null;

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        Chat
      </button>
      {isOpen && <div className="absolute bottom-16 right-4 w-80 bg-white p-4 rounded-lg shadow-lg">Chat Window</div>}
    </div>
  );
};

export default ChatButton;
