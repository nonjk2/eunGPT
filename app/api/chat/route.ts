// ./app/api/chat/route.ts
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const MY_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: MY_API_KEY || "",
});

// console.log("key 🖌️: ", MY_API_KEY);
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log(req.json());
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4-1106-preview",
  //   stream: true,
  //   messages: messages,
  //   max_tokens: 250,
  // });
  let image_url;
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt:
      "Design the user interface elements for our chat-based image generation chatbox. Create visually appealing chat bubbles, buttons, and input fields. The UI should be intuitive and user-friendly, with a touch of modern aesthetics. Use a color scheme that complements our overall website design.",
    n: 1,
    size: "1024x1024",

    // style: "vivid",
  });
  image_url = response.data[0].url;
  console.log(image_url);
  // const stream = OpenAIStream(response);
  // return new StreamingTextResponse(stream);
  return new NextResponse(image_url);
}
