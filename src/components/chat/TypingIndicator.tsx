import { Bot } from "lucide-react";

const TypingIndicator = () => (
  <div className="flex gap-3 justify-start message-fade-in">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-accent/60 flex items-center justify-center shadow-md">
      <Bot className="w-4 h-4 text-primary-foreground" />
    </div>
    <div className="bg-ai-bubble rounded-2xl rounded-bl-md px-4 py-3 shadow-md">
      <div className="typing-indicator flex gap-1">
        <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" />
        <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce delay-75" />
        <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce delay-150" />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
