import useWindowDimensions from '../hooks/useWindowDimensions';

function PostsContainer({ setModalOpen }) {
  const { width } = useWindowDimensions();

  return (
    <section className="w-full flex flex-col items-center">
      {width <= 600 ? (
        <div className="flex items-center border-0 border-gray-200 bg-white rounded-md p-4 m-4 shadow-sm w-full">
          <div className="bg-blue-600 rounded-full h-10 w-10 mr-3 flex-shrink-0"></div>
          <div
            className="rounded-2xl bg-gray-200 text-gray-600 p-2 w-full hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition"
            onClick={() => setModalOpen(true)}
          >
            What are you thinking?
          </div>
        </div>
      ) : (
        <div className="flex items-center border-0 border-gray-200 bg-white rounded-md p-4 m-4 shadow-sm w-1/2">
          <div className="bg-blue-600 rounded-full h-10 w-10 mr-3 flex-shrink-0"></div>
          <div
            className="rounded-2xl bg-gray-200 text-gray-600 p-2 w-full hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition"
            onClick={() => setModalOpen(true)}
          >
            What are you thinking?
          </div>
        </div>
      )}
    </section>
  );
}

export default PostsContainer;
