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
  setActiveNote: (id: string) => void;
  addNote: (title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  addChatMessage: (noteId: string, message: ChatMessage) => void;
};

export const useStore = create<Store>((set) => ({
  notes: [],
  activeNoteId: null,
  setActiveNote: (id: string) => set({ activeNoteId: id }),
  addNote: (title: string) => set((state) => {
    const newNote = { id: Date.now().toString(), title, content: '', chatHistory: [] };
    return { notes: [...state.notes, newNote] };
  }),
  updateNoteContent: (id: string, content: string) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === id ? { ...note, content } : note
    ),
  })),
  addChatMessage: (noteId: string, message: ChatMessage) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === noteId ? { ...note, chatHistory: [...note.chatHistory, message] } : note
    ),
  })),
}));
