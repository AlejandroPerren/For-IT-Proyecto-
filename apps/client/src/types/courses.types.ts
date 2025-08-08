import type { Course } from "../interface/course.interface";
import type { Section } from "../interface/section.interface";

export type TCourse = Omit<Course, "id" | "createdBy" | "isEnrolled">;


export type TSection = Omit<Section, "id" | "courseId">;

export type TLesson = {
  title: string;
  videoUrl: string ;
  textContent: string ;
  order: number;

}



export type TQuiz = {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
};
