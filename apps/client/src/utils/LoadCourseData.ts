import {
  sectionOfCourse,
  LessonOfSection,
  EnrollmentOfUser_Course,
  QuizOfLesson,
} from "../network/fetch/Courses";

export const loadFullCourseData = async () => {
  const rawCourse = localStorage.getItem("selectedCourse");
  if (!rawCourse) {
    throw new Error("No hay curso seleccionado en localStorage");
  }

  const course = JSON.parse(rawCourse);
  const courseId = course.id;
  const userId = 2; 


  const sections = await sectionOfCourse(courseId);
  localStorage.setItem("sections", JSON.stringify(sections));


  const allLessons = await Promise.all(
    sections.map((section) => LessonOfSection(section.id))
  );
  const lessons = allLessons.flat();
  localStorage.setItem("lessons", JSON.stringify(lessons));

  const enrollment = await EnrollmentOfUser_Course(userId, courseId);
  localStorage.setItem("enrollment", JSON.stringify(enrollment));

  const allQuizzes = await Promise.all(
    lessons.map((lesson) => QuizOfLesson(lesson.id))
  );
  const quizzes = allQuizzes.flat();
  localStorage.setItem("quizzes", JSON.stringify(quizzes));

  console.log("✅ Curso cargado completo ");
};
