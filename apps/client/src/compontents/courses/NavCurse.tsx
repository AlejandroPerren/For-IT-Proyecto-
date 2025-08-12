import { useState, useEffect } from "react";
import type { Section } from "../../interface/section.interface";
import type { Lesson } from "../../interface/lesson.interface";

type NavCourseProps = {
  onSelectLesson: (lesson: Lesson) => void;
};

const NavCourse: React.FC<NavCourseProps> = ({ onSelectLesson }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [openSectionId, setOpenSectionId] = useState<number | null>(null);

  useEffect(() => {
    setSections(JSON.parse(localStorage.getItem("sections") || "[]"));
    setLessons(JSON.parse(localStorage.getItem("lessons") || "[]"));
  }, []);

  const toggleSection = (id: number) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  const handleLessonClick = (lesson: Lesson) => {
    localStorage.setItem("lessonSelected", JSON.stringify(lesson));
    onSelectLesson(lesson);
  };

  return (
    <div className="h-full w-full flex flex-col p-6 overflow-y-auto space-y-4">
      {sections.map((section) => (
        <div key={section.id}>
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full text-left font-bold text-xl border-b pb-1"
          >
            {section.title}
          </button>

          {openSectionId === section.id && (
            <ul className="pl-4 pt-2 space-y-2">
              {lessons
                .filter((lesson) => lesson.sectionId === section.id)
                .map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      onClick={() => handleLessonClick(lesson)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {lesson.title}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavCourse;
