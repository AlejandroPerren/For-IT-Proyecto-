export const getFullCourseFromStorage = () => {
  const course = JSON.parse(localStorage.getItem("course") || "null");
  const section = JSON.parse(localStorage.getItem("section") || "null");
  const lesson = JSON.parse(localStorage.getItem("lesson") || "null");
  const quiz = JSON.parse(localStorage.getItem("quiz") || "null");

  if (!course || !section || !lesson || !quiz) {
    return null;
  }

  return {
    ...course,
    sections: [
      {
        ...section,
        lessons: [
          {
            ...lesson,
            quiz: quiz,
          },
        ],
      },
    ],
  };
};

export const clearCourseCreatorStorage = () => {
  localStorage.removeItem("course");
  localStorage.removeItem("section");
  localStorage.removeItem("lesson");
  localStorage.removeItem("quiz");
};
