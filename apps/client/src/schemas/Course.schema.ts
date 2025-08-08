import * as yup from "yup";

export const courseSchema = yup.object({
  title: yup.string().required().min(3),
  description: yup.string().required().min(10),
  isPublished: yup.boolean().required(),
});

export const sectionSchema = yup.object({
  title: yup.string().required().min(3),
});

export const lessonSchema = yup.object({
  title: yup.string().required().min(3),
  videoUrl: yup.string().url("Debe ser una URL válida").required(),
  textContent: yup.string().required(),
  order: yup.number().required().min(0),
});

export const quizSchema = yup.object({
  question: yup.string().required("La pregunta es obligatoria"),
  options: yup.object({
    A: yup.string().required("La opción A es obligatoria"),
    B: yup.string().required("La opción B es obligatoria"),
    C: yup.string().required("La opción C es obligatoria"),
    D: yup.string().required("La opción D es obligatoria"),
  }),
  correctAnswer: yup
    .string()
    .oneOf(["A", "B", "C", "D"], "Debe ser A, B, C o D")
    .required("La respuesta correcta es obligatoria"),
});
