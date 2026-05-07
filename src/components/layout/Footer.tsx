import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background/50">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-lg tracking-widest text-foreground/80 hover:text-foreground transition-colors"
          >
            THE LOREKEEPER
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              to="/timeline"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Timeline
            </Link>
            <Link
              to="/characters"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Characters
            </Link>
            <Link
              to="/locations"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Realms
            </Link>
            <Link
              to="/stories"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Stories
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shibui Labs, LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
