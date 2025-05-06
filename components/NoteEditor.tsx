import { useEffect, useState } from 'react';
import { useStore } from '../store/useNotesStore';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

const NoteEditor = () => {
  const { activeNoteId, notes, updateNoteContent } = useStore();
  const activeNote = notes.find((note: { id: string; content: string; title: string }) => note.id === activeNoteId);

  const editor = useEditor({
    extensions: [StarterKit],
    content: activeNote?.content || '',
    onUpdate({ editor }) {
      updateNoteContent(activeNoteId || '', editor.getHTML());
    },
  });

  if (!activeNote) return <div>Select a note to edit.</div>;

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold">{activeNote.title}</h1>
      <div className="mt-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default NoteEditor;
