import { navLinks } from "../../constants/navlinks";

const NavCourse = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center space-y-6 p-6 overflow-y-auto">
      {navLinks.map((link) => (
        <a href={link.url} key={link.id}>
          <p className="text-black font-semibold text-lg md:text-2xl border-b border-black pb-1">
            {link.label}
          </p>
        </a>
      ))}
    </div>
  );
};

export default NavCourse;
