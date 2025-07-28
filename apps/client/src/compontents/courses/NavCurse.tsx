import { navLinks } from "../../constants/navlinks";

const NavCourse = () => {
  return (
    <div
      className="fixed left-0 top-0 h-full w-[40%] sm:w-[30%] bg-rose-900 text-white flex flex-col justify-center space-y-6 z-[1050] overflow-hidden"
    >
      {navLinks.map((link) => (
        <a href={link.url} key={link.id}>
          <p className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]">
            {link.label}
          </p>
        </a>
      ))}
    </div>
  );
};

export default NavCourse;
