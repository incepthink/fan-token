import { Header } from "@/components/Header";
import { FanPageCard } from "@/components/FanPageCard";
import { artists, generateTasks } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Wallet, ListChecks, Coins, Zap, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const featured = artists[0];
const featuredTasks = generateTasks(featured);
const totalTasks = artists.reduce((acc, a) => acc + generateTasks(a).length, 0);
const totalTokens = artists.flatMap(generateTasks).reduce((acc, t) => acc + t.rewardAmount, 0);

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ── */}
      <section className="container py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Fan Token Rewards · Built on Base
            </p>

            <h1 className="text-5xl font-black tracking-tighter leading-none text-foreground md:text-6xl lg:text-7xl">
              Earn{" "}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                tokens
              </span>
              <br />
              from your<br />
              favorite artists
            </h1>

            <p className="mt-6 text-xl text-muted-foreground max-w-md">
              Complete tasks, engage with artists, and get rewarded with real ERC-20 fan tokens.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/${featured.slug}`}>
                <Button size="lg" className="gap-2 text-base font-semibold px-6">
                  Start Earning <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 text-base font-semibold px-6" asChild>
                <a href="#fan-pages">Browse Artists</a>
              </Button>
            </div>

            {/* Stat pills */}
            <div className="mt-10 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">
                <Users className="h-4 w-4" />
                {artists.length} Artists
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-fuchsia-100 px-4 py-2 text-sm font-bold text-fuchsia-700">
                <ListChecks className="h-4 w-4" />
                {totalTasks} Tasks
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
                <Coins className="h-4 w-4" />
                {totalTokens} Tokens
              </span>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-xs">
              <FanPageCard artist={featured} taskCount={featuredTasks.length} featured />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Get Started
          </p>
          <h2 className="mb-10 text-center text-3xl font-black text-foreground">
            Three steps to your first token drop
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                icon: Wallet,
                title: "Connect Wallet",
                desc: "Link your Base-compatible wallet in one click. No sign-up required.",
                bg: "bg-violet-50",
                border: "border-violet-200",
                iconBg: "bg-violet-100",
                iconColor: "text-violet-600",
                numColor: "text-violet-100",
              },
              {
                step: "02",
                icon: ListChecks,
                title: "Browse Tasks",
                desc: "Explore fan pages and pick tasks — from quick social shares to creative submissions.",
                bg: "bg-fuchsia-50",
                border: "border-fuchsia-200",
                iconBg: "bg-fuchsia-100",
                iconColor: "text-fuchsia-600",
                numColor: "text-fuchsia-100",
              },
              {
                step: "03",
                icon: Coins,
                title: "Earn Tokens",
                desc: "Instant tasks pay immediately. Manual tasks get reviewed, then tokens land in your wallet.",
                bg: "bg-amber-50",
                border: "border-amber-200",
                iconBg: "bg-amber-100",
                iconColor: "text-amber-600",
                numColor: "text-amber-100",
              },
            ].map(({ step, icon: Icon, title, desc, bg, border, iconBg, iconColor, numColor }) => (
              <Card
                key={step}
                className={`relative overflow-hidden border ${border} ${bg} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
              >
                <CardContent className="p-6">
                  <span className={`absolute right-4 top-4 text-6xl font-black select-none ${numColor}`}>
                    {step}
                  </span>
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTIST ── */}
      <section className="container py-16">
        <div className="mb-4 flex items-center gap-2">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Featured Artist
          </span>
        </div>

        <Link to={`/${featured.slug}`} className="group block">
          <div className="relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1">
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={featured.banner}
                alt={`${featured.name} banner`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <img
                    src={featured.avatar}
                    alt={featured.name}
                    className="h-16 w-16 rounded-full border-4 border-white/30 shadow-xl"
                  />
                  <div>
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 text-xs font-bold text-white">
                      <Zap className="h-3 w-3" />
                      ${featured.tokenSymbol}
                    </span>
                    <h3 className="text-2xl font-black text-white">{featured.name}</h3>
                    <p className="text-sm text-white/70">{featuredTasks.length} tasks available</p>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="shrink-0 gap-2 bg-white text-foreground hover:bg-white/90 font-bold shadow-lg"
                >
                  Explore Fan Page <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* ── ALL FAN PAGES ── */}
      <section id="fan-pages" className="container pb-24">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black text-foreground">All Fan Pages</h2>
          <Badge variant="secondary" className="font-semibold">
            {artists.length} artists
          </Badge>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist) => (
            <FanPageCard
              key={artist.id}
              artist={artist}
              taskCount={generateTasks(artist).length}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
