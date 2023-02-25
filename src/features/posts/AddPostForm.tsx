//这是注释，显示文件路径捏:/src/features/posts/AddPostForm.tsx
import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postAdd } from "./postsSlice";
export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //不要忘记用类型修饰过的useAppDispatch呢！
  const dispatch = useAppDispatch();
  //新增的用于存储 select中选择的的userId （是从state.users里边选的)
  const [userId, setUserId] = useState("");
  // 具体userId， 对吧，是从state.users里边拿的，（用<select>显示
  const users = useAppSelector((state) => state.users);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);
  //强制要求，必须填写文章标题、内容和用户的id才能 存储这条post
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  //这是个 option 组件啊，造出来一个下拉菜单的效果
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
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
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
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
            dispatch(postAdd(title, content, userId));
          }}
          disabled={!canSave}
        >
          保存文章
        </button>
      </form>
    </section>
  );
};
// 就这样，再见捏！
