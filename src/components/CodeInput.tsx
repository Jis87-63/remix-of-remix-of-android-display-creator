import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AccessCode {
  id: string;
  code: string;
  is_used: boolean;
  expires_at: string;
  used_at: string | null;
  max_uses: number;
  use_count: number;
}

const CodeInput = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setLoading(true);
    
    const { data, error } = await supabase
      .from("access_codes" as any)
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    const accessCode = data as unknown as AccessCode | null;

    if (error || !accessCode) {
      toast({ title: "Código inválido", description: "Verifique e tente novamente", variant: "destructive" });
      setLoading(false);
      return;
    }

    const now = new Date();
    const expiresAt = new Date(accessCode.expires_at);

    if (expiresAt < now) {
      toast({ title: "Código expirado", description: "Este código já não é válido", variant: "destructive" });
      setLoading(false);
      return;
    }

    // Check usage limit
    const maxUses = accessCode.max_uses ?? 1;
    const useCount = accessCode.use_count ?? 0;
    
    if (useCount >= maxUses) {
      toast({ title: "Código esgotado", description: "Este código já atingiu o limite de usos", variant: "destructive" });
      setLoading(false);
      return;
    }

    // Increment use count
    await supabase
      .from("access_codes" as any)
      .update({ 
        use_count: useCount + 1,
        used_at: now.toISOString() 
      } as any)
      .eq("id", accessCode.id);

    toast({ title: "Sucesso!", description: "Redirecionando..." });
    
    // Redirect to stream
    window.location.href = "https://loco.com/streamers/futebol.online?lang=pt-br";
  };

  return (
    <div className="space-y-3 no-select">
      <Input
        type="text"
        placeholder="CÓDIGO"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
        maxLength={6}
        className="h-12 text-center tracking-[0.3em] font-medium bg-secondary border-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide glow-primary transition-all duration-300"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "ENTRAR"}
      </Button>
    </div>
  );
};

export default CodeInput;
