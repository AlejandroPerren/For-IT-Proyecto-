import { Section } from '../entities/Section';

export interface SectionRepository {
  create(section: Section): Promise<Section>;
  findByCourseId(courseId: number): Promise<Section[]>;
}
