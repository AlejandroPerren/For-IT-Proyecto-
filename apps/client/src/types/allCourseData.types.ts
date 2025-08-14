export interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

export interface CourseFullData {
  course: Course;
  enrollment: Enrollment;
  sections: Section[];
  lessons: Record<string, Lesson[]>;
  quizzes: Record<string, Quiz[]>;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  createdBy: number;
  isPublished: boolean;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  status: "pending" | "approved" | "rejected";
  progress: number;
}

export interface Section {
  id: number;
  title: string;
  courseId: number;
}

export interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  textContent: string;
  sectionId: number;
  order: number;
}

export interface Quiz {
  id: number;
  lessonId: number;
  question: string;
  options: Record<string, string>;
  correctAnswer: string;
}
