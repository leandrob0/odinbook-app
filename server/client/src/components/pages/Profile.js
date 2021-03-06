import { useParams, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { getPostsFromUser } from '../../services/posts';
import { getUserInfo } from '../../services/users';
import { setPosts } from '../../features/post';
import { logout } from '../../features/user';

import Navbar from '../Navbar';
import SidebarProfile from '../SidebarProfile';
import PostsContainer from '../PostsContainer';
import CreatePost from '../CreatePost';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState('');
  const { id } = useParams();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const result = await getPostsFromUser(
        JSON.parse(localStorage.getItem('token')),
        id
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

    const userInfo = async () => {
      const result = await getUserInfo(
        JSON.parse(localStorage.getItem('token')),
        id
      );

      if (result.msg) {
        alert('Your session expired, please log in again.');
        dispatch(logout());
        return navigate('/');
      } else {
        setUser(result.info);
      }
    };

    loadPosts();
    userInfo();
  }, [dispatch, navigate, id]);

  return (
    <div>
      <Navbar />
      <main className={width < 800 ? 'flex flex-wrap bg-gray-100 relative' : 'flex bg-gray-100 relative'}>
        {user && <SidebarProfile className={width < 800 ? 'w-full' : 'w-80'} user={user} />}
        <PostsContainer setModalOpen={setModalOpen} loading={loading} />
        {modalOpen && <CreatePost setModalOpen={setModalOpen} />}
      </main>
    </div>
  );
};

export default Profile;
