import * as React from "react";
import { LuSendHorizontal } from "react-icons/lu";
import useChatbot from "../hooks/useChatbot";
import Markdown from "react-markdown";
import useChatScroll from "../hooks/useChatScroll";

const ChatComponent: React.FunctionComponent = () => {
  const [input, setInput] = React.useState("");
  const { messages, sendMessage } = useChatbot();
  const ref = useChatScroll(messages);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };
  return (
    <div className="flex flex-col h-[80vh] bg-pink-100">
      <h2 className="p-4 font-bold text-lg text-center bg-pink-100 flex text-pink-800 justify-center items-center gap-2">
        Pocket PAInter
      </h2>
      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg: { sender: string; text: string | null | undefined; }, index: React.Key | null | undefined) => (
          <div
            key={index}
            className={`p-3 rounded-md max-w-xs ${
              msg.sender === "user"
                ? "bg-pink-600 text-white ml-auto" //color scheme important
                : "bg-pink-300 text-gray-800"
            }`}
          >
            <Markdown>{msg.text}</Markdown>
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 bg-purple-90">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          placeholder="Ask away..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend} className="p-2">
          <LuSendHorizontal size={25} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;