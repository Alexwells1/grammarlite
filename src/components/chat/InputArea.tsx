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
        200
      )}px`;
    }
  }, [message]);

  return (
    <div className="border-t border-border bg-card/70 backdrop-blur-md px-4 py-3 rounded-t-xl flex items-center gap-3 shadow-inner">
      {/* Mode button on bottom-left */}
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setModeMenuOpen((prev) => !prev)}
        >
          <Plus className="w-4 h-4" />
        </Button>
        {modeMenuOpen && (
          <div className="absolute bottom-10 left-0 bg-card border border-border rounded-md shadow-lg z-10 w-32">
            <button
              className={`w-full px-3 py-2 text-left ${
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
              className={`w-full px-3 py-2 text-left ${
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
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          mode === "basic"
            ? "Type a sentence for quick grammar correction..."
            : "Type a sentence for multiple grammar suggestions..."
        }
        className="flex-1 resize-none rounded-xl p-3 pr-12 outline-none border border-border bg-input text-foreground focus:ring-2 focus:ring-ring placeholder:text-muted-foreground transition-all"
        rows={1}
      />

      {/* Send button on bottom-right */}
      <Button
        variant="ghost"
        size="icon"
        disabled={disabled || !message.trim()}
        onClick={handleSend}
        className="absolute right-4 bottom-4"
      >
        <ArrowUp className="w-5 h-5 rotate-45" />
      </Button>
    </div>
  );
};

export default InputArea;
