// ./app/api/chat/route.ts
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const MY_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: MY_API_KEY || "",
});

console.log("key 🖌️: ", MY_API_KEY);
// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();
  console.log(req.json());
  // Ask OpenAI for a streaming chat completion given the prompt
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4-1106-preview",
  //   stream: true,
  //   messages: messages,
  //   max_tokens: 250,
  // });
  let image_url;
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt:
      "The individual depicted in the photo appears to be a young male with a neat appearance. He has dark hair, neatly styled with a fringe that falls just above his eyebrows, full lips, and a clear complexion. His expression is calm and his gaze is directed straight at the camera, offering a neutral expression. The person is dressed in a formal suit with a white shirt and dark tie, indicating a professional or formal occasion. The suit seems to feature distinctive white piping or trimming along the edges, adding a unique detail to the ensemble. The background is plain and dark, which brings the focus entirely on the individual. Draw a picture of my face, just like the real picture.",
    n: 1,
    size: "1024x1024",
    style: "vivid",
  });
  image_url = response.data[0].url;
  // console.log(image_url);
  // Convert the response into a friendly text-stream
  // const stream = OpenAIStream(response);
  // Respond with the stream
  // return new StreamingTextResponse(stream);
  return new NextResponse(image_url);
}
