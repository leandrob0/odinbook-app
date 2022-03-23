import { useState } from 'react';
import { createPost } from '../services/posts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPost } from '../features/post';

const CreatePost = ({ setModalOpen }) => {
  const [formValues, setFormValues] = useState({
    text: '',
    file: undefined,
    name: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('text', formValues.text);
    if (formValues.file && formValues.name) {
      data.append('name', formValues.name);
      data.append('file', formValues.file);
    }

    const result = await createPost(
      JSON.parse(localStorage.getItem('token')),
      data
    );
    if (result.msg) {
      console.log(result.msg);
    } else {
      dispatch(addPost(result.post));
      setModalOpen(false);
      return navigate('/timeline');
    }
  };

  return (
    <div
      onClick={() => setModalOpen(false)}
      className="h-screen w-screen bg-white bg-opacity-70 flex justify-center items-center absolute"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
        className="m-4 border rounded bg-white shadow-md flex flex-col items-center"
      >
        <div className="flex justify-center p-2 border-b border-b-gray-300 w-full">
          <h2 className="font-bold text-lg">Create Post</h2>
        </div>
        <div className="flex justify-center p-2">
          <div className="bg-blue-500 rounded-full h-10 w-10"></div>
        </div>
        <textarea
          name="text"
          id="text"
          className="self-start px-4 py-2 w-full resize-none"
          rows="5"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              [e.target.name]: e.target.value,
            })
          }
          required
          placeholder="What are you thinking?"
        />
        <span className="text-gray-900 w-full border-t border-t-gray-400 justify-self-center px-4 py-2">
          Chose post photo.
        </span>
        <input
          name="file"
          id="file"
          type="file"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              file: e.target.files[0],
              name: e.target.files[0].name,
            })
          }
          className="block w-full text-sm text-slate-500 px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button className="border-0 rounded p-2 m-2 mb-3 text-white font-bold shadow-md shadow-blue-500/50 bg-blue-500 hover:bg-blue-600 transition w-80 lg:w-96">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
