export type ChatMessage = {
    sender: 'user' | 'ai';
    message: string;
  };
  
  export type Note = {
    id: string;
    title: string;
    content: string;
    chatHistory: ChatMessage[];
  };
  