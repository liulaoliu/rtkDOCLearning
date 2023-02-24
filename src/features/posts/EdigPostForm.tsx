// features/posts/EditPostForm.tsx
import React, { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { postUpdated } from "./postsSlice";
//这个就是个无奈的绕过，理论上useAppSelector有可能返回undefined,
//下面两行对undefined还挺敏感的。
//const [title, setTitle] = useState(post.title);
//const [content, setContent] = useState(post.content);
function initializeUndefinedPostWhenErrorHappensHelper(
  post:
    | {
        id: string;
        content: string;
        title: string;
      }
    | undefined
) {
  let undefinedPost = {
    id: "not able to fetch post",
    content: "not able to fetch post",
    title: "not able to fetch post",
  };
  if (post === undefined) {
    post = undefinedPost;
    return post;
  } else {
    return post;
  }
}
export const EditPostForm = () => {
  const { postId } = useParams();

  let post = initializeUndefinedPostWhenErrorHappensHelper(
    useAppSelector((state) => state.posts.find((post) => post.id === postId))
  );

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useAppDispatch();
  const GOTO = useNavigate();
  //  这两个any无所谓捏，因为人家一般都会写内联函数的捏。
  const onTitleChanged = (e: any) => setTitle(e.target.value);
  const onContentChanged = (e: any) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      GOTO(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>编辑文章</h2>
      <form>
        <label htmlFor="postTitle">文章标题：</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        保存文章
      </button>
    </section>
  );
};
