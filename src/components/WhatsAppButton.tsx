import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open("https://wa.me/258850272166?text=10MT", "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base tracking-wide glow-primary transition-all duration-300 flex items-center justify-center gap-3 no-select"
    >
      <MessageCircle className="w-5 h-5" />
      PAGAR VIA WHATSAPP
    </Button>
  );
};

export default WhatsAppButton;
