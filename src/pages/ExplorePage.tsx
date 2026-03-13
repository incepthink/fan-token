import { Header } from "@/components/Header";
import { FanPageCard } from "@/components/FanPageCard";
import { artists, generateTasks } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const featured = artists[0];
const featuredTasks = generateTasks(featured);

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Earn tokens from your favorite artists
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-md">
              Complete tasks, engage with artists, and get rewarded with ERC20 tokens on Base.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to={`/${featured.slug}`}>
                <Button size="lg" className="gap-2">
                  Explore fan pages <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-sm">
              <FanPageCard artist={featured} taskCount={featuredTasks.length} featured />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container pb-20">
        <h2 className="mb-6 text-lg font-semibold text-foreground">All Fan Pages</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
