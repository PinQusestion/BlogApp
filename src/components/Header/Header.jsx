import React from "react";
import { Container, LogoutBtn, Icon} from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Header() {
  const authStatus = useSelector((state) => state.auth?.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: "Home"
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: "LogIn"
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: "LogIn"
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: "FileText"
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus,
      icon: "Plus"
    },
  ];

  return (
    <header className="top-0 fixed left-0 w-full z-50 py-4 shadow bg-[#1d293b] text-white">
      <Container>
        <nav className="flex text-center">
          {authStatus ? (
            <div className="text-2xl text-[#706df9] mt-1 font-bold">BlogSpace</div>
          ) : (
            <div className="text-2xl text-[#706df9]">
              BlogSpace
            </div>
          )}

          <ul className="flex ml-auto items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-flex items-center px-6 py-1.5 duration-200 hover:text-cyan-400 rounded-full gap-1.5"
                    >
                      <Icon icon={item.icon} className="group-hover:stroke-cyan-400 active:stroke-cyan-400"/>
                      {item.name}
                    </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
