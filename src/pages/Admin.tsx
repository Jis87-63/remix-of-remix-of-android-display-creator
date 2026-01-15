import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Copy, Shield, Lock } from "lucide-react";

interface AccessCode {
  id: string;
  code: string;
  is_used: boolean;
  created_at: string;
  expires_at: string;
  used_at: string | null;
}

const ADMIN_PASSWORD = "PERCY";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [newCode, setNewCode] = useState("");
  const [validityHours, setValidityHours] = useState("24");
  const [loading, setLoading] = useState(false);

  const fetchCodes = async () => {
    const { data, error } = await supabase
      .from("access_codes")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast({ title: "Erro", description: "Falha ao carregar códigos", variant: "destructive" });
      return;
    }
    setCodes(data || []);
  };

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCodes();
    }
  }, [isAuthenticated]);

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCode(result);
  };

  const handleCreateCode = async () => {
    if (!newCode.trim()) {
      toast({ title: "Erro", description: "Digite um código", variant: "destructive" });
      return;
    }

    setLoading(true);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + parseInt(validityHours));

    const { error } = await supabase
      .from("access_codes")
      .insert({
        code: newCode.toUpperCase(),
        expires_at: expiresAt.toISOString(),
      });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Código criado!" });
      setNewCode("");
      fetchCodes();
    }
    setLoading(false);
  };

  const handleDeleteCode = async (id: string) => {
    const { error } = await supabase
      .from("access_codes")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Código removido!" });
      fetchCodes();
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Copiado!", description: code });
  };

  const isExpired = (expiresAt: string) => new Date(expiresAt) < new Date();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      toast({ title: "Bem-vindo!", description: "Acesso autorizado" });
    } else {
      toast({ title: "Senha incorreta", description: "Tente novamente", variant: "destructive" });
    }
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Área Restrita</h1>
            <p className="text-sm text-muted-foreground">Digite a senha para acessar o painel</p>
          </div>
          
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="SENHA"
              value={password}
              onChange={(e) => setPassword(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="h-12 text-center tracking-[0.2em] font-medium bg-secondary border-border"
            />
            <Button
              onClick={handleLogin}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            >
              ENTRAR
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Painel Admin</h1>
        </div>

        {/* Create new code */}
        <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground tracking-widest">GERAR NOVO CÓDIGO</h2>
          
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="CÓDIGO"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              className="flex-1 h-12 text-center tracking-[0.2em] font-medium bg-secondary border-border"
            />
            <Button
              onClick={generateRandomCode}
              variant="outline"
              className="h-12 px-4"
            >
              Gerar
            </Button>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">Validade:</span>
            <Input
              type="number"
              value={validityHours}
              onChange={(e) => setValidityHours(e.target.value)}
              className="w-20 h-10 text-center bg-secondary border-border"
            />
            <span className="text-sm text-muted-foreground">horas</span>
          </div>

          <Button
            onClick={handleCreateCode}
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            <Plus className="w-5 h-5 mr-2" />
            CRIAR CÓDIGO
          </Button>
        </div>

        {/* List codes */}
        <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground tracking-widest">CÓDIGOS ATIVOS</h2>
          
          <div className="divide-y divide-border">
            {codes.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhum código criado</p>
            ) : (
              codes.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-foreground">{item.code}</span>
                      <button onClick={() => copyToClipboard(item.code)} className="text-muted-foreground hover:text-primary">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Expira: {formatDate(item.expires_at)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.is_used ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">Usado</span>
                    ) : isExpired(item.expires_at) ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">Expirado</span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">Ativo</span>
                    )}
                    <button
                      onClick={() => handleDeleteCode(item.id)}
                      className="text-muted-foreground hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <footer className="py-4 text-center space-y-1">
          <p className="text-xs text-muted-foreground/50">
            Acesso válido por 24 horas após ativação
          </p>
          <p className="text-xs text-muted-foreground/50">
            © 2024 Futebol ao Vivo • Todos os direitos reservados
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Admin;
