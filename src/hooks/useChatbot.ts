import { useState } from "react";
import axios from "axios";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const sendMessage = async (message: string) => {
    await delay(1000);
    const newMessages: Message[] = [
      ...messages,
      { text: message, sender: "user" },
    ];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-5.1",
          store: true,
          messages: [{ role: "user", content: message + " - Limit response to 200 words."}],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return { messages, sendMessage };
};

export default useChatbot;