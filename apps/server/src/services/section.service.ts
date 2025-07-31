import { Section as SectionModel } from "../database/models";
import { SectionRepository } from "domain/src/services/SectionRepository";
import { Section } from "domain/src/entities/Section";

export function sectionService(): SectionRepository {
  const _mapToSection = (section: SectionModel): Section => {
    return {
      id: section.id,
      title: section.title,
      courseId: section.courseId,
    };
  };

  return {
    findByCourseId: async function (courseId: number): Promise<Section[]> {
      try {
        const sections = await SectionModel.findAll({
          where: { courseId: courseId },
        });
        return sections.map(_mapToSection);
      } catch (error) {
        throw error;
      }
    },

    createSection: async function (sectionData: Section): Promise<Section> {
      try {
        const newSection = await SectionModel.create(sectionData);
        return _mapToSection(newSection);
      } catch (error) {
        throw error;
      }
    },
  };
}
