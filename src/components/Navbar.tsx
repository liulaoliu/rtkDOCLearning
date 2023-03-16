//这是注释，显示文件路径捏:/src/components/Navbar.tsx
import React from "react";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchNotifications,
  selectAllNotifications,
} from "../features/notifications/notificationSlice";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications);
  const numUnreadNotifications = notifications.filter((n) => !n.read).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  let unreadNotificationsBadge;
  //只是读取notification的read属性并进行一些判断
  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    );
  }
  return (
    <nav>
      <section>
        <h1>Redux 基础教程示例</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">文章列表</Link>
            <Link to="/users">用户列表</Link>
            <Link to="/notifications">动态 {unreadNotificationsBadge}</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            刷了个新 动态
          </button>
        </div>
      </section>
    </nav>
  );
};
