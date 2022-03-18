import { useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import PostsContainer from '../PostsContainer';
import CreatePost from '../CreatePost';

function Timeline() {
  const [modalOpen, setModalOpen] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <div className="w-full h-full">
      <Navbar />
      <main className="flex h-full bg-gray-100 pt-2">
        {width > 600 && <Sidebar />}
        <PostsContainer setModalOpen={setModalOpen} />
        {modalOpen && <CreatePost setModalOpen={setModalOpen} />}
      </main>
    </div>
  );
}

export default Timeline;
