import { create } from 'zustand';

type ChatMessage = {
  sender: 'user' | 'ai';
  message: string;
};

type Note = {
  id: string;
  title: string;
  content: string;
  chatHistory: ChatMessage[];
};

type Store = {
  notes: Note[];
  activeNoteId: string | null;
  setActiveNoteId: (id: string) => void;
  addNote: (title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  addChatMessage: (noteId: string, message: ChatMessage) => void;
};

export const useStore = create<Store>((set) => ({
  notes: [],
  activeNoteId: null,

  // Set the active note ID
  setActiveNoteId: (id: string) => set({ activeNoteId: id }),

  // Add a new note
  addNote: (title: string) =>
    set((state) => {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content: '',
        chatHistory: [],
      };
      return { notes: [...state.notes, newNote] };
    }),

  // Update the content of a note
  updateNoteContent: (id: string, content: string) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content } : note
      ),
    })),

  // Add a chat message to a note's chat history
  addChatMessage: (noteId: string, message: ChatMessage) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId
          ? { ...note, chatHistory: [...note.chatHistory, message] }
          : note
      ),
    })),
}));