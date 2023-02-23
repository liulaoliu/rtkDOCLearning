import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AddPostForm } from "./features/posts/AddPostForm";

import PostList from "./features/posts/PostList";

function App() {
  return (
    <Router>
      <div className="App">
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
          <Route path="*" element={<div>This is nowhere</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
