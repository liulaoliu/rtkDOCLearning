//这是注释，显示文件路径捏:/src/components/Navbar.tsx
import React from "react";

import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchNotifications } from "../features/notifications/notificationSlice";

export const Navbar = () => {
  const dispatch = useAppDispatch();

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };
  return (
    <nav>
      <section>
        <h1>Redux 基础教程示例</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">文章列表</Link>
            <Link to="/users">用户列表</Link>
            <Link to="/notifications">动态</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            刷了个新 动态
          </button>
        </div>
      </section>
    </nav>
  );
};
