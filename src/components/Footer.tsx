import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/50 px-6 py-4">
      <div className="container mx-auto flex flex-col items-center gap-1 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span>Secure Password Strength Analyzer</span>
        </div>
        <span>© 2025 — Cybersecurity Awareness Project</span>
      </div>
    </footer>
  );
};

export default Footer;
