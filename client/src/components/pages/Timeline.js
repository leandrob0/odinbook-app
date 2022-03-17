import { useState } from 'react';
import Sidebar from '../Sidebar';
import PostsContainer from '../PostsContainer';
import CreatePost from '../CreatePost';

function Timeline() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full h-screen">
      <nav className="bg-white shadow-lg h-10"> Navbar</nav>
      <main className="flex h-full bg-gray-100">
        <Sidebar />
        <PostsContainer setModalOpen={setModalOpen} />
        {modalOpen && <CreatePost setModalOpen={setModalOpen} />}
      </main>
    </div>
  );
}

export default Timeline;
