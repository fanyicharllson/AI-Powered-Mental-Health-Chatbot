import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ChatDashboard = () => {
  const [messages, setMessages] = useState([
    { id: 1, message: "Hello! How can I assist you today? 😊" },
  ]);
  const chatRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    window.innerWidth >= 640 // Sidebar open by default on desktop, closed on mobile
  );

  // Handle window resize to adjust sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsSidebarOpen(true); // Always open on desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if user is at the bottom of the chat
  const checkScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
  };

  // Auto-scroll when new messages are added
  useEffect(() => {
    if (isAtBottom && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage = { id: 0, message: text };
    setMessages((prev) => [...prev, userMessage]);

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
    <div className="flex w-full h-screen">
      {/* Sidebar (always present, no animation on load) */}
      <div
        className={`h-screen bg-blue-100 w-[300px] overflow-y-auto fixed left-0 top-0 sm:block ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b bg-gray-200">
          <span className="text-lg font-bold">Sidebar</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="bg-red-500 text-white px-2 py-1 rounded sm:hidden"
          >
            Close
          </button>
        </div>
      </div>

      {/* Chat Container (Adjusts based on sidebar visibility) */}
      <div
        className={`h-full flex flex-col bg-gray-100 p-4 overflow-hidden ml-auto ${
          isSidebarOpen ? "sm:ml-[300px]" : "ml-0"
        } w-full`}
      >
        {/* Open Sidebar Button (only on mobile) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded sm:hidden"
          >
            Open Sidebar
          </button>
        )}

        {/* Chat Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-2 space-y-2"
          onScroll={checkScroll}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end ${
                msg.id === 0 ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar */}
              {msg.id === 1 && (
                <img
                  src="/bot-avatar.png"
                  alt="AI"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}

              {/* Message Bubble */}
              <div
                className={`p-3 rounded-lg text-white max-w-[75%] break-words whitespace-pre-wrap ${
                  msg.id === 0 ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                {msg.message}
              </div>

              {/* Avatar (User) */}
              {msg.id === 0 && (
                <img
                  src="/user-avatar.png"
                  alt="User"
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Input Field */}
        <div className="mt-4 flex justify-center">
          <textarea
            className="w-full max-w-[800px] p-3 border rounded-lg resize-none min-h-[40px] max-h-[120px] overflow-y-auto focus:ring-1 focus:border-blue-500 focus:ring-blue-500 outline-none"
            placeholder="Message CalmBot"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage((e.target as HTMLTextAreaElement).value);
                (e.target as HTMLTextAreaElement).value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
