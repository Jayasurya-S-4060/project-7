import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const navLinks = useMemo(
    () => [
      { name: "Home", href: "/" },
      { name: "Movies", href: "/search" },
    ],
    []
  );

  return (
    <div className="flex justify-between px-8 py-6 absolute z-10 w-full mt-4">
      <div>
        <img src="/src/assets/imdb.svg" alt="" />
      </div>
      <div className="flex gap-4">
        {navLinks.map((link, key) => (
          <NavLink key={key} to={link.href}>
            {link.name}
          </NavLink>
        ))}
      </div>
      {/* <div>
        <Input
          className="bg-inherit text-white custom-placeholder"
          type="text"
          placeholder="Search"
          onClick={() => navigate("/")}
          suffix={<SearchOutlined style={{ color: "white" }} />}
          style={{ color: "white", backgroundColor: "inherit" }}
        />
      </div> */}
      <UserOutlined />
    </div>
  );
};

export default Navbar;
