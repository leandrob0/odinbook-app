import { useState } from 'react';

const CreatePost = ({ setModalOpen }) => {
  const [formValues, setFormValues] = useState({ text: '' });
  return (
    <div
      onClick={() => setModalOpen(false)}
      className="h-screen w-screen bg-white bg-opacity-70 flex justify-center items-center absolute"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        /* onSubmit={(e) => handleSubmit(e)} */
        className="m-4 border rounded bg-white shadow-md flex flex-col items-center"
      >
        <div className="flex justify-center p-2 border-b border-b-gray-300 w-full">
          <h2 className="font-bold text-lg">Create Post</h2>
        </div>
        <div className="flex justify-center p-2">
          <div className="bg-blue-500 rounded-full h-10 w-10"></div>
        </div>
        <textarea
          className="self-start px-4 py-2 w-full resize-none"
          rows='5'
          required
          placeholder="What are you thinking?"
        />
        <button className="border-0 rounded p-2 m-2 mb-3 text-white font-bold shadow-md shadow-blue-500/50 bg-blue-500 hover:bg-blue-600 transition w-80 lg:w-96">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
