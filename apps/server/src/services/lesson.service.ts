import { Lesson as LessonModel } from "../database/models";
import { Section as SectionModel } from "../database/models";
import { LessonRepository } from "domain/src/services/LessonRepository";
import { Lesson } from "domain/src/entities/Lesson";

export function lessonService(): LessonRepository {
  const _mapToLesson = (lesson: LessonModel): Lesson => {
    return {
      id: lesson.id,
      title: lesson.title,
      videoUrl: lesson.videoUrl,
      textContent: lesson.textContent,
      sectionId: lesson.sectionId,
      order: lesson.order,
    };
  };

  return {
    findBySectionId: async function (sectionId: number): Promise<Lesson[]> {
      try {
        const lessons = await LessonModel.findAll({
          where: {
            sectionId: sectionId,
          },
        });
        return lessons.map(_mapToLesson);
      } catch (error) {
        throw error;
      }
    },

    findById: async function (id: number): Promise<Lesson | null> {
      try {
        const lesson = await LessonModel.findByPk(id);
        return lesson ? _mapToLesson(lesson) : null;
      } catch (error) {
        throw error;
      }
    },

    createLesson: async function (lessonData: Lesson): Promise<Lesson> {
      try {
        const newLesson = await LessonModel.create(lessonData);
        return _mapToLesson(newLesson);
      } catch (error) {
        throw error;
      }
    },

    countByCourse: async function (courseId: number): Promise<number> {
      try {
        const total = await LessonModel.count({
          include: [
            {
              model: SectionModel,
              as: "section",
              where: { courseId },
            },
          ],
        });

        return total;
      } catch (error) {
        throw error;
      }
    },
  };
}
