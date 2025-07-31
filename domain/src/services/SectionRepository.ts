import { Section } from '../entities/Section';

export interface SectionRepository {
  createSection(section: Section): Promise<Section>;
  findByCourseId(courseId: number): Promise<Section[]>;
}
