import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AddPostForm } from "./features/posts/AddPostForm";
import { EditPostForm } from "./features/posts/EdigPostForm";

import PostList from "./features/posts/PostList";
import SinglePostPage from "./features/posts/SinglePostPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <AddPostForm></AddPostForm>
                <PostList />
              </div>
            }
          />
          <Route
            path="/posts/:postId"
            element={<SinglePostPage></SinglePostPage>}
          ></Route>
          <Route
            path="/editPost/:postId"
            element={<EditPostForm></EditPostForm>}
          ></Route>
          <Route path="*" element={<div>This is nowhere</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
