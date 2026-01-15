import { MessageCircle, CreditCard, Key, Play } from "lucide-react";
import StepCard from "./StepCard";

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Envie via WhatsApp",
      description: "Clique no botão e envie '10MT' para nosso número",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Faça o Pagamento",
      description: "PAGUE 10MT VIA M-PESA OU TRANSFERENCIA",
    },
    {
      icon: <Key className="w-5 h-5" />,
      title: "Receba seu Código",
      description: "APOS CONFIRMACAO, ENVIAMOS SEU CODIGO DE ACESSO",
    },
    {
      icon: <Play className="w-5 h-5" />,
      title: "Assista aos Jogos",
      description: "Acesso total por 5 horas ao futebol ao vivo",
    },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-5 space-y-1 no-select">
      <h2 className="text-center text-xs font-bold text-muted-foreground tracking-widest mb-4">
        COMO FUNCIONA
      </h2>
      
      <div className="divide-y divide-border">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            stepNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
