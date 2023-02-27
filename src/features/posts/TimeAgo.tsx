//这是注释，显示文件路径捏:/src/features/posts/TimeAgo.tsx
import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
interface Prop {
  timestamp: string;
}
export const TimeAgo = ({ timestamp }: Prop) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
