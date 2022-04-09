import { useState,useEffect } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getTimelinePosts } from '../../services/posts';

import { logout } from '../../features/user';
import { setPosts } from '../../features/post';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import PostsContainer from '../PostsContainer';
import CreatePost from '../CreatePost';

function Timeline() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

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

  return (
    <div className="w-full h-full">
      <Navbar />
      <main className="flex h-full bg-gray-100 pt-2">
        {width > 700 && <Sidebar />}
        <PostsContainer setModalOpen={setModalOpen} loading={loading} />
        {modalOpen && <CreatePost setModalOpen={setModalOpen} />}
      </main>
    </div>
  );
}

export default Timeline;
