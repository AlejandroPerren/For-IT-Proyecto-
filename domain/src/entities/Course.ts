export class Course {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public createdBy: number,
    public isPublished: boolean
  ) {}
}
