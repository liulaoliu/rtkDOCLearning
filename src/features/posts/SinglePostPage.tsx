//"/features/posts/SinglePostPage"
import React from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../app/hooks";

const SinglePostPage = ({}) => {
  // The useParams hook returns an object of key/value pairs of the dynamic params from
  // the current URL that were matched by the <Route path>.
  // Child routes inherit all params from their parent routes.
  const { postId } = useParams();

  const post = useAppSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  if (!post) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  );
};

export default SinglePostPage;
