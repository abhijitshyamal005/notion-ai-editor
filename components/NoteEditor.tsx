import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import { useEffect } from 'react'
import { useNotesStore } from '../store/useNotesStore'

export default function NoteEditor() {
  const { notes, selectedNoteId, updateNoteContent } = useNotesStore()
  const currentNote = notes.find(n => n.id === selectedNoteId)

  const editor = useEditor({
    extensions: [StarterKit, Heading.configure({ levels: [1, 2, 3] }), BulletList, OrderedList],
    content: currentNote?.content || '',
    onUpdate({ editor }) {
      if (currentNote) {
        updateNoteContent(currentNote.id, editor.getJSON())
      }
    }
  })

  useEffect(() => {
    if (editor && currentNote) {
      editor.commands.setContent(currentNote.content || '')
    }
  }, [selectedNoteId])

  return (
    <div className="prose max-w-none border p-4 rounded">
      <EditorContent editor={editor} />
    </div>
  )
}
