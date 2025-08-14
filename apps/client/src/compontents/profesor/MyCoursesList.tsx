import { useEffect, useState } from "react";
import type { Course } from "../../interface/course.interface";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { myListCourses } from "../../network/fetch/ProfCourses";
import CourseUsersModal from "./utils/UsersModal";
import { getAllDataOfCourse } from "../../network/fetch/Courses";

const MyCoursesList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const navigate = useNavigate();

  const goToCourse = async (course: Course) => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        toast.error("Debes iniciar sesión para acceder al curso");
        return;
      }
      const { id: userId } = JSON.parse(userString);
      const courseData = await getAllDataOfCourse(course.id, userId);
      localStorage.setItem("selectedCourse", JSON.stringify(courseData));
      navigate("/course");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar el curso");
    }
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

  return (
    <>
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
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => goToCourse(course)}
                className="bg-gray-500 cursor-pointer shadow-2xl text-white border-2 rounded-2xl p-2"
              >
                Ir al curso
              </button>

              <button
                onClick={() => setSelectedCourseId(course.id)}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 shadow-2xl text-white border-2 rounded-2xl p-2"
              >
                Ver usuarios
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={goToCreateCourse}
          className="bg-rose-500 cursor-pointer hover:bg-red-800 mt-2 shadow-2xl text-white border-2 rounded-2xl p-2"
        >
          Crea Uno
        </button>
      </div>

      {selectedCourseId && (
        <CourseUsersModal
          courseId={selectedCourseId}
          onClose={() => setSelectedCourseId(null)}
        />
      )}
    </>
  );
};

export default MyCoursesList;
