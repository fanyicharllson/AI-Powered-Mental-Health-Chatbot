import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ChatDashboard = () => {
  const [messages, setMessages] = useState([
    { id: 1, message: "Hello! How can I assist you today? 😊" },
  ]);
  const chatRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      <div className="sm:flex max-sm:flex h-screen">
        {/* Collapsible Sidebar for Desktop */}
        <motion.div
          // Animate the width between full and collapsed (256px vs 64px)
          initial={false}
          animate={{ width: isSidebarOpen ? 256 : 64 }}
          transition={{ duration: 0.3 }}
          className="max-sm:hidden flex flex-col fixed inset-y-0 left-0 bg-blue-100 shadow-lg z-20 overflow-hidden"
        >
          <div className="p-4 flex items-center border-b bg-gray-200">
            {isSidebarOpen && (
              <span className="text-lg font-bold flex-1">Sidebar</span>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              {isSidebarOpen ? "<" : ">"}
            </button>
          </div>
          {/* Sidebar Content */}
          <div className="flex-1 p-4">
            <ul>
              <li className="flex items-center mb-4">
                <img src="/home-icon.png" alt="Home" className="w-6 h-6" />
                {isSidebarOpen && <span className="ml-2">Home</span>}
              </li>
              <li className="flex items-center mb-4">
                <img src="/chat-icon.png" alt="Chat" className="w-6 h-6" />
                {isSidebarOpen && <span className="ml-2">Chat</span>}
              </li>
              {/* Add more sidebar items as needed */}
            </ul>
          </div>
        </motion.div>

        {/* Main Chat Area */}
        <div
          className={`flex-1 flex flex-col bg-gray-100 w-[90%] overflow-hidden  transition-all duration-300 ${
            isSidebarOpen ? "sm:ml-64" : "sm:ml-16"
          }`}
        >
          {/* Nav element visible on only mobile device */}
          <div className="sm:hidden bg-red-500 px-3 py-2">
            fkjhfgjfhgjkfhdkhfgk
          </div>

          {/* Chat Container: Full width for the scrollbar */}
          <div
            className="flex-1 overflow-y-auto"
            ref={chatRef}
            onScroll={checkScroll}
          >
            <div className="space-y-2 p-2 max-w-[800px] mx-auto w-[90%]">
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
                  {msg.id === 1 && (
                    <img
                      src="/bot-avatar.png"
                      alt="AI"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div
                    className={`p-3 rounded-lg text-sm text-white max-w-[60%] break-words whitespace-pre-wrap ${
                      msg.id === 0 ? "bg-blue-500" : "bg-gray-700"
                    }`}
                  >
                    {msg.message}
                  </div>
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
          </div>

          {/* Input Field */}
          <div className="mt-4 px-4 pb-4 mx-auto w-full max-w-[800px]">
            <textarea
              className="w-full p-3 border rounded-lg resize-none min-h-[40px] max-h-[120px] overflow-y-auto focus:ring-1 focus:border-blue-500 focus:ring-blue-500 outline-none text-sm"
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
    </>
  );
};

export default ChatDashboard;
