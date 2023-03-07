//这是注释，显示文件路径捏:/src/features/posts/PostList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { PostAuthor } from "./PostAuthor";
import { selectAllPosts } from "./postsSlice";
import { ReactionButtons } from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);
  // 根据日期时间对文章进行倒序排序
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.user} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      {/* 这个div就是一个简单的分隔符捏! */}
      <div> ____</div>
      <Link to={`/editPost/${post.id}`} className="button">
        Edit Post
      </Link>

      <TimeAgo timestamp={post.date}></TimeAgo>
      <ReactionButtons post={post}></ReactionButtons>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
export default PostsList;
