import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUp } from "lucide-react";

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  mode: "basic" | "deep";
  onModeChange: (mode: "basic" | "deep") => void;
}

const InputArea = ({
  onSendMessage,
  disabled = false,
  mode,
  onModeChange,
}: InputAreaProps) => {
  const [message, setMessage] = useState("");
  const [modeMenuOpen, setModeMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSendMessage(message.trim());
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [message]);

  return (
    <div className="flex flex-row items-center gap-2 sm:gap-3 p-3 border-t border-border bg-card/70 backdrop-blur-md rounded-t-xl shadow-inner w-full">
      {/* Mode button */}
      <div className="relative flex-shrink-0">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setModeMenuOpen((prev) => !prev)}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        {modeMenuOpen && (
          <div className="absolute bottom-full mb-2 left-0 bg-card border border-border rounded-md shadow-lg z-10 min-w-[7rem] sm:min-w-[10rem]">
            <button
              className={`w-full px-3 py-2 text-left text-sm sm:text-base ${
                mode === "basic" ? "bg-primary/20" : ""
              }`}
              onClick={() => {
                onModeChange("basic");
                setModeMenuOpen(false);
              }}
            >
              Basic
            </button>
            <button
              className={`w-full px-3 py-2 text-left text-sm sm:text-base ${
                mode === "deep" ? "bg-primary/20" : ""
              }`}
              onClick={() => {
                onModeChange("deep");
                setModeMenuOpen(false);
              }}
            >
              DeepResearch
            </button>
          </div>
        )}
      </div>

      {/* Textarea */}
      <div className="flex-1 relative flex items-end">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            mode === "basic"
              ? "Type a sentence for correction..."
              : "Type a sentence for suggestions..."
          }
          className="flex-1 no-scrollbar resize-none rounded-xl p-3 pr-12 sm:pr-14 outline-none border border-border bg-input text-foreground focus:ring-2 focus:ring-ring placeholder:text-muted-foreground min-h-[2.5rem] sm:min-h-[3rem] max-h-[150px] overflow-y-auto transition-all placeholder:text-sm sm:placeholder:text-base"
          rows={1}
        />

        {/* Send button */}
        <Button
          variant="ghost"
          size="icon"
          disabled={disabled || !message.trim()}
          onClick={handleSend}
          className="absolute right-2 bottom-2 sm:right-3 sm:bottom-3"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 rotate-45" />
        </Button>
      </div>
    </div>
  );
};

export default InputArea;
