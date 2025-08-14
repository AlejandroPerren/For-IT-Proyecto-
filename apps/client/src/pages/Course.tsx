import NavCourse from "../compontents/courses/NavCurse";
import { useEffect, useState } from "react";
import LessonContent from "../compontents/courses/VideoPlayer";
import type { Lesson } from "../interface/lesson.interface";
import type { CourseFullData } from "../types/allCourseData.types";

const CoursePage = () => {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [courseData, setCourseData] = useState<CourseFullData | null>(null);

  useEffect(() => {
    const savedCourse = localStorage.getItem("selectedCourse");
    if (!savedCourse) return;

    const parsed: CourseFullData = JSON.parse(savedCourse);
    setCourseData(parsed);

    const savedLesson = localStorage.getItem("lessonSelected");
    if (savedLesson) {
      setCurrentLesson(JSON.parse(savedLesson));
    } else {
      const allLessons = Object.values(parsed.lessons).flat();
      const firstAvailable = allLessons.find(
        (l) =>
          (l.videoUrl && l.videoUrl.trim() !== "") ||
          (l.textContent && l.textContent.trim() !== "")
      );
      if (firstAvailable) setCurrentLesson(firstAvailable);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
      <div className="col-span-1 border-r border-gray-300">
        {courseData && (
          <NavCourse
            sections={courseData.sections}
            lessons={courseData.lessons}
            enrollment={courseData.enrollment}
            onSelectLesson={(lesson) => {
              localStorage.setItem("lessonSelected", JSON.stringify(lesson));
              setCurrentLesson(lesson);
            }}
          />
        )}
      </div>

      <div className="col-span-3 flex items-center justify-center p-4">
        {currentLesson ? (
          <LessonContent
            videoUrl={currentLesson?.videoUrl}
            textContent={currentLesson?.textContent}
            quiz={(courseData?.quizzes?.[currentLesson?.id ?? 0] || []).map(
              (q) => ({
                id: q.id,
                question: q.question,
                options: Object.values(q.options),
                answer: q.correctAnswer, 
              })
            )}
          />
        ) : (
          <p className="text-gray-500">Selecciona una lección para comenzar</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
