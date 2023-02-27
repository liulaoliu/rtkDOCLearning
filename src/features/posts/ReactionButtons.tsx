//这是注释，显示文件路径捏:/src/features/posts/ReactionButtons.tsx
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { IPost, reactionAdded, Treactions } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

interface Props {
  post: IPost;
}
export const ReactionButtons = ({ post }: Props) => {
  const dispatch = useAppDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => {
          dispatch(reactionAdded({ postId: post.id, reaction: name }));
        }}
      >
        {emoji} {post.reactions[name as keyof Treactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
