//这是注释，显示文件路径捏:/src/features/posts/postsSlice.ts
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!", user: "0" },
  { id: "2", title: "Second Post", content: "More text", user: "1" },
];
type postAction = {
  id: string;
  content: string;
  title: string;
  //类型见usersSlice里边的内容捏
  user: string;
};
// 这里直接复制文档内容捏
//天了噜，我没复制捏，稍后我会补充的，哭哭

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  //记住吖，处理数据就是reducer的责任捏！
  //同步的数据处理就全在这里呢！
  reducers: {
    postAdd: {
      reducer: (state, action: PayloadAction<postAction>) => {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
          },
        };
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      } else {
        // 好歹报个错吧
        console.log("花Q,你在干啥？");
      }
    },
    //end
  },
});

//好辣，现在 slice完毕了
//我们要去store里引入reducer呢
//不要忘记把createSlice自动生成的action导出呢！
export const { postAdd, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;
