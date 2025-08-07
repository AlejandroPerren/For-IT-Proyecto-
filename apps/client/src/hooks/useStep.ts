import { useState } from "react";

export const useStep = (initialStep = 1) => {
  const [step, setStep] = useState<number>(initialStep);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const resetSteps = () => setStep(initialStep);

  return { step, nextStep, prevStep, resetSteps };
};
