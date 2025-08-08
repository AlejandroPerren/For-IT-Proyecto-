import { useEffect, useState } from "react";
import { listOfCoursesWhitIdUser } from "../../network/fetch/Courses";
import { toast } from "react-toastify";
import type { Course } from "../../interface/course.interface";
import { useNavigate } from "react-router-dom";
import { loadFullCourseData } from "../../utils/LoadCourseData";

const ListOfMyCourseStuding = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const navigate = useNavigate();

  const goToCourse = (course: Course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    loadFullCourseData();
    navigate("/course");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (userString) {
          const { id } = JSON.parse(userString);
          const data = await listOfCoursesWhitIdUser(id);
          const enrolledCourses = data.filter(
            (course: Course) => course.isEnrolled
          );
          setCourses(enrolledCourses);
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
            <button
              onClick={() => goToCourse(course)}
              className="bg-gray-500 cursor-pointer mt-2 shadow-2xl text-white border-2 rounded-2xl p-2"
            >
              ir Al curso
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOfMyCourseStuding;
