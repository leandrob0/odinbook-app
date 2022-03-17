import useWindowDimensions from '../hooks/useWindowDimensions';

function SinglePost({ text, likes, comments }) {
  const { width } = useWindowDimensions();

  return (
    <>
      {width <= 600 ? (
        <MobileSingle text={text} likes={likes} comments={comments} />
      ) : (
        <DesktopSingle text={text} likes={likes} comments={comments} />
      )}
    </>
  );
}

const DesktopSingle = ({ text, likes, comments }) => {
  return (
    <article className="w-1/2 flex flex-col items-start m-4 bg-white rounded p-4">
      <div className="flex justify-center items-center">
        <div className="h-10 w-10 bg-blue-600 rounded-full"></div>
        <div className="flex flex-col items-center p-2">
          <p>Leandro Bovino</p>
          <p className="text-xs text-gray-500">03/17/2022 at 12:35</p>
        </div>
      </div>
      <div>
        <p className="text-base">{text}</p>
      </div>
      <div className="flex justify-between w-full text-xs text-gray-600 py-2 border-b border-b-gray-300">
        <p>{likes} Likes</p>
        <p>{comments} Comments</p>
      </div>
      <div className="flex justify-around w-full text-gray-800 font-medium pt-4">
        <p>Like</p>
        <p>Comment</p>
      </div>
    </article>
  );
};

const MobileSingle = ({ text, likes, comments }) => {
  return (
    <article className="w-full flex flex-col items-start m-4 bg-white rounded p-4">
      <div className="flex justify-center items-center">
        <div className="h-10 w-10 bg-blue-600 rounded-full"></div>
        <div className="flex flex-col items-center p-2">
          <p>Leandro Bovino</p>
          <p className="text-xs text-gray-500">03/17/2022 at 12:35</p>
        </div>
      </div>
      <div>
        <p className="text-sm">{text}</p>
      </div>
      <div className="flex justify-between w-full text-xs text-gray-600 py-2 border-b border-b-gray-300">
        <p>{likes} Likes</p>
        <p>{comments} Comments</p>
      </div>
      <div className="flex justify-around w-full text-gray-800 font-medium pt-4">
        <p>Like</p>
        <p>Comment</p>
      </div>
    </article>
  );
};

export default SinglePost;
