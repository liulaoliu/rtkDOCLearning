//这是注释，显示文件路径捏:/src/features/users/UserPage.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { selectUserById } from "../users/usersSlice";
import { selectAllPosts } from "../posts/postsSlice";
import { useAppSelector } from "../../app/hooks";

export const UserPage = ({}) => {
  const { userId } = useParams();

  const user = useAppSelector((state) => selectUserById(state, userId));

  const postsForUser = useAppSelector((state) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter((post) => post.user === userId);
  });

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};
