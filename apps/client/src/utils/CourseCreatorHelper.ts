import { createCourse } from "../network/fetch/Courses";
import { createLesson } from "../network/fetch/Lesson";
import { createQuiz } from "../network/fetch/Quiz";
import { createSection } from "../network/fetch/Section";

export const createFullCourseFlow = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.id) throw new Error("Usuario no encontrado en LocalStorage");

    const courseData = JSON.parse(localStorage.getItem("course") || "{}");
    const sectionData = JSON.parse(localStorage.getItem("section") || "{}");
    const lessonData = JSON.parse(localStorage.getItem("lesson") || "{}");
    const quizData = JSON.parse(localStorage.getItem("quiz") || "{}");

    if (!courseData.title) throw new Error("Datos de curso incompletos");
    if (!sectionData.title) throw new Error("Datos de sección incompletos");
    if (!lessonData.title) throw new Error("Datos de lección incompletos");
    if (!quizData.question) throw new Error("Datos de quiz incompletos");

    const createdCourse = await createCourse({
      ...courseData,
      createdBy: user.id, 
    });

    console.log("✅ Curso creado:", createdCourse);

    const createdSection = await createSection({
      ...sectionData,
      courseId: createdCourse.id,
    });

    console.log("✅ Sección creada:", createdSection);

    const createdLesson = await createLesson({
      ...lessonData,
      sectionId: createdSection.id,
    });

    console.log("✅ Lección creada:", createdLesson);

    const createdQuiz = await createQuiz({
      ...quizData,
      lessonId: createdLesson.id,
    });

    console.log("✅ Quiz creado:", createdQuiz);

    return {
      course: createdCourse,
      section: createdSection,
      lesson: createdLesson,
      quiz: createdQuiz,
    };
  } catch (error) {
    console.error("❌ Error en el flujo de creación:", error);
    throw error;
  }
};


export const clearCourseCreatorStorage = () => {
  localStorage.removeItem("course");
  localStorage.removeItem("section");
  localStorage.removeItem("lesson");
  localStorage.removeItem("quiz");
};
