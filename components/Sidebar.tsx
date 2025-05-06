import { useStore } from '../store/useNotesStore';

interface Note {
  id: string;
  title: string;
}

const Sidebar = () => {
  const { notes, setActiveNote, addNote } = useStore();

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-lg font-bold">Notes</h2>
      <button onClick={() => addNote('New Note')} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Add New Note
      </button>
      <ul className="space-y-2 mt-4">
        {notes.map((note) => (
          <li
            key={note.id}
            className="cursor-pointer"
            onClick={() => setActiveNote(note.id)}
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
