import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useWindowDimensions from '../hooks/useWindowDimensions';

import { getTimelinePosts } from '../services/posts';

import { logout } from '../features/user';
import { setPosts } from '../features/post';

import SinglePost from './SinglePost';
import Loading from './Loading';

function PostsContainer({ setModalOpen }) {
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.post.value.posts);
  const userPicture = useSelector((state) => state.user.value.profile_pic);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const result = await getTimelinePosts(
        JSON.parse(localStorage.getItem('token'))
      );

      if (result.msg) {
        alert('Your session expired, please log in again.');
        dispatch(logout());
        return navigate('/');
      } else {
        setLoading(false);
        dispatch(setPosts(result.posts));
      }
    };
    loadPosts();
  }, [dispatch, navigate]);

  const navigateToSelfProfile = (e) => {
    e.stopPropagation();
    return navigate(`/profile/${JSON.parse(localStorage.getItem('user')).id}`)
  };

  return (
    <section className="w-full min-h-screen max-w-screen-xl flex flex-col items-center">
      {width <= 600 ? (
        <ToggleCreateMobile
          userPicture={userPicture}
          setModalOpen={setModalOpen}
          navigateToSelfProfile={navigateToSelfProfile}
        />
      ) : (
        <ToggleCreateDesktop
          userPicture={userPicture}
          setModalOpen={setModalOpen}
          navigateToSelfProfile={navigateToSelfProfile}
        />
      )}
      {loading && <Loading />}
      {posts ? (
        posts.map((post) => {
          return (
            <SinglePost
              key={post._id}
              author={post.author}
              text={post.text}
              likes={post.likes}
              comments={post.comments}
              attached_image={post.attached_image}
            />
          );
        })
      ) : (
        <div className="h-screen">
          There are no posts.
          <br /> To see posts, add friends or create them!
        </div>
      )}
    </section>
  );
}

const ToggleCreateDesktop = ({
  userPicture,
  setModalOpen,
  navigateToSelfProfile,
}) => {
  return (
    <div className="flex items-center border-0 border-gray-200 bg-white rounded-md p-4 m-4 shadow-sm w-1/2">
      <div className='hover:cursor-pointer' onClick={(e) => navigateToSelfProfile(e)}>
        <img
          src={userPicture}
          alt="author"
          className="h-10 w-10 rounded-full mr-3"
        />
      </div>
      <div
        className="rounded-2xl bg-gray-200 text-gray-600 p-2 w-full hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition"
        onClick={() => setModalOpen(true)}
      >
        What are you thinking?
      </div>
    </div>
  );
};

const ToggleCreateMobile = ({
  userPicture,
  setModalOpen,
  navigateToSelfProfile,
}) => {
  return (
    <div className="flex items-center border-0 border-gray-200 bg-white rounded-md p-4 m-4 shadow-sm w-full">
      <div className='hover:cursor-pointer' onClick={(e) => navigateToSelfProfile(e)}>
        <img
          src={userPicture}
          alt="author"
          className="h-10 w-10 rounded-full flex-shrink-0 mr-3"
        />
      </div>
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
