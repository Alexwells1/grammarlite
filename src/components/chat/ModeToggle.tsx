import { cn } from "@/lib/utils";
import { Zap, Microscope } from "lucide-react";

type Mode = "basic" | "deep";

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

const ModeToggle = ({ mode, onModeChange }: ModeToggleProps) => (
  <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-lg border border-border/50">
    <button
      onClick={() => onModeChange("basic")}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
        mode === "basic"
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      <Zap className="w-3.5 h-3.5" />
      <span>Basic</span>
    </button>
    <button
      onClick={() => onModeChange("deep")}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
        mode === "deep"
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      <Microscope className="w-3.5 h-3.5" />
      <span>DeepResearch</span>
    </button>
  </div>
);

export default ModeToggle;
