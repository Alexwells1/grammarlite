import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface SuggestionButton {
  label: string; 
  explanation?: string; 
  reason?: string; 
  onClick?: () => void;
}


interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  suggestions?: SuggestionButton[];
  animationDelay?: number;
}

const MessageBubble = ({
  content,
  isUser,
  suggestions,
  animationDelay = 0,
}: MessageBubbleProps) => (
  <div
    className={cn(
      "flex gap-3 message-slide-up",
      isUser ? "justify-end" : "justify-start"
    )}
    style={{ animationDelay: `${animationDelay}ms` }}
  >
    {!isUser && (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-accent/60 flex items-center justify-center shadow-md">
        <Bot className="w-4 h-4 text-primary-foreground" />
      </div>
    )}

    <div
      className={cn(
        "max-w-[75%] sm:max-w-[65%] rounded-2xl px-4 py-3 shadow-md transition-all duration-200",
        isUser
          ? "bg-user-bubble text-user-bubble-foreground rounded-br-md"
          : "bg-ai-bubble text-ai-bubble-foreground rounded-bl-md"
      )}
    >
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
  {suggestions && suggestions.length > 0 && (
  <div className="mt-2 space-y-2">
    {suggestions.map((s, idx) => {
      const isCorrect = s.reason === "The sentence is already correct.";
      return (
        <div
          key={idx}
          className="p-3 rounded-md border border-border bg-muted/20 hover:bg-muted cursor-pointer"
          onClick={s.onClick}
        >
          <p className="font-semibold">{s.label}</p>
          {!isCorrect && s.explanation && (
            <p className="text-xs text-red-500 mt-1">❌ {s.explanation}</p>
          )}
          {s.reason && (
            <p className="text-xs text-green-600 mt-1">✅ {s.reason}</p>
          )}
        </div>
      );
    })}
  </div>
)}

    </div>

    {isUser && (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center shadow-md">
        <User className="w-4 h-4 text-secondary-foreground" />
      </div>
    )}
  </div>
);

export default MessageBubble;
