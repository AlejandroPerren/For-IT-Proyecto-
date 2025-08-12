import { EnrollmentOfUser_Course } from "../network/fetch/Enrollment";
import { LessonOfSection } from "../network/fetch/Lesson";
import { QuizOfLesson } from "../network/fetch/Quiz";
import { sectionOfCourse } from "../network/fetch/Section";

export const loadFullCourseData = async () => {
  const rawCourse = localStorage.getItem("selectedCourse");
  if (!rawCourse) {
    throw new Error("No hay curso seleccionado en localStorage");
  }

const { id: courseId } = JSON.parse(rawCourse);
  const userString = localStorage.getItem("user");
  if (!userString) {
  console.log("falta ID");
          return;
        }
        const { id } = JSON.parse(userString);

  const sections = await sectionOfCourse(courseId);
  localStorage.setItem("sections", JSON.stringify(sections));

  const allLessons = await Promise.all(
    sections.map((section) => LessonOfSection(section.id))
  );
  const lessons = allLessons.flat();
  localStorage.setItem("lessons", JSON.stringify(lessons));

  const enrollment = await EnrollmentOfUser_Course(id, courseId);
  localStorage.setItem("enrollment", JSON.stringify(enrollment));

  const allQuizzes = await Promise.all(
    lessons.map((lesson) => QuizOfLesson(lesson.id))
  );
  const quizzes = allQuizzes.flat();
  localStorage.setItem("quizzes", JSON.stringify(quizzes));

  console.log("✅ Curso cargado completo ");
};
