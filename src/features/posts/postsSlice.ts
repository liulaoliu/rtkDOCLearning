import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

// 这里直接复制文档内容捏
//天了噜，我没复制捏，稍后我会补充的，哭哭

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  //记住吖，处理数据就是reducer的责任捏！
  //同步的数据处理就全在这里呢！
  reducers: {
    postAdd: (state, action) => {
      state.push(action.payload);
    },
  },
});

//好辣，现在 slice完毕了
//我们要去store里引入reducer呢
//不要忘记把createSlice自动生成的action导出呢！
export const { postAdd } = postsSlice.actions;

export default postsSlice.reducer;
