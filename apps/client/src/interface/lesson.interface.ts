export interface Lesson {
  id: number;
  title: string;
  videoUrl: string | null;
  textContent: string | null;
  sectionId: number;
  order: number;
}
