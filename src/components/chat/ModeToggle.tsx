import { cn } from "@/lib/utils";
import { Zap, Microscope } from "lucide-react";

type Mode = "basic" | "deep";

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

const ModeToggle = ({ mode, onModeChange }: ModeToggleProps) => (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1 p-1 sm:p-0 bg-secondary/50 rounded-lg border border-border/50 w-full sm:w-auto">
    {/* Basic Mode */}
    <button
      onClick={() => onModeChange("basic")}
      className={cn(
        "flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 w-full sm:w-auto",
        mode === "basic"
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span>Basic</span>
    </button>

    {/* DeepResearch Mode */}
    <button
      onClick={() => onModeChange("deep")}
      className={cn(
        "flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 w-full sm:w-auto",
        mode === "deep"
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      <Microscope className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span>DeepResearch</span>
    </button>
  </div>
);

export default ModeToggle;
