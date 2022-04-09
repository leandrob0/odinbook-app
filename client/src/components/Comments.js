import CreateComment from './CreateComment';

const Comments = ({ comments }) => {
  return (
    <section className="w-full mt-4">
      <div className="border-t w-full flex flex-col items-center justify-center pt-4">
        {comments.length > 0 ? (
          <p>single comment component</p>
        ) : (
          <p>There are no comments :(</p>
        )}
      </div>
      <CreateComment />
    </section>
  );
};

export default Comments;
