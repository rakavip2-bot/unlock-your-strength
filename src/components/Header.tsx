import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="cyber-gradient px-6 py-4 shadow-lg">
      <div className="container mx-auto flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary-foreground" />
        <h1 className="text-xl font-bold tracking-tight text-primary-foreground md:text-2xl">
          Secure Password Strength Analyzer
        </h1>
      </div>
    </header>
  );
};

export default Header;
