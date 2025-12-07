import { Bot } from "lucide-react";

const TypingIndicator = () => (
  <div className="flex gap-2 sm:gap-3 justify-start items-end message-fade-in">
    {/* AI Avatar */}
    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary/80 to-accent/60 flex items-center justify-center shadow-md">
      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
    </div>

    {/* Typing Bubble */}
    <div className="bg-ai-bubble rounded-2xl rounded-bl-md px-3 sm:px-4 py-2 sm:py-3 shadow-md">
      <div className="flex gap-1 sm:gap-2">
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-muted-foreground/60 animate-bounce" />
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-muted-foreground/60 animate-bounce delay-75" />
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-muted-foreground/60 animate-bounce delay-150" />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
