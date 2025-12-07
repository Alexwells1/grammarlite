import { Sparkles } from "lucide-react";

interface TopBarProps {
  mode: "basic" | "deep";
  onModeChange?: (mode: "basic" | "deep") => void; // optional if you want to allow toggling here
}

const TopBar = ({ mode }: TopBarProps) => (
  <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
        <Sparkles className="w-5 h-5 text-primary-foreground" />
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold uppercase text-foreground tracking-tight">
          grammarlite
        </h1>
        <p className="text-xs text-muted-foreground">
          {mode === "basic"
            ? "Basic grammar correction mode"
            : "DeepResearch: Multiple suggestions mode"}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <span className="text-xs text-muted-foreground hidden sm:inline">
        Online
      </span>
    </div>
  </header>
);

export default TopBar;
