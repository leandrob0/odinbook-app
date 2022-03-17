import useWindowDimensions from '../hooks/useWindowDimensions';
import SinglePost from './SinglePost';

function PostsContainer({ setModalOpen }) {
  const { width } = useWindowDimensions();

  const testPosts = [
    { text: 'This is a post', likes: 0, comments: 2 },
    {
      text: 'This post has the most comments of them all!',
      likes: 17,
      comments: 23,
    },
    { text: 'No comments on this post.', likes: 2, comments: 0 },
    { text: 'A post with the same likes and comments', likes: 6, comments: 6 },
    {
      text: 'Another posts but this is the most liked one',
      likes: 30,
      comments: 11,
    },
  ];

  return (
    <section className="w-full flex flex-col items-center">
      {width <= 600 ? (
        <ToggleCreateMobile setModalOpen={setModalOpen} />
      ) : (
        <ToggleCreateDesktop setModalOpen={setModalOpen} />
      )}
      {testPosts.map((post) => {
        return (
          <SinglePost
            key={post.text}
            text={post.text}
            likes={post.likes}
            comments={post.comments}
          />
        );
      })}
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
