import { useState, useEffect } from "react";
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
}

const STREAM_URL = "https://loco.com/streamers/futebol.online?lang=pt-br";

const CodeInput = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  // Check for saved valid code on mount
  useEffect(() => {
    const checkSavedCode = async () => {
      const savedCode = localStorage.getItem("access_code");
      const savedExpiry = localStorage.getItem("access_code_expiry");

      if (savedCode && savedExpiry) {
        const expiryDate = new Date(savedExpiry);
        if (expiryDate > new Date()) {
          // Code still valid, redirect
          window.location.href = STREAM_URL;
          return;
        } else {
          // Code expired, clear storage
          localStorage.removeItem("access_code");
          localStorage.removeItem("access_code_expiry");
        }
      }
      setLoading(false);
    };

    checkSavedCode();
  }, []);

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setLoading(true);
    
    const { data, error } = await supabase
      .from("access_codes" as any)
      .select("*")
      .eq("code", code.toUpperCase())
      .maybeSingle();

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

    // Save code and expiry to localStorage
    localStorage.setItem("access_code", accessCode.code);
    localStorage.setItem("access_code_expiry", accessCode.expires_at);

    toast({ title: "Sucesso!", description: "Redirecionando..." });
    
    // Redirect to stream
    window.location.href = STREAM_URL;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

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
