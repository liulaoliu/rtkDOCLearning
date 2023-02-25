//这是注释，显示文件路径捏:/src/features/posts/PostList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const PostsList = () => {
  const posts = useAppSelector((state) => state.posts);

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      {/* 这个div就是一个简单的分隔符捏! */}
      <div> ____</div>
      <Link to={`/editPost/${post.id}`} className="button">
        Edit Post
      </Link>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
//好嘞
export default PostsList;
