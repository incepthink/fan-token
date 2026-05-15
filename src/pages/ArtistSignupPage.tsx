import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Coins, Star, TrendingUp, Zap } from "lucide-react";

const benefits = [
  { icon: Star, text: "Build a loyal, rewarded fan community" },
  { icon: Coins, text: "Issue your own ERC-20 fan token" },
  { icon: TrendingUp, text: "Track engagement and task completions" },
  { icon: Zap, text: "Instant or manual reward workflows" },
];

export default function ArtistSignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
        style={{ background: "linear-gradient(145deg, #701a75 0%, #a21caf 40%, #7c3aed 100%)" }}
      >
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <span className="text-base font-black text-white">F</span>
          </div>
          <span className="text-xl font-black tracking-tight text-white">FanDrop</span>
        </Link>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-fuchsia-200">
            Join as an Artist
          </p>
          <h1 className="mb-4 text-4xl font-black leading-tight text-white">
            Start your<br />creator journey
          </h1>
          <p className="mb-10 text-lg text-fuchsia-100">
            Set up your fan page in minutes and start rewarding the people who support you most.
          </p>

          <ul className="space-y-4">
            {benefits.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-white/90">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-fuchsia-300">Free to get started · Built on Base</p>
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
            <h2 className="text-2xl font-black text-foreground">Create your account</h2>
            <p className="mt-1 text-sm text-muted-foreground">Free to start — no credit card required</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">Artist name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Your stage name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">This is how fans will find you</p>
            </div>

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
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
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
              <p className="text-xs text-muted-foreground">At least 8 characters</p>
            </div>

            <Button
              type="submit"
              className="w-full font-bold"
              style={{ background: "linear-gradient(135deg, #a21caf, #7c3aed)" }}
            >
              Create Artist Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/artist/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>

          <div className="mt-8 border-t pt-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Browse fan pages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
