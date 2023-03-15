//这是注释，显示文件路径捏:/src/features/notifications/notificationSlice.tsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "../../api/client";
import { RootState } from "../../app/store";

export const fetchNotifications = createAsyncThunk<
  // Return type of the payload creator
  any,
  // First argument to the payload creator
  () => void,
  // Optional fields for defining thunkApi field types
  { state: RootState }
>("notifications/fetchNotifications", async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState());
  const [latestNotification] = allNotifications;
  const latestTimestamp = latestNotification ? latestNotification.date : "";
  const response = await client.get(
    `/fakeApi/notifications?since=${latestTimestamp}`
  );
  return response.data;
});
//这里我还不知道notification的具体类型，先放个空的在这占位置
interface IState {}
let initialState: any[] = [];
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload);
      // 以最新的优先排序
      state.sort((a, b) => b.date.localeCompare(a.date));
    });
  },
});

export default notificationsSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications;
