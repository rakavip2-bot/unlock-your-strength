import { ShieldCheck, KeyRound, AlertTriangle, UserX, Hash, Type } from "lucide-react";

const instructions = [
  {
    icon: ShieldCheck,
    title: "Purpose",
    text: "This tool helps you evaluate your password's strength and provides suggestions to make it more secure.",
  },
  {
    icon: UserX,
    title: "Avoid Personal Info",
    text: "Never use your name, phone number, or personal details inside your password.",
  },
  {
    icon: Type,
    title: "Mix Character Types",
    text: "Use a combination of uppercase (A-Z), lowercase (a-z), numbers (0-9), and special characters (@, #, $, !).",
  },
  {
    icon: Hash,
    title: "Minimum Length",
    text: "Use at least 8 characters. Passwords with 12+ characters are significantly stronger.",
  },
  {
    icon: AlertTriangle,
    title: "Avoid Common Passwords",
    text: "Passwords like 'password123', 'admin', or 'qwerty' are easily guessable. Avoid them.",
  },
  {
    icon: KeyRound,
    title: "Unique Passwords",
    text: "Use a different password for each account. Reusing passwords increases vulnerability.",
  },
];

const InstructionsPanel = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm cyber-glow">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        🛡️ Security Guidelines
      </h2>
      <div className="space-y-4">
        {instructions.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructionsPanel;
