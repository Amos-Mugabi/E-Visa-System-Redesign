import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
}

interface ProgressBarProps {
  currentStep: number;
  steps: Step[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <div key={step.id} className="flex items-center">
              {/* Step circle */}
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${isCompleted 
                  ? 'bg-green-600 border-green-600 text-white' 
                  : isCurrent 
                  ? 'bg-red-600 border-red-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-500'
                }
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              
              {/* Step title */}
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;