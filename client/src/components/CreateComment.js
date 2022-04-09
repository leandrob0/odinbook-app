import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createComment } from '../services/comments';
import { updatePost } from '../features/post';

const CreateComment = ({
  postId,
  allComments,
  setAllComments,
  amountComments,
  setAmountComments,
}) => {
  const [comment, setComment] = useState('');
  const userPicture = useSelector((state) => state.user.value.profile_pic);
  const dispatch = useDispatch();

  const newComment = async () => {
    const result = await createComment(
      JSON.parse(localStorage.getItem('token')),
      comment,
      postId
    );

    if (result.msg) {
      alert(result.msg);
    } else {
      dispatch(updatePost(result));
      //setAmountComments(amountComments + 1);
    }
  };

  return (
    <div className="flex items-center bg-white rounded-md pt-4 w-full">
      <a
        className="hover:cursor-pointer flex-shrink-0"
        href={'/profile/' + JSON.parse(localStorage.getItem('user')).id}
      >
        <img
          src={'/' + userPicture}
          alt="author"
          className="h-10 w-10 rounded-full"
        />
      </a>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Create a comment!"
        className="rounded-2xl bg-gray-200 text-gray-800 m-1 p-2 w-full hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition"
      />
      <button
        type="button"
        onClick={() => newComment()}
        className="border-0 rounded p-2 text-white font-bold shadow-md shadow-blue-500/50 bg-blue-500 hover:bg-blue-600 transition w-24 text-sm lg:text-base"
      >
        Comment
      </button>
    </div>
  );
};

export default CreateComment;
