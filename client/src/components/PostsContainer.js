import { useState } from 'react';

function PostsContainer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-white w-4/5 flex flex-col items-center">
      <div className="flex items-center border-0 border-gray-600 bg-gray-900 rounded-md p-4 m-4 shadow-sm w-1/2">
        <div className="bg-white rounded-full h-10 w-10"></div>
        <div className="rounded-md bg-gray-700 text-gray-400 ml-3 p-2 w-full">
          What are you thinking?
        </div>
      </div>
    </section>
  );
}

export default PostsContainer;
