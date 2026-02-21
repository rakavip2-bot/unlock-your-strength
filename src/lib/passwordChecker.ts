const COMMON_PASSWORDS = [
  "password", "password123", "123456", "12345678", "admin", "admin123",
  "hello123", "welcome", "letmein", "qwerty", "abc123", "iloveyou",
  "monkey", "dragon", "master", "sunshine", "princess", "shadow",
];

export function generateStrongPassword(length = 12): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const symbols = "@#$!%^&*";
  const allChars = uppercase + lowercase + digits + symbols;

  const pick = (set: string) => set[Math.floor(Math.random() * set.length)];

  const required = [pick(uppercase), pick(lowercase), pick(digits), pick(symbols)];
  const rest = Array.from({ length: length - 4 }, () => pick(allChars));
  const combined = [...required, ...rest];

  // Fisher-Yates shuffle
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined.join("");
}

export interface StrengthResult {
  score: number;
  strength: "Weak" | "Medium" | "Strong";
  color: "red" | "yellow" | "green";
  issues: string[];
  suggestions: string[];
  vulnerabilities: {
    attackType: string;
    riskLevel: "Low" | "Medium" | "High";
    description: string;
  }[];
  safetyPercentage: number;
}

export function checkPasswordStrength(
  password: string,
  username = "",
  phone = ""
): StrengthResult {
  let score = 0;
  const issues: string[] = [];
  const suggestions: string[] = [];
  const vulnerabilities: StrengthResult["vulnerabilities"] = [];

  // Personal info
  let hasPersonalInfo = false;
  if (username && username.toLowerCase().length >= 2 && password.toLowerCase().includes(username.toLowerCase())) {
    issues.push("Password contains your name.");
    hasPersonalInfo = true;
  } else {
    score += 1;
  }

  if (phone && phone.length >= 4 && password.includes(phone)) {
    issues.push("Password contains your phone number.");
    hasPersonalInfo = true;
  } else {
    score += 1;
  }

  if (hasPersonalInfo) {
    vulnerabilities.push({
      attackType: "Social Engineering",
      riskLevel: "High",
      description: "Attackers can easily guess your password using publicly available information about you."
    });
  }

  // Length
  if (password.length < 8) {
    issues.push("Password is too short. Use at least 8 characters.");
    vulnerabilities.push({
      attackType: "Brute Force",
      riskLevel: "High",
      description: "Short passwords can be cracked in seconds using automated tools."
    });
  } else if (password.length >= 12) {
    score += 2;
  } else {
    score += 1;
  }

  // Complexity checks
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[@#$!%^&*]/.test(password);

  if (hasUpper) score += 1; else issues.push("Add at least one uppercase letter (A-Z).");
  if (hasLower) score += 1; else issues.push("Add at least one lowercase letter (a-z).");
  if (hasDigit) score += 1; else issues.push("Add at least one number (0-9).");
  if (hasSymbol) score += 1; else issues.push("Add at least one special character (@, #, $, !, etc.).");

  if (!hasUpper || !hasLower || !hasDigit || !hasSymbol) {
    if (password.length >= 8) {
      vulnerabilities.push({
        attackType: "Brute Force",
        riskLevel: password.length < 10 ? "Medium" : "Low",
        description: "Lack of character variety makes it easier for computers to guess combinations."
      });
    }
  }

  // Common password
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    issues.push("This is a very common password. Avoid it.");
    score = Math.max(0, score - 2);
    vulnerabilities.push({
      attackType: "Dictionary Attack",
      riskLevel: "High",
      description: "Attackers use lists of millions of common passwords to break into accounts."
    });
    vulnerabilities.push({
      attackType: "Rainbow Table Attack",
      riskLevel: "High",
      description: "Since this password's hash is likely known, it can be decrypted instantly."
    });
  }

  // Repeated characters
  if (/(.)\1{2,}/.test(password)) {
    issues.push("Avoid repeating the same character multiple times (e.g. aaa, 111).");
    score = Math.max(0, score - 1);
  }

  // Determine strength
  let strength: StrengthResult["strength"];
  let color: StrengthResult["color"];

  if (score <= 3) {
    strength = "Weak";
    color = "red";
    suggestions.push(generateStrongPassword(), generateStrongPassword());
  } else if (score <= 5) {
    strength = "Medium";
    color = "yellow";
    suggestions.push(generateStrongPassword());
  } else {
    strength = "Strong";
    color = "green";
  }

  const safetyPercentage = Math.min(100, Math.round((score / 8) * 100));

  return { 
    score, 
    strength, 
    color, 
    issues, 
    suggestions, 
    vulnerabilities,
    safetyPercentage 
  };
}
