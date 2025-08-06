import { useEffect, useState } from "react";
import { navLinks } from "../../constants/navlinks";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Nav = () => {
  const [navBg, setNavBg] = useState(true);

  const navigate = useNavigate();

  const userRole = JSON.parse(localStorage.getItem("user") || "{}")?.role;

  useEffect(() => {
    const navBgHandler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      else setNavBg(false);
    };

    window.addEventListener("scroll", navBgHandler);
    return () => window.removeEventListener("scroll", navBgHandler);
  }, []);

  const filteredLinks = navLinks.filter((link) =>
    link.roles.includes(userRole)
  );

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <div
      className={`${
        navBg ? "shadow-md bg-blue-950" : "fixed"
      } transition-all duration-200 h-[12vh] z-[1000] fixed w-full`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-28 bg-rose-500 rounded-full flex items-center justify-center flex-col">
            <h1 className="text-red-300">Cursos Ale</h1>
          </div>
        </div>
        <nav className="flex space-x-6 text-white font-semibold text-sm">
          {filteredLinks.map(({ id, url, label }) => (
            <a
              key={id}
              href={url}
              className="hover:text-rose-400 transition-colors"
            >
              {label}
            </a>
          ))}
          {userRole !== null && (
            <button onClick={handleLogout}>
              <MdLogout />
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Nav;
