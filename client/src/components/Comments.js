import { useState } from 'react';

import CreateComment from './CreateComment';
import SingleComment from './SingleComment';

const Comments = ({ postId, comments, amountComments, setAmountComments }) => {
  const [allComments, setAllComments] = useState(comments);

  return (
    <section className="w-full mt-4">
      <div className="border-t w-full flex flex-col gap-4 items-center justify-center pt-4">
        {allComments.length > 0 ? (
          allComments.map((comment) => {
            return <SingleComment key={comment._id} comment={comment}/>;
          })
        ) : (
          <p>There are no comments :(</p>
        )}
      </div>
      <CreateComment
        postId={postId}
        setAllComments={setAllComments}
        amountComments={amountComments}
        setAmountComments={setAmountComments}
      />
    </section>
  );
};

export default Comments;
