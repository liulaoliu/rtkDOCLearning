//这是注释，显示文件路径捏:/src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { worker } from "./api/server";
import { client } from "./api/client";
// import "./indexcopy.css";
const container = document.getElementById("root")!;
const root = createRoot(container);

worker.start({ onUnhandledRequest: "bypass" });

async function getPosts() {
  const result = await client.get("http://localhost:3000/fakeApi/posts");
  console.log(result.data);

  return result;
}

getPosts();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
