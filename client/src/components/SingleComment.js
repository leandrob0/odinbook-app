const SingleComment = ({ comment }) => {
  return (
    <div className="flex w-full">
      <a
        className="hover:cursor-pointer flex-shrink-0"
        href={'/profile/' + comment.author._id}
      >
        <img
          alt="comment author"
          className="h-10 w-10 rounded-full"
          src={'/' + comment.author.profile_pic}
        />
      </a>
      <div className="ml-1">
        <h4 className="font-bold text-sm">
          {comment.author.first_name} {comment.author.last_name}
        </h4>
        <p className="text-sm">{comment.text}</p>
      </div>
    </div>
  );
};

export default SingleComment;
