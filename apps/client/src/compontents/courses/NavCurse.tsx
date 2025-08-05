import { navLinks } from "../../constants/navlinks";

const NavCourse = () => {
  return (
    <div className="fixed left-0 top-30 h-full w-[60%] sm:w-[40%] border-r-[1.5px]  flex flex-col justify-center-safe space-y-6 z-[1050] overflow-hidden">
      {navLinks.map((link) => (
        <a href={link.url} key={link.id}>
          <p className="text-black w-fit font-semibold text-[20px] ml-12 border-b-[1.5px] pb-1 border-black sm:text-[30px]">
            {link.label}
          </p>
        </a>
      ))}
    </div>
  );
};

export default NavCourse;
