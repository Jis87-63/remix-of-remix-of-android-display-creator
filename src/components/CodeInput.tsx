import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const CodeInput = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setLoading(true);
    
    const { data, error } = await supabase
      .from("access_codes")
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    if (error || !data) {
      toast({ title: "Código inválido", description: "Verifique e tente novamente", variant: "destructive" });
      setLoading(false);
      return;
    }

    const now = new Date();
    const expiresAt = new Date(data.expires_at);

    if (expiresAt < now) {
      toast({ title: "Código expirado", description: "Este código já não é válido", variant: "destructive" });
      setLoading(false);
      return;
    }

    if (data.is_used) {
      toast({ title: "Código já usado", description: "Este código já foi utilizado", variant: "destructive" });
      setLoading(false);
      return;
    }

    // Mark code as used
    await supabase
      .from("access_codes")
      .update({ is_used: true, used_at: now.toISOString() })
      .eq("id", data.id);

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
