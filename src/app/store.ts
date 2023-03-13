//这是注释，显示文件路径捏:/src/app/store.ts
import { incrementAsync } from "./../features/counter/counterSlice";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { increment } from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import counterReducer from "../features/counter/counterSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});

const exampleThunkFunction = (dispatch: any, getState: any) => {
  const stateBefore = getState();
  console.log(`Counter before: ${stateBefore.counter.value}`);

  dispatch(increment());
  const stateAfter = getState();
  console.log(`Counter after: ${stateAfter.counter.value}`);
};

store.dispatch(exampleThunkFunction);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
