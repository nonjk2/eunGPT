// ./app/api/chat/route.ts
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const MY_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: MY_API_KEY || "",
});
// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages, data } = await req.json();

  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 150,

    messages: [
      // ...initialMessages,
      {
        ...currentMessage,
        content: [
          {
            type: "text",
            text: "Use text to describe the person in the photo as a prompt.",
          },
          {
            type: "image_url",
            image_url: {
              url: "https://file.notion.so/f/f/ba5b9793-da59-4620-84f6-2e8500be2ae2/0914ab0c-3180-40a8-9fc7-9acda96bf604/IMG_7680.jpeg?id=2a37c5a8-2abd-4227-971b-fabf3a73f3ed&table=block&spaceId=ba5b9793-da59-4620-84f6-2e8500be2ae2&expirationTimestamp=1701352800000&signature=Rch2Qg6ZsgPpPVydX9u4vrLCUMg2uPmJaSwDn6z3QvI&downloadName=IMG_7680.jpeg",
              detail: "high",
            },
          },
          {
            type: "image_url",
            image_url: {
              url: "https://file.notion.so/f/f/ba5b9793-da59-4620-84f6-2e8500be2ae2/0914ab0c-3180-40a8-9fc7-9acda96bf604/IMG_7680.jpeg?id=2a37c5a8-2abd-4227-971b-fabf3a73f3ed&table=block&spaceId=ba5b9793-da59-4620-84f6-2e8500be2ae2&expirationTimestamp=1701352800000&signature=Rch2Qg6ZsgPpPVydX9u4vrLCUMg2uPmJaSwDn6z3QvI&downloadName=IMG_7680.jpeg",
              detail: "high",
            },
          },
          {
            type: "image_url",
            image_url: {
              url: "https://file.notion.so/f/f/ba5b9793-da59-4620-84f6-2e8500be2ae2/0914ab0c-3180-40a8-9fc7-9acda96bf604/IMG_7680.jpeg?id=2a37c5a8-2abd-4227-971b-fabf3a73f3ed&table=block&spaceId=ba5b9793-da59-4620-84f6-2e8500be2ae2&expirationTimestamp=1701352800000&signature=Rch2Qg6ZsgPpPVydX9u4vrLCUMg2uPmJaSwDn6z3QvI&downloadName=IMG_7680.jpeg",
              detail: "high",
            },
          },
        ],
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
