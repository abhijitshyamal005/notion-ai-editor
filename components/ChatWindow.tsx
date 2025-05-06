import { useNotesStore } from '../store/useNotesStore'
import { useState } from 'react'

export default function ChatWindow({ noteId }: { noteId: string }) {
  const { notes, addChatMessage } = useNotesStore()
  const note = notes.find(n => n.id === noteId)
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    addChatMessage(noteId, { role: 'user', content: input })
    addChatMessage(noteId, { role: 'ai', content: 'This is a d AI response.' })
    setInput('')
  }

  return (
    <div className="mt-4 border-t pt-4 space-y-2">
      {note?.chatHistory.map((msg, idx) => (
        <div key={idx} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
          {msg.content}
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <input
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI something..."
        />
        <button className="bg-violet-600 text-white px-4 py-2 rounded" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
