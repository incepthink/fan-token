import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Zap, ListChecks, CheckCircle2, Users } from "lucide-react";

const features = [
  { icon: Users, text: "Manage your fan pages & community" },
  { icon: ListChecks, text: "Create tasks and set token rewards" },
  { icon: CheckCircle2, text: "Review and approve fan submissions" },
  { icon: Zap, text: "Distribute ERC-20 tokens instantly" },
];

export default function ArtistLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setArtistLoggedIn } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setArtistLoggedIn(true);
    navigate("/artist/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left branding panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ background: "linear-gradient(145deg, #4c1d95 0%, #6d28d9 40%, #a21caf 100%)" }}
      >
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <span className="text-base font-black text-white">F</span>
          </div>
          <span className="text-xl font-black tracking-tight text-white">FanDrop</span>
        </Link>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-200">
            Artist Portal
          </p>
          <h1 className="mb-4 text-4xl font-black leading-tight text-white">
            Your fans are<br />waiting to engage
          </h1>
          <p className="mb-10 text-lg text-violet-200">
            Create tasks, reward loyalty, and build a community that earns with you.
          </p>

          <ul className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-white/90">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-violet-300">Built on Base · ERC-20 Fan Tokens</p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-black text-primary-foreground">F</span>
            </div>
            <span className="text-lg font-black tracking-tight text-foreground">FanDrop</span>
          </Link>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-foreground">Welcome back</h2>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to your artist account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full font-bold"
              style={{ background: "linear-gradient(135deg, #7c3aed, #d946ef)" }}
            >
              Sign in to Artist Portal
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/artist/signup" className="font-semibold text-primary hover:underline">
              Create one free
            </Link>
          </div>

          <div className="mt-8 border-t pt-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to fan explore page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
