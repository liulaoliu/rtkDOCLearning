//这是注释，显示文件路径捏:/src/components/Navbar.tsx
import React from "react";

import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux 基础教程示例</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">文章列表</Link>
            <Link to="/users">用户列表</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
