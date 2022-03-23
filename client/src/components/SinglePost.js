import useWindowDimensions from '../hooks/useWindowDimensions';

function SinglePost({ author, text, likes, comments, attached_image }) {
  const { width } = useWindowDimensions();

  return (
    <>
      {width <= 600 ? (
        <MobileSingle
          author={author}
          text={text}
          likes={likes}
          comments={comments}
          attached_image={attached_image}
        />
      ) : (
        <DesktopSingle
          author={author}
          text={text}
          likes={likes}
          comments={comments}
          attached_image={attached_image}
        />
      )}
    </>
  );
}

const DesktopSingle = ({ author, text, likes, comments, attached_image }) => {
  return (
    <article className="w-1/2 flex flex-col items-start m-4 bg-white rounded p-4">
      <div className="flex justify-center items-center">
        <div>
          <img
            src={author.profile_pic}
            alt="author"
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="flex flex-col items-center p-2">
          <p>{author.first_name + ' ' + author.last_name}</p>
          <p className="text-xs text-gray-500">03/17/2022 at 12:35</p>
        </div>
      </div>
      <div>
        <p className="text-base">{text}</p>
      </div>
      {attached_image && (
        <div className="py-4">
          <img
            className="w-full aspect-video"
            src={attached_image}
            alt="post content"
          />
        </div>
      )}
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

const MobileSingle = ({ author, text, likes, comments, attached_image }) => {
  return (
    <article className="w-full flex flex-col items-start m-4 bg-white rounded p-4">
      <div className="flex justify-center items-center">
        <div>
          <img
            src={author.profile_pic}
            alt="author"
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="flex flex-col items-center p-2">
          <p>{author.first_name + ' ' + author.last_name}</p>
          <p className="text-xs text-gray-500">03/17/2022 at 12:35</p>
        </div>
      </div>
      <div>
        <p className="text-sm">{text}</p>
      </div>
      {attached_image && (
        <div className="py-4">
          <img
            className="w-full aspect-video"
            src={attached_image}
            alt="post content"
          />
        </div>
      )}
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
