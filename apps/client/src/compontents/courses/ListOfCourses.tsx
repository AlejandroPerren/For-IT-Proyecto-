import { useEffect, useState } from "react";
import { listOfCourses } from "../../network/fetch/Courses";
import { toast } from "react-toastify";
import type { Course } from "../../interface/course.interface";
import { useNavigate } from "react-router-dom";

const ListOfCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const navigate = useNavigate();

  const goToCourse = (course: Course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    navigate("/course");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await listOfCourses();
        setCourses(data);
      } catch (error) {
        console.log(error);
        toast.error("Algo Salio Mal", {
          position: "top-right",
        });
      }
    };
    fetchCourses();
  }, []);

  const imSubscribed = true;

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
    </div>
  );
};

export default ListOfCourses;
