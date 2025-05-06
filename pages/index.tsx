import Sidebar from '../components/Sidebar'
import NoteEditor from '../components/NoteEditor'
import ChatButton from '../components/ChatButton'
import ChatWindow from '../components/ChatWindow'
import { useState } from 'react'
import { useNotesStore } from '../store/useNotesStore'

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)
  const { selectedNoteId } = useNotesStore()

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        {selectedNoteId ? (
          <>
            <NoteEditor />
            {chatOpen && <ChatWindow noteId={selectedNoteId} />}
            <ChatButton onClick={() => setChatOpen(prev => !prev)} />
          </>
        ) : (
          <div>Select or create a note.</div>
        )}
      </main>
    </div>
  )
}
