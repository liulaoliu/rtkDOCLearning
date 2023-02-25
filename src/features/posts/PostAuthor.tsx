//这是注释，显示文件路径捏:/src/features/posts/PostAuthor.tsx
import React from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../app/hooks";

interface Props {
  userId: string;
}

export const PostAuthor = ({ userId }: Props) => {
  const author = useAppSelector((state) =>
    state.users.find((user) => user.id === userId)
  );

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
