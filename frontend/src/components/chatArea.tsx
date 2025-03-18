import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function ChatArea() {
  const chatRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [messages, setMessages] = useState<{ id: number; message: string }[]>(
    []
  );
  const [message, setMessage] = useState(""); // track input state

  const checkScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
  };

  useEffect(() => {
    if (isAtBottom && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage = { id: 0, message: text };
    setMessages((prev) => [...prev, userMessage]);
    sendMessage(""); //clear input after sending

    setTimeout(() => {
      const aiResponses = [
        "That sounds interesting! Tell me more. 🤔",
        "I'm here to help! How are you feeling today? 😊",
        "Let's talk about it. What’s on your mind?",
        "That must be tough. How can I support you?",
      ];
      const randomReply =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const botMessage = { id: 1, message: randomReply };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Container: Full width for the scrollbar */}
      <div
        className="flex-1 overflow-y-auto"
        ref={chatRef}
        onScroll={checkScroll}
      >
        {/* Welcome Message - Only Show If No Messages */}
        {messages.length === 0 && (
          <div className="flex justify-center items-center text-center px-6 w-full h-full">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-blue-600">
                Welcome to CalmBot 🤖
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-lg">
                Your AI companion for mental wellness. Let's chat—how can I
                support you today?
              </p>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="space-y-2 p-2 max-w-[800px] mx-auto w-[90%]">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start ${
                msg.id === 0 ? "justify-end" : "justify-start"
              }`}
            >
              {msg.id === 1 && (
                <img
                  src="/logo2.svg"
                  alt="AI"
                  className="w-6 h-6 mr-2 self-start"
                />
              )}

              {/* Message Avatar */}
              <div
                className={`p-3 rounded-lg text-sm text-white max-w-[60%] break-words whitespace-pre-wrap ${
                  msg.id === 0 ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                {msg.message}
              </div>

              {/* User Avatar */}
              {msg.id === 0 && (
                <img
                  src="/userAvatar.svg"
                  alt="User"
                  className="w-6 h-6 ml-2 self-start"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Message Input Field */}
      <div className="mt-4 px-4 pb-4 mx-auto w-full max-w-[800px]">
        <div className="relative w-full">
          <div className="relative w-full rounded-2xl border border-blue-500 overflow-hidden flex h-[100px] max-sm:min-h-[50px] max-h-[160px] max-sm:max-h-[60px] ">
            <textarea
              className="w-full h-full pr-12 p-3 resize-none outline-none text-sm overflow-y-auto"
              placeholder="Message CalmBot"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (message.trim()) {
                    sendMessage(message);
                    setMessage("");
                  }
                }
              }}
            />
          </div>

          {/* Arrow-Up Button Inside the Textarea */}
          <button
            className={`absolute bottom-3 right-3 p-2 rounded-full transition ${
              message.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!message.trim()}
            onClick={() => {
              if (message.trim()) {
                sendMessage(message);
                setMessage("");
              }
            }}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatArea;
