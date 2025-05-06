import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { useStore } from '../store/useNotesStore';
import ChatButton from './ChatButton';

const NoteEditor = () => {
  const { notes, activeNoteId, updateNoteContent } = useStore();
  const activeNote = notes.find((note) => note.id === activeNoteId);

  const [textAreaContent, setTextAreaContent] = useState(activeNote?.content || '');

  const editor = useEditor({
    extensions: [StarterKit],
    content: activeNote?.content || '',
    onUpdate: ({ editor }) => {
      if (activeNoteId) {
        setTextAreaContent(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && activeNote) {
      editor.commands.setContent(activeNote.content);
      setTextAreaContent(activeNote.content);
    }
  }, [activeNoteId, activeNote, editor]);

  const handleSave = () => {
    if (activeNoteId) {
      updateNoteContent(activeNoteId, textAreaContent);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-white to-gray-100 text-gray-800 relative">
      {activeNote ? (
        <>
          {/* Note Title */}
          <h1 className="text-3xl font-bold mb-4 text-indigo-600">
            {activeNote.title || 'Untitled Note'}
          </h1>

          {/* Note Content Editor */}
          <div className="prose prose-lg max-w-full mb-4">
            <EditorContent editor={editor} />
          </div>

          {/* Text Area for Editing */}
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            rows={5}
            value={textAreaContent}
            onChange={(e) => setTextAreaContent(e.target.value)}
          />

          {/* Save Button */}
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      ) : (
        // Fallback when no note is selected
        <p className="text-center text-gray-500">Select a note to start editing.</p>
      )}

      {/* Chat Button */}
      <ChatButton />
    </div>
  );
};

export default NoteEditor;