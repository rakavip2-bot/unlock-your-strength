import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Phone } from "lucide-react";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; phone?: string }>({});

  const isNameValid = /^[A-Za-z\s.'-]{2,50}$/.test(username.trim());
  const isPhoneValid = /^[0-9]{10}$/.test(phone.trim());
  const canContinue = isNameValid && isPhoneValid && accepted;

  const handleSubmit = () => {
    const newErrors: { username?: string; phone?: string } = {};
    if (!isNameValid) {
      newErrors.username = "Name must contain only alphabets (2–50 characters).";
    }
    if (!isPhoneValid) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    navigate("/password-checker", {
      state: { username: username.trim(), phone: phone.trim() },
    });
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm cyber-glow">
      <h2 className="mb-1 text-lg font-semibold text-foreground">
        📝 User Registration
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Enter your details so we can check your password doesn't contain personal info.
      </p>

      <div className="space-y-5">
        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium">
            Username (Name)
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="username"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors((p) => ({ ...p, username: undefined }));
              }}
              className="pl-10"
              maxLength={50}
            />
          </div>
          {errors.username && (
            <p className="text-xs text-destructive">{errors.username}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              placeholder="Enter 10-digit phone number"
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(val);
                if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
              }}
              className="pl-10"
              maxLength={10}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone}</p>
          )}
        </div>

        {/* Acceptance checkbox */}
        <div className="flex items-start gap-3 rounded-md border border-border bg-muted/50 p-3">
          <Checkbox
            id="accept"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked === true)}
            className="mt-0.5"
          />
          <Label htmlFor="accept" className="text-sm leading-relaxed text-muted-foreground cursor-pointer">
            I have read and understood the security guidelines. I accept the instructions provided.
          </Label>
        </div>

        {/* Continue button */}
        <Button
          onClick={handleSubmit}
          disabled={!canContinue}
          className="w-full cyber-gradient text-primary-foreground font-semibold disabled:opacity-50"
          size="lg"
        >
          Continue to Password Checker →
        </Button>
      </div>
    </div>
  );
};

export default RegistrationForm;
