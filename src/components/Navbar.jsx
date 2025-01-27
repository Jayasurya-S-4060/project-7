import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navLinks = useMemo(
    () => [
      { name: "Home", href: "/" },
      // { name: "Movies", href: "/search" },
    ],
    []
  );

  return (
    <div className="flex justify-between px-8 py-6 absolute z-10 w-full pt-4 md:px-36 items-center">
      <div>
        <img src="/public/imdb.svg" alt="Icon" className="w-14 100%" />
      </div>
      <div className="flex gap-4">
        {navLinks.map((link, key) => (
          <NavLink key={key} to={link.href}>
            <div className="bg-[#292524] px-2 py-1 rounded-md">{link.name}</div>
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
      <div className="bg-[#292524] px-2 py-1 rounded-md">
        <UserOutlined />
      </div>
    </div>
  );
};

export default Navbar;
