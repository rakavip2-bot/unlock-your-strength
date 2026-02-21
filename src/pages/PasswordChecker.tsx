import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Copy, Check, ShieldAlert, ShieldCheck, ShieldX, RefreshCw } from "lucide-react";
import { checkPasswordStrength, generateStrongPassword, type StrengthResult } from "@/lib/passwordChecker";
import { useToast } from "@/hooks/use-toast";

const PasswordChecker = () => {
  const location = useLocation();
  const state = location.state as { username?: string; phone?: string } | null;
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<StrengthResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  if (!state?.username || !state?.phone) {
    return <Navigate to="/" replace />;
  }

  const handleCheck = () => {
    if (!password.trim()) return;
    const res = checkPasswordStrength(password, state.username, state.phone);
    setResult(res);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    toast({ title: "Copied!", description: "Password copied to clipboard." });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleGenerateNew = () => {
    const suggestions = [generateStrongPassword(), generateStrongPassword()];
    setResult((prev) =>
      prev ? { ...prev, suggestions } : null
    );
  };


  const StrengthIcon =
    result?.strength === "Strong"
      ? ShieldCheck
      : result?.strength === "Medium"
        ? ShieldAlert
        : ShieldX;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <Breadcrumb items={["Password Checker"]} />

      <main className="container mx-auto flex-1 px-6 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Left Column: Input and Welcome */}
          <div className="flex flex-col gap-6 h-full">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">
                Welcome back, <span className="font-medium text-foreground">{state.username}</span>
              </p>
            </div>

            {/* Password Input Card */}
            <div className="flex-1 rounded-lg border border-border bg-card p-6 shadow-sm cyber-glow">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                🔐 Test Your Password
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Enter Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Type your password here..."
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setResult(null);
                      }}
                      className="pr-10 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleCheck}
                  disabled={!password.trim()}
                  className="w-full cyber-gradient text-primary-foreground font-semibold"
                  size="lg"
                >
                  Check Strength
                </Button>

                <div className="rounded-lg bg-muted/50 p-4 border border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Security Tip:</strong> A strong password should be at least 12 characters long and include a mix of uppercase, lowercase, numbers, and symbols.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results Card */}
          <div className="flex flex-col gap-6 h-full">
            <div className="text-left h-5"> {/* Empty placeholder to align with 'Welcome back' */}
            </div>

            <div className="flex-1 rounded-lg border border-border bg-card p-6 shadow-sm cyber-glow flex flex-col min-h-[450px]">
              {result ? (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    📊 Security Report
                  </h3>

                  {/* Strength Bar */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StrengthIcon
                          className={`h-5 w-5 ${result.color === "green"
                            ? "text-success"
                            : result.color === "yellow"
                              ? "text-warning"
                              : "text-destructive"
                            }`}
                        />
                        <span className="text-sm font-semibold text-foreground">
                          Strength: {result.strength}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {result.safetyPercentage}% Safe
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${result.color === "green"
                          ? "strength-bar-strong"
                          : result.color === "yellow"
                            ? "strength-bar-medium"
                            : "strength-bar-weak"
                          }`}
                        style={{ width: `${result.safetyPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Potential Attacks */}
                  {result.vulnerabilities.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        🛡️ Vulnerabilities
                      </h4>
                      <div className="space-y-3">
                        {result.vulnerabilities.map((v, i) => (
                          <div key={i} className="rounded-md border border-warning/20 bg-warning/5 p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-foreground">{v.attackType}</span>
                              <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${v.riskLevel === "High" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"}`}>
                                {v.riskLevel}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-snug">{v.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions/Issues if any */}
                  {result.issues.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        ⚠️ Fixes Needed
                      </h4>
                      <ul className="space-y-1.5">
                        {result.issues.map((issue, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-1 w-1 rounded-full bg-destructive shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Strong Password Suggestions */}
                  {result.suggestions.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          💡 Suggestions
                        </h4>
                        <Button variant="ghost" size="sm" onClick={handleGenerateNew} className="h-6 gap-1 text-[10px] text-muted-foreground">
                          <RefreshCw className="h-2.5 w-2.5" />
                          Refresh
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {result.suggestions.map((pw, i) => (
                          <div key={i} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 border border-border">
                            <code className="text-xs font-mono text-foreground break-all">{pw}</code>
                            <Button variant="ghost" size="sm" onClick={() => handleCopy(pw)} className="h-6 w-6 p-0 shrink-0 ml-2">
                              {copied === pw ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center text-center animate-in fade-in duration-500">
                  <ShieldAlert className="mb-4 h-12 w-12 text-muted-foreground opacity-20" />
                  <h3 className="mb-2 text-lg font-medium text-foreground opacity-50">Security Report</h3>
                  <p className="max-w-[280px] text-sm text-muted-foreground opacity-50">
                    Results will appear here after you click "Check Strength".
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PasswordChecker;
