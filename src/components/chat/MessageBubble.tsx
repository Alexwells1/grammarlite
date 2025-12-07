import { cn } from "@/lib/utils";

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
      "flex gap-2 sm:gap-3 message-slide-up",
      isUser ? "justify-end" : "justify-start"
    )}
    style={{ animationDelay: `${animationDelay}ms` }}
  >
    {/* AI Avatar */}
    {!isUser && (
      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary/80 to-accent/60 flex items-center justify-center">
        <img src="/icon.svg" alt="ai icon" className="h-5 sm:h-6 w-auto" />
      </div>
    )}

    {/* Bubble */}
    <div
      className={cn(
        "max-w-[80%] sm:max-w-[65%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-md transition-all duration-200",
        isUser
          ? "bg-user-bubble text-user-bubble-foreground rounded-br-md"
          : "bg-ai-bubble text-ai-bubble-foreground rounded-bl-md"
      )}
    >
      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
        {content}
      </p>

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
          {suggestions.map((s, idx) => {
            const isCorrect = s.reason === "The sentence is already correct.";
            return (
              <div
                key={idx}
                className="p-2 sm:p-3 rounded-md border border-border bg-muted/20 hover:bg-muted cursor-pointer transition-colors"
                onClick={s.onClick}
              >
                <p className="font-semibold text-sm sm:text-base">{s.label}</p>
                {!isCorrect && s.explanation && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">
                    ❌ {s.explanation}
                  </p>
                )}
                {s.reason && (
                  <p className="text-xs sm:text-sm text-green-600 mt-1">
                    ✅ {s.reason}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>

    {/* User Avatar */}
    {isUser && (
      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center shadow-md">
        <img src="/avatar.svg" alt="user" className="h-5 sm:h-6 w-auto" />
      </div>
    )}
  </div>
);

export default MessageBubble;
