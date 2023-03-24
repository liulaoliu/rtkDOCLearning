//这是注释，显示文件路径捏:/src/features/posts/PostList.tsx

import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import {
  selectAllPosts,
  fetchPosts,
  IPost,
  selectPostIdList,
  selectPostById,
} from "./postsSlice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import React, { useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";

let PostExcerpt = ({ id }: { id: string }) => {
  const post = useAppSelector((state) => selectPostById(state, id));
  if (post === undefined) {
    return <div>不存在</div>;
  }
  return (
    <article className="post-excerpt" key={id}>
      <h6
        style={{
          color: "skyblue",
        }}
      >
        这是PostExcerpt组件捏
      </h6>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export const PostList = () => {
  const cached = React.useRef(false);
  const dispatch = useAppDispatch();
  // const posts = useAppSelector(selectAllPosts);

  
  const selectIds = createSelector([selectPostIdList], (idList) => {
    return idList;
  });
  const postIdList = useAppSelector(selectIds, (pre, next) => {
    return pre.toString() === next.toString();
  });

  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle" && cached.current === false) {
      cached.current = true;
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "pending") {
    content = <div>正在加载捏！</div>;
  } else if (postStatus === "success") {
    // Sort posts in reverse chronological order by datetime string
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));

    content = postIdList.map((id) => <PostExcerpt key={id} id={id} />);
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-list">
      <h6
        style={{
          color: "skyblue",
        }}
      >
        这是PostList捏
      </h6>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostList;
