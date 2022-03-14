import React from 'react';

function Timeline() {
  return (
    <div className='w-full h-screen'>
      <nav className="bg-gray-300 h-10"> Navbar</nav>
      <main className='flex h-full'>
        <aside className='bg-gray-500 w-1/5'>Friends</aside> {/* puede ser hasta menos el width, eso vamos viendo. */}
        <section className='bg-white w-4/5'>Posts</section> {/* y para celu tambien va a tener que cambiar la vista. */}
      </main>
    </div>
  );
}

export default Timeline;
