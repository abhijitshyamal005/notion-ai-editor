import { useStore } from '../store/useNotesStore';
import { Plus } from 'lucide-react';

const Sidebar = () => {
  const { notes, activeNoteId, setActiveNoteId, addNote } = useStore();

  // Handle adding a new note
  const handleAddNote = () => {
    addNote('New Note');
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🗒️ My Notes</h2>
        <button
          onClick={handleAddNote}
          className="bg-white text-indigo-600 p-1 rounded-full hover:scale-105 transition"
          aria-label="Add New Note"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Notes List */}
      <ul className="space-y-2">
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => setActiveNoteId(note.id)}
            className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              note.id === activeNoteId
                ? 'bg-white text-indigo-700 shadow'
                : 'hover:bg-white/20'
            }`}
          >
            {note.title || 'Untitled Note'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;