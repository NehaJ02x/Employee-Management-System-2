import { Check } from 'lucide-react';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i < currentStep ? 'bg-green-500 text-white' :
              i === currentStep ? 'bg-indigo-600 text-white' :
              'bg-gray-200 text-gray-500'
            }`}>
              {i < currentStep ? <Check size={16} /> : i + 1}
            </div>
            <span className={`text-xs mt-1 ${i <= currentStep ? 'text-indigo-600 font-medium' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 ${i < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
