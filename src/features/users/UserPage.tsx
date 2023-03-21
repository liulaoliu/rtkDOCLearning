//这是注释，显示文件路径捏:/src/features/users/UserPage.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { selectUserById } from "../users/usersSlice";
import { selectAllPosts } from "../posts/postsSlice";
import { useAppSelector } from "../../app/hooks";
import { createSelector } from "@reduxjs/toolkit";

export const UserPage = ({}) => {
  const { userId } = useParams();

  const user = useAppSelector((state) => selectUserById(state, userId));
  //这里使用的是旧的selector
  // const postsForUser = useAppSelector((state) => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post) => post.user === userId);
  // });
  const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter((post) => post.user === userId)
  );
  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, userId)
  );

  const postTitles = postsForUser.map((post) => (
    <li key={post.id + Math.random().toString()}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h6
        style={{
          color: "skyblue",
        }}
      >
        这是UserPage 组件捏！
      </h6>
      <h2>{user?.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};
