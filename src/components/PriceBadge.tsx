import { Zap } from "lucide-react";

const PriceBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border no-select">
      <Zap className="w-4 h-4 text-primary fill-primary" />
      <span className="text-foreground font-bold">10 MT</span>
      <span className="text-muted-foreground text-sm">/ 24 horas</span>
    </div>
  );
};

export default PriceBadge;
