import React, { useState } from "react";
import { Button } from "../@/components/ui/button";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useStepper } from "../hooks/useStepper";
import { Input } from "../@/components/ui/input";
const steps = ["beneficer", "Price", "abriter", "deploy"];
const Stepper = () => {
  const { currentStep, onNextStep, onPrevStep } = useStepper(steps);
  return (
    <>
      <div className="flex justify-between">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`step-item ${currentStep === idx + 1 && "active"} ${
              idx + 1 < currentStep && "complete"
            }`}
          >
            <div className="step">{idx + 1}</div>
            <p className="text-gray-300 capitalize">{step}</p>
          </div>
        ))}
      </div>
      {currentStep === 1 && (
        <div className="">
          <label htmlFor="beneficiary-address">Address</label>
          <Input
            id="beneficiary-address"
            className=" focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-gray-600 bg-gray-800"
            type="text"
            placeholder="Beneficiary Address"
          />
        </div>
      )}
      {currentStep === 2 && (
        <div className="">
          <label htmlFor="beneficiary-address">Good or Service value</label>
          <Input
            id="beneficiary-address"
            className=" focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-gray-600 bg-gray-800"
            type="text"
            placeholder="Beneficiary Address"
          />
        </div>
      )}
      <div className="flex justify-center gap-2 items-center">
        <Button
          disabled={currentStep === 1}
          className="rounded-full p-0 w-8 h-8"
          onClick={onPrevStep}
        >
          <GrFormPrevious size={21} />
        </Button>
        <Button
          disabled={currentStep === steps.length}
          className="rounded-full p-0 w-8 h-8"
          onClick={onNextStep}
        >
          <GrFormNext size={21} />
        </Button>
      </div>
    </>
  );
};

export default Stepper;
