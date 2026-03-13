import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { isArtistLoggedIn, setArtistLoggedIn } = useApp();
  const location = useLocation();
  const isArtistArea = location.pathname.startsWith("/artist");

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">F</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">FanDrop</span>
        </Link>

        <div className="flex items-center gap-3">
          {isArtistLoggedIn && isArtistArea ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setArtistLoggedIn(false)}
              className="text-muted-foreground"
            >
              Sign out
            </Button>
          ) : (
            <Link to="/artist/login">
              <Button variant="outline" size="sm">
                For Artists
              </Button>
            </Link>
          )}
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus="address"
          />
        </div>
      </div>
    </header>
  );
}
