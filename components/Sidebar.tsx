import { useNotesStore } from '../store/useNotesStore'

export default function Sidebar() {
  const { notes, selectedNoteId, addNote, selectNote } = useNotesStore()

  return (
    <div className="w-64 bg-gray100 h-screen p-4">
      <button onClick={addNote} className="mb-4 w-full bg-blue-500 text-white py-2 rounded">+ New Note</button>
      <ul>
        {notes.map(note => (
          <li
            key={note.id}
            className={`p-2 cursor-pointer ${note.id === selectedNoteId ? 'bg-blue-200' : ''}`}
            onClick={() => selectNote(note.id)}
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
