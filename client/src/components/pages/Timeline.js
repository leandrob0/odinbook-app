import Sidebar from "../Sidebar";

function Timeline() {
  return (
    <div className='w-full h-screen'>
      <nav className="bg-gray-300 h-10"> Navbar</nav>
      <main className='flex h-full'>
        <Sidebar /> 
        <section className='bg-white w-4/5'>Posts</section> {/* y para celu tambien va a tener que cambiar la vista. */}
      </main>
    </div>
  );
}

export default Timeline;
