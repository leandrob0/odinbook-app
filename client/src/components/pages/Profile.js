import { useParams } from 'react-router-dom';

import Navbar from '../Navbar';
import SidebarProfile from '../SidebarProfile';
import PostsContainer from '../PostsContainer';

const Profile = () => {
  const { id } = useParams();
  return (
    <div>
      <Navbar />
      <main>
        <SidebarProfile />
        <PostsContainer />
      </main>
    </div>
  );
};

export default Profile;
