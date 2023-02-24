//features/posts/AddPostForm.tsx
import React, { useState } from "react";
//这是一个 用于添加文章标题和文章内容的表单呢！
// 嗯，现在也没啥好说的，我们直接把他添加到App当中就行了
//很明显，这里就是用 dispatch 去触发一个包含有文章标题和内容的action 就行！

import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import { postAdd } from "./postsSlice";
export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //不要忘记用类型修饰过的useAppDispatch呢！
  const dispatch = useAppDispatch();

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  return (
    <section>
      <h2>添加新文章</h2>
      <form>
        <label htmlFor="postTitle">文章标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
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
        <button
          type="button"
          onClick={() => {
            //貌似不用写type呢，太好了噜
            dispatch(postAdd(title, content));
          }}
        >
          保存文章
        </button>
      </form>
    </section>
  );
};
// 就这样，再见捏！
