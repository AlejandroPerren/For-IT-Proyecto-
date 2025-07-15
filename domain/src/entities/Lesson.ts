export class Lesson {
  constructor(
    public id: number,
    public title: string,
    public videoUrl: string | null,
    public textContent: string | null,
    public sectionId: number,
    public order: number
  ) {}
}
