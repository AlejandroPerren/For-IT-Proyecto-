import { useEffect, useState } from "react";
import {
  getAllDataOfCourse,
  listOfCourses,
  listOfCoursesWhitIdUser,
} from "../../network/fetch/Courses";
import { toast } from "react-toastify";
import type { Course } from "../../interface/course.interface";
import { useNavigate } from "react-router-dom";
import { createEnrollment } from "../../network/fetch/Enrollment";

const ListOfCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

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

  const handleSubscribe = async (idCourse: number) => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      console.log("falta ID");
      return;
    }
    try {
      const { id } = JSON.parse(userString);
      await createEnrollment(id, idCourse);
      toast.success("inscripcion Enviada", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast.error("Algo Salio Mal", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          const data = await listOfCourses();
          setCourses(data);
        } else {
          const { id } = JSON.parse(userString);
          const data = await listOfCoursesWhitIdUser(id);
          setCourses(data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Algo Salio Mal", {
          position: "top-right",
        });
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            {course.isEnrolled ? (
              <button
                onClick={() => goToCourse(course)}
                className="bg-gray-500 cursor-pointer mt-2 shadow-2xl text-white border-2 rounded-2xl p-2"
              >
                ir Al curso
              </button>
            ) : (
              <button
                onClick={() => handleSubscribe(course.id)}
                className="bg-rose-500 cursor-pointer hover:bg-red-800  mt-2 shadow-2xl text-white border-2 rounded-2xl p-2"
              >
                Inscribirme
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOfCourses;
