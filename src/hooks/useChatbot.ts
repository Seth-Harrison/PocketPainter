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
      { text: message + "\n(response limited to 200 words)", sender: "user" },
    ];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-5.1",
          store: true,
          messages: [{ role: "user", content: message }],
        },
        {
          headers: {
            //Authorization: `Bearer API KEY HERE IMPORTANT`,
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