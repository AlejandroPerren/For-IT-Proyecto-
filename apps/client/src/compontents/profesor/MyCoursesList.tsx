import { useEffect, useState } from "react";
import type { Course } from "../../interface/course.interface";
import { useNavigate } from "react-router-dom";
import { loadFullCourseData } from "../../utils/LoadCourseData";
import { toast } from "react-toastify";
import { myListCourses } from "../../network/fetch/ProfCourses";

const MyCoursesList = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const navigate = useNavigate();

  const goToCourse = (course: Course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    loadFullCourseData();
    navigate("/course");
  };

  const goToCreateCourse = () => {
    navigate("/crearCurso");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          console.log("falta ID");
          return;
        }
        const { id } = JSON.parse(userString);
        const data = await myListCourses(id);
        setCourses(data);
      } catch (error) {
        console.log(error);
        toast.error("Algo Salió Mal", {
          position: "top-right",
        });
      }
    };

    fetchCourses();
  }, []);

  const imSubscribed = true;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.length === 0 && (
        <h2 className="text-black text-3xl">No Tienes Cursos</h2>
      )}
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {course.title}
          </h2>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <span className="text-sm text-gray-500">
            Creado por: {course.createdBy}
          </span>
          <div>
            {imSubscribed ? (
              <button
                onClick={() => goToCourse(course)}
                className="bg-gray-500 cursor-pointer mt-2 shadow-2xl text-white border-2 rounded-2xl p-2"
              >
                ir Al curso
              </button>
            ) : (
              <button className="bg-rose-500 cursor-pointer hover:bg-red-800  mt-2 shadow-2xl text-white border-2 rounded-2xl p-2">
                Inscribirme
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        onClick={goToCreateCourse}
        className="bg-rose-500 cursor-pointer hover:bg-red-800  mt-2 shadow-2xl text-white border-2 rounded-2xl p-2"
      >
        Crea Uno
      </button>
    </div>
  );
};

export default MyCoursesList;
