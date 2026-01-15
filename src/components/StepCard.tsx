import { ReactNode } from "react";

interface StepCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  stepNumber: number;
}

const StepCard = ({ icon, title, description, stepNumber }: StepCardProps) => {
  return (
    <div className="flex items-center gap-4 py-3 no-select">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
        {stepNumber}
      </div>
    </div>
  );
};

export default StepCard;
