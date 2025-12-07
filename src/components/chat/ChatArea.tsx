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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Dynamic placeholder based on mode
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
      className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6"
    >
      <div className="max-w-3xl mx-auto space-y-4">
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
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {placeholderTitle}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              {placeholderSubtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
