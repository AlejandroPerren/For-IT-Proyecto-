import { useState } from "react";
import type { Section } from "../../interface/section.interface";
import type { Lesson } from "../../interface/lesson.interface";
import { PlayCircle, FileText } from "lucide-react"; 

type NavCourseProps = {
  sections: Section[];
  lessons: Record<string, Lesson[]>;
  onSelectLesson: (lesson: Lesson) => void;
  enrollment: { status: string; progress: number };
};

const NavCourse: React.FC<NavCourseProps> = ({
  sections,
  lessons,
  onSelectLesson,
  enrollment,
}) => {
  const [openSectionId, setOpenSectionId] = useState<number | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  const toggleSection = (id: number) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLessonId(lesson.id);
    onSelectLesson(lesson);
  };

  return (
    <div className="h-full w-full flex flex-col p-4 overflow-y-auto space-y-4 bg-gray-50">
      
      <div className="bg-blue-50 p-3 rounded-lg shadow">
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${enrollment.progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Progreso: {enrollment.progress}%
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="bg-white rounded-lg shadow">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full text-left font-bold text-lg p-3 border-b flex justify-between items-center hover:bg-gray-100"
          >
            {section.title}
            <span>{openSectionId === section.id ? "▲" : "▼"}</span>
          </button>

          {openSectionId === section.id && (
            <ul className="p-3 space-y-2">
              {(lessons[section.id] || []).map((lesson) => {
                const isSelected = lesson.id === selectedLessonId;
                const hasVideo = lesson.videoUrl && lesson.videoUrl.trim() !== "";
                return (
                  <li key={lesson.id}>
                    <button
                      onClick={() => handleLessonClick(lesson)}
                      className={`flex items-center gap-2 w-full text-left p-2 rounded-lg transition-colors ${
                        isSelected
                          ? "bg-blue-100 text-blue-800 font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {hasVideo ? (
                        <PlayCircle className="w-5 h-5 text-blue-500" />
                      ) : (
                        <FileText className="w-5 h-5 text-green-500" />
                      )}
                      {lesson.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavCourse