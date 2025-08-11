import NavCourse from "../compontents/courses/NavCurse";
import { useEffect, useState } from "react";
import LessonContent from "../compontents/courses/VideoPlayer";
import type { Lesson } from "../interface/lesson.interface";

const CoursePage = () => {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const savedLesson = localStorage.getItem("lessonSelected");

    if (savedLesson) {
      setCurrentLesson(JSON.parse(savedLesson));
    } else {
      const lessons: Lesson[] = JSON.parse(localStorage.getItem("lessons") || "[]");
      const firstAvailable = lessons.find((l) => l.videoUrl || l.textContent);
      if (firstAvailable) setCurrentLesson(firstAvailable);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
      <div className="col-span-1 border-r border-gray-300">
        <NavCourse onSelectLesson={(lesson) => {
          localStorage.setItem("lessonSelected", JSON.stringify(lesson));
          setCurrentLesson(lesson);
        }} />
      </div>

      <div className="col-span-3 flex items-center justify-center p-4">
        {currentLesson ? (
          <LessonContent
            videoUrl={currentLesson.videoUrl}
            textContent={currentLesson.textContent}
          />
        ) : (
          <p>Cargando lección...</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
