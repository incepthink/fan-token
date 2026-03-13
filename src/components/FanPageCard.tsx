import { Link } from "react-router-dom";
import type { Artist } from "@/data/mock";

interface FanPageCardProps {
  artist: Artist;
  taskCount: number;
  featured?: boolean;
}

export function FanPageCard({ artist, taskCount, featured }: FanPageCardProps) {
  return (
    <Link to={`/${artist.slug}`} className="group block">
      <div
        className={`overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
          featured ? "ring-2 ring-primary/20" : ""
        }`}
      >
        <div className="relative h-32 overflow-hidden">
          <img
            src={artist.banner}
            alt={`${artist.name} banner`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="relative px-4 pb-4">
          <div className="-mt-6 mb-3 flex items-end gap-3">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="h-12 w-12 rounded-full border-2 border-background"
            />
            <div className="flex-1 min-w-0 pb-0.5">
              <h3 className="font-semibold text-foreground truncate">{artist.name}</h3>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              ${artist.tokenSymbol}
            </span>
            <span className="text-xs text-muted-foreground">{taskCount} tasks</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
