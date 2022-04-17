import useWindowDimensions from '../hooks/useWindowDimensions';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { likePost } from '../services/posts';
import { updatePost } from '../features/post';
import { checkIfLiked } from '../helpers/checkIfLiked';

import Comments from './Comments';

function SinglePost({ author, post }) {
  const loggedUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  const [liked, setLiked] = useState(checkIfLiked(post.likes, loggedUser.id));
  const [amountLikes, setAmountLikes] = useState(post.likes.length);
  const [amountComments, setAmountComments] = useState(post.comments.length);
  const [showComments, setShowComments] = useState(false);

  const likePressed = async (e) => {
    e.stopPropagation();

    const result = await likePost(
      JSON.parse(localStorage.getItem('token')),
      post._id
    );
    dispatch(updatePost(result));
  };

  return (
    <article
      className={`${
        width <= 700 ? 'w-full' : 'w-1/2'
      } flex flex-col items-start m-4 bg-white rounded p-4`}
    >
      <div className="flex justify-center items-center">
        <a className="hover:cursor-pointer" href={'/#/profile/' + author._id}>
          <img
            src={author.profile_pic}
            alt="author"
            className="h-10 w-10 rounded-full"
          />
        </a>
        <div className="flex flex-col items-center p-2">
          <p>{author.first_name + ' ' + author.last_name}</p>
          <p className="text-xs text-gray-500">{post.createdAt}</p>
        </div>
      </div>
      <div>
        <p className="text-base">{post.text}</p>
      </div>
      {post.attached_image && (
        <div className="py-4">
          <img
            className="w-full aspect-video"
            src={'/' + post.attached_image}
            alt="post content"
          />
        </div>
      )}
      <div className="flex justify-between w-full text-xs text-gray-600 py-2 border-b border-b-gray-300">
        <p>{amountLikes} Likes</p>
        <p
          onClick={() => setShowComments(!showComments)}
          className="hover:cursor-pointer"
        >
          {amountComments} Comments
        </p>
      </div>
      <div className="flex justify-around w-full text-gray-800 font-medium pt-4">
        <p
          onClick={(e) => {
            likePressed(e);
            setLiked(!liked);
            setAmountLikes(!liked ? amountLikes + 1 : amountLikes - 1);
          }}
          className={`hover:scale-110 hover:cursor-pointer transition ${
            liked ? 'text-blue-600 font-bold' : ''
          }`}
        >
          Like
        </p>
        <p
          onClick={() => setShowComments(!showComments)}
          className="hover:scale-110 hover:cursor-pointer transition"
        >
          Comment
        </p>
      </div>
      {showComments && (
        <Comments
          postId={post._id}
          comments={post.comments}
          amountComments={amountComments}
          setAmountComments={setAmountComments}
        />
      )}
    </article>
  );
}

export default SinglePost;
