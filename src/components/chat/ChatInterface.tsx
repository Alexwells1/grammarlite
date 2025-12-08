import { useState } from "react";
import TopBar from "./TopBar";
import ChatArea from "./ChatArea";
import InputArea from "./InputArea";
import { checkGrammar } from "@/api/languagetool";

export type Suggestion = {
  label: string;
  explanation?: string;
  reason?: string;
  onClick?: () => void;
};

export type Message = {
  id: string;
  content: string;
  isUser: boolean;
  suggestions?: Suggestion[];
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<"basic" | "deep">("basic");

  const pushMessage = (msg: Message) => setMessages((prev) => [...prev, msg]);

  const handleSendMessage = async (content: string) => {
    pushMessage({ id: Date.now().toString(), content, isUser: true });
    setIsTyping(true);

    try {
      const result = await checkGrammar(content, mode);
      const isCorrect = !result.explanation;

      pushMessage({
        id: Date.now().toString(),
        content: isCorrect ? content : result.text,
        isUser: false,
        suggestions: [
          {
            label: isCorrect ? content : result.text,
            explanation: isCorrect ? undefined : result.explanation,
            reason: isCorrect
              ? "The sentence is already correct."
              : result.reason,
            onClick: () =>
              handleSuggestionClick(isCorrect ? content : result.text),
          },
        ],
      });
    } catch (err) {
      console.error("Grammar API error:", err);
      pushMessage({
        id: Date.now().toString(),
        content: "Error: Could not reach grammar API.",
        isUser: false,
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (label: string) => {
    pushMessage({ id: Date.now().toString(), content: label, isUser: true });
    pushMessage({ id: Date.now().toString(), content: label, isUser: false });
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* Top Bar */}
      <TopBar mode={mode} onModeChange={setMode} />

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ChatArea mode={mode} messages={messages} isTyping={isTyping} />
      </div>

      {/* Input Area */}
      <div className="w-full border-t border-border">
        <InputArea
          onSendMessage={handleSendMessage}
          disabled={isTyping}
          mode={mode}
          onModeChange={setMode}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
