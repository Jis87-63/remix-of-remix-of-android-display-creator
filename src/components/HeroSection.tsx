import { Tv } from "lucide-react";
import PriceBadge from "./PriceBadge";

const HeroSection = () => {
  return (
    <div className="text-center space-y-3 pt-4 pb-4 no-select">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 animate-float">
        <Tv className="w-7 h-7 text-primary" />
      </div>
      
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight glow-text">
          FUTEBOL AO VIVO
        </h1>
        <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">
          Assista aos melhores jogos de futebol em seu celular
        </p>
      </div>

      <PriceBadge />
    </div>
  );
};

export default HeroSection;
