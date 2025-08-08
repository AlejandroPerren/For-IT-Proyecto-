import FormCourse from "../compontents/coursesCreator/FormCourse";
import FormLesson from "../compontents/coursesCreator/FormLesson";
import FormQuiz from "../compontents/coursesCreator/FormQuiz";
import FormSection from "../compontents/coursesCreator/FormSection";
import { useStep } from "../hooks/useStep";

const CreatorCourses = () => {
  const { step, nextStep, prevStep } = useStep();

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Paso {step} de 4</h2>

      {step === 1 && <FormCourse onNext={nextStep} />}
      {step === 2 && <FormSection onNext={nextStep} onBack={prevStep} />}
      {step === 3 && <FormLesson onNext={nextStep} onBack={prevStep} />}
      {step === 4 && <FormQuiz onBack={prevStep} />}
    </div>
  );
};

export default CreatorCourses;
