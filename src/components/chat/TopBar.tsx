import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface TopBarProps {
  mode: "basic" | "deep";
  onModeChange?: (mode: "basic" | "deep") => void;
}

const TopBar = ({ mode, onModeChange }: TopBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex  sm:flex-row items-center sm:items-end justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm gap-2 sm:gap-4">
        {/* Left: Avatar + Title */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Interactive Avatar */}
          <div
            className="relative flex-shrink-0 w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src="/robot.png"
              alt="Robot"
              className="w-3/4 h-3/4 object-contain rounded-full"
            />
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
          </div>

          {/* Title + Mode Badge */}
          <div
            className="flex flex-col flex-1 cursor-pointer min-w-0"
            onClick={() => onModeChange?.(mode === "basic" ? "deep" : "basic")}
          >
            <div className="flex items-center gap-2 flex-wrap truncate">
              <h1 className="text-base sm:text-lg font-semibold uppercase text-foreground tracking-tight truncate">
                grammarlite
              </h1>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                  mode === "basic"
                    ? "bg-primary/20 text-primary"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {mode === "basic" ? "BASIC" : "DEEP"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1 truncate">
              {mode === "basic"
                ? "Quick grammar correction"
                : "Multiple suggestions mode"}
            </p>
          </div>
        </div>

        {/* Right: Status */}
        <div className="md:flex hidden items-center gap-2 justify-end mt-2 sm:mt-0 w-full sm:w-auto">
          <div
            className={`w-2 h-2 rounded-full animate-pulse flex-shrink-0 ${
              mode === "basic" ? "bg-primary" : "bg-accent"
            }`}
          />
          <span className="text-xs text-muted-foreground hidden sm:inline truncate">
            Online
          </span>
        </div>
      </header>

      {/* Modal for Avatar Click */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-sm w-full p-6 bg-card rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>App Info / Settings</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              You can place settings or information here.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopBar;
