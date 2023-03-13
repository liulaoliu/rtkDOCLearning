//这是注释，显示文件路径捏:/src/features/posts/postsSlice.ts

import { RootState } from "./../../app/store";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const postsInitialState = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    user: "0",
    //意思就是这篇文章的创建时间是渲染时间10分钟之前（强制写的，为了示范)
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    user: "1",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];
const initialState = {
  posts: postsInitialState,
  status: "idle",
  error: null,
};
export type Treactions = typeof initialState["posts"][number]["reactions"];
export type IPost = {
  id: string;
  content: string;
  title: string;
  //类型见usersSlice里边的内容捏
  user: string;
  //注意这里也新增了date，我试验了一下，他对ui中dispatch action没任何影响，
  //但它可以直接约束reducer的prepare中payload的构建
  //我想了一下，prepare的形参就是dispatch action时候，actionCreator的形参
  // 但是prepare内部预构建了id/date，所以这样看逻辑也很通，但是具体Typescript怎么做的，我实在不知道。
  date: string;
  reactions: Treactions;
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  //记住吖，处理数据就是reducer的责任捏！
  //同步的数据处理就全在这里呢！
  reducers: {
    postAdd: {
      reducer: (state, action: PayloadAction<IPost>) => {
        state.posts.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      } else {
        // 好歹报个错吧
        console.log("花Q,你在干啥？");
      }
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        // https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
        existingPost.reactions[reaction as keyof Treactions]++;
      }
    },
    //end

    //如果你想给UI加上交互式的 排序。。。就得这么做，但是文档没介绍，我们先注释掉。。
    // postSort: (state) => {
    //   state.sort((a, b) => b.date.localeCompare(a.date));
    // },
  },
});

export const { postAdd, postUpdated, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string | undefined) =>
  state.posts.posts.find((post) => post.id === postId);
export default postsSlice.reducer;
