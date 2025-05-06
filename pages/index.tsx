import Sidebar from '../components/Sidebar';
import NoteEditor from '../components/NoteEditor';
import ChatButton from '../components/ChatButton';

const Home = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NoteEditor />
        <ChatButton />
      </div>
    </div>
  );
};

export default Home;
