//这是注释，显示文件路径捏:/src/features/notifications/NotificationList.tsx
import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

import { selectAllUsers } from "../users/usersSlice";

import {
  selectAllNotifications,
  allNotificationsRead,
} from "./notificationSlice";
import classnames from "classnames";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
export const NotificationsList = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications);
  const users = useAppSelector(selectAllUsers);
  //在下次渲染之前 read 所有已有的notification呢！
  React.useLayoutEffect(() => {
    dispatch(allNotificationsRead());
  });

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user) => user.id === notification.user) || {
      name: "Unknown User",
    };
    const shouldBeNew = notification.isNew ===undefined
    const notificationClassname = classnames("notification", {
      new: shouldBeNew,
    });
    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};
