"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data, isLoading } =
    useChat();
  return (
    <div className="flex relative flex-col w-full h-full mx-auto ">
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {messages.length > 0
          ? messages.map((m) => {
              if (m.content.startsWith("https://")) {
                return <img src={m.content} alt="adf" />;
              }
              return (
                <div key={m.id} className="whitespace-pre-wrap">
                  {m.role === "user" ? "User: " : "AI: "}
                  {m.content}
                </div>
              );
            })
          : null}

        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
