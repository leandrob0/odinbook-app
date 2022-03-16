import Sidebar from "../Sidebar";
import PostsContainer from "../PostsContainer";

function Timeline() {
  return (
    <div className='w-full h-screen'>
      <nav className="bg-gray-300 h-10"> Navbar</nav>
      <main className='flex h-full'>
        <Sidebar /> 
        <PostsContainer /> 
      </main>
    </div>
  );
}

export default Timeline;
