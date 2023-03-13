//这是注释，显示文件路径捏:/src/features/users/usersSlice.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";

interface IState {
  users: IUser[];
  status: "idle" | "pending" | "success" | "failed";
  error: null | any;
}
type IUser = {
  id: string;
  name: string;
};
const initialState: IState = {
  status: "idle",
  error: null,
  users: [],
};

export const fetchUsers = createAsyncThunk("users/fecthUsers", async () => {
  const response = await client.get("/fakeApi/users");
  return response.data;
});
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(action.payload);

      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
