import { useEffect, useState } from "react";
import { navLinks } from "../../constants/navlinks";

const Nav = () => {
  const [navBg, setNavBg] = useState(true);

  
  const userRole = "user"; 

  useEffect(() => {
    const navBgHandler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      else setNavBg(false);
    };

    window.addEventListener("scroll", navBgHandler);
    return () => window.removeEventListener("scroll", navBgHandler);
  }, []);

  const filteredLinks = navLinks.filter(link => link.roles.includes(userRole));

  return (
    <div
      className={`${
        navBg ? "shadow-md bg-blue-950" : "fixed"
      } transition-all duration-200 h-[12vh] z-[1000] fixed w-full`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 bg-rose-500 rounded-full flex items-center justify-center flex-col">
            <h1 className="text-red-300">Hola</h1>
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
        </nav>
      </div>
    </div>
  );
};

export default Nav;
