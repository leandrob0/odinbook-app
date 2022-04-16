import { useState } from 'react';
import { useSelector } from 'react-redux';

import { likeComment } from '../services/comments';

import { ThumbUpIcon } from '@heroicons/react/solid';

const SingleComment = ({ comment }) => {
  const loggedUser = useSelector((state) => state.user.value);
  const [liked, setLiked] = useState(comment.likes.includes(loggedUser.id));
  const [amountLikes, setAmountLikes] = useState(comment.likes.length);

  const likePressed = async () => {
    const result = await likeComment(JSON.parse(localStorage.getItem('token')),comment._id);

    if(result.msg) {
      alert(result.msg);
    }
  }

  return (
    <div className="flex w-full">
      <a
        className="hover:cursor-pointer flex-shrink-0"
        href={'/#/profile/' + comment.author._id}
      >
        <img
          alt="comment author"
          className="h-10 w-10 rounded-full"
          src={comment.author.profile_pic}
        />
      </a>
      <div>
        <div className="ml-1 rounded bg-gray-200 p-2 relative">
          <h4 className="font-bold text-sm">
            {comment.author.first_name} {comment.author.last_name}
          </h4>
          <p className="text-sm">{comment.text}</p>
          <div className="absolute right-0 -bottom-6 rounded-xl p-1 bg-white shadow-md flex justify-center items-center">
            <ThumbUpIcon className='text-blue-600 w-5 h-5'/>
            <p className='text-sm'>{amountLikes}</p>
          </div>
        </div>
        <button
          onClick={() => {
            likePressed();
            setLiked(!liked);
            setAmountLikes(liked ? amountLikes - 1 : amountLikes + 1);
          }}
          type="button"
          className={`ml-1 text-sm text-gray-800 hover:scale-110 hover:cursor-pointer transition ${
            liked ? 'text-blue-600 font-bold' : ''
          }`}
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default SingleComment;
