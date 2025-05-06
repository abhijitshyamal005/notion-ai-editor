import Sidebar from '../components/Sidebar';
import NoteEditor from '../components/NoteEditor';

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <NoteEditor />
    </div>
  );
}