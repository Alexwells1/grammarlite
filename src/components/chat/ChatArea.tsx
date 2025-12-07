import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  suggestions?: { label: string; onClick?: () => void }[];
}

interface ChatAreaProps {
  messages: Message[];
  isTyping?: boolean;
  mode: "basic" | "deep";
}

const ChatArea = ({ messages, isTyping = false, mode }: ChatAreaProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or typing
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const placeholderTitle =
    mode === "basic"
      ? "Type a sentence to quickly correct its grammar..."
      : "Type a sentence to explore multiple grammar correction suggestions...";
  const placeholderSubtitle =
    mode === "basic"
      ? "Your sentence will be corrected automatically."
      : "I will suggest several ways to fix grammar while keeping your meaning.";

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto no-scrollbar px-3 sm:px-4 py-4 sm:py-6"
    >
      <div className="max-w-full sm:max-w-3xl mx-auto space-y-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            suggestions={message.suggestions}
            animationDelay={index * 50}
          />
        ))}

        {isTyping && <TypingIndicator />}

        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] sm:min-h-[300px] text-center px-2">
            <h2 className="text-base sm:text-xl font-semibold text-foreground mb-2">
              {placeholderTitle}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-[90%] sm:max-w-md">
              {placeholderSubtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
