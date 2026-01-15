import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhatsAppButton from "@/components/WhatsAppButton";
import CodeInput from "@/components/CodeInput";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col no-select">
      <div className="flex-1 w-full max-w-md mx-auto px-4 pb-8">
        <HeroSection />
        
        <div className="space-y-4">
          <HowItWorks />
          
          <WhatsAppButton />
          
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-background text-xs text-muted-foreground">
                JÁ TEM UM CÓDIGO?
              </span>
            </div>
          </div>
          
          <CodeInput />
        </div>
      </div>

      <footer className="py-4 text-center space-y-1">
        <p className="text-xs text-muted-foreground/50 no-select">
          Acesso válido por 5 horas após ativação
        </p>
        <p className="text-xs text-muted-foreground/50 no-select">
          © 2024 Futebol ao Vivo • Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default Index;
