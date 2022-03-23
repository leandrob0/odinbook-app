import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';
import SinglePost from './SinglePost';
import { getTimelinePosts } from '../services/posts';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user';

function PostsContainer({ setModalOpen }) {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const result = getTimelinePosts(JSON.parse(localStorage.getItem('token')));

    if (result.msg) {
      alert('Your session expired, please log in again.');
      dispatch(logout());
      return navigate('/');
    } else {
      setPosts(result.posts)
    }
  }, [dispatch, navigate]);

  return (
    <section className="w-full flex flex-col items-center">
      {width <= 600 ? (
        <ToggleCreateMobile setModalOpen={setModalOpen} />
      ) : (
        <ToggleCreateDesktop setModalOpen={setModalOpen} />
      )}
      {posts ? (
        posts.map((post) => {
          return (
            <SinglePost
              key={post._id}
              text={post.text}
              likes={post.likes}
              comments={post.comments}
            />
          );
        })
      ) : (
        <div className='h-screen'>There are no posts.<br/> To see posts, add friends or create them!</div>
      )}
    </section>
  );
}

const ToggleCreateDesktop = ({ setModalOpen }) => {
  return (
    <div className="flex items-center border-0 border-gray-200 bg-white rounded-md p-4 m-4 shadow-sm w-1/2">
      <div className="bg-blue-600 rounded-full h-10 w-10 mr-3 flex-shrink-0"></div>
      <div
        className="rounded-2xl bg-gray-200 text-gray-600 p-2 w-full hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition"
        onClick={() => setModalOpen(true)}
      >
        What are you thinking?
      </div>
    </div>
  );
};

const ToggleCreateMobile = ({ setModalOpen }) => {
  return (
    <div className="flex items-center border-0 border-gray-200 bg-white rounded-md p-4 m-4 shadow-sm w-full">
      <div className="bg-blue-600 rounded-full h-10 w-10 mr-3 flex-shrink-0"></div>
      <div
        className="rounded-2xl bg-gray-200 text-gray-600 p-2 w-full hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition"
        onClick={() => setModalOpen(true)}
      >
        What are you thinking?
      </div>
    </div>
  );
};

export default PostsContainer;
