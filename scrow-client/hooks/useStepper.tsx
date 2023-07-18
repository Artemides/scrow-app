import React, { useState } from "react";

export const useStepper = (steps: string[]) => {
  const [currentStep, setCurrentStep] = useState(1);

  const onNextStep = () => {
    setCurrentStep((lastStep) => {
      if (lastStep === steps.length) return lastStep;

      return lastStep + 1;
    });
  };

  const onPrevStep = () => {
    setCurrentStep((laststep) => {
      if (laststep == 1) return laststep;

      return laststep - 1;
    });
  };
  return { currentStep, onPrevStep, onNextStep };
};
