import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Bom dia";
    if (hour >= 12 && hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const handleClick = () => {
    const message = encodeURIComponent(`${getGreeting()}! Gostaria de Pagar 10 MT JOGO ON-LINE`);
    window.open(`https://wa.me/258850272166?text=${message}`, "_blank");
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
