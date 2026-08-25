import { NextRequest } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `আপনি "বাংলা এআই সহকারী" — বাংলাদেশ জাতীয় তথ্য বাতায়নের (bangladesh.gov.bd) সরকারি এআই সহকারী।

আপনার দায়িত্ব:
- বাংলাদেশ সরকারি সেবা সম্পর্কে নাগরিকদের সাহায্য করা
- পাসপোর্ট, ভিসা, আয়কর, ভূমি, শিক্ষা, স্বাস্থ্য, কৃষি, নিয়োগ ইত্যাদি বিষয়ে তথ্য দেওয়া
- সঠিক, সংক্ষিপ্ত ও বানান নির্ভুল বাংলায় উত্তর দেওয়া
- প্রয়োজনে সংশ্লিষ্ট সরকারি ওয়েবসাইটের ঠিকানা উল্লেখ করা

গুরুত্বপূর্ণ ওয়েবসাইট:
- পাসপোর্ট: www.epassport.gov.bd
- আয়কর: www.nbr.gov.bd
- ভূমি: www.land.gov.bd / e-খতিয়ান: ldpgls.gov.bd
- শিক্ষা বোর্ড: www.educationboard.gov.bd
- নিয়োগ: bangladesh.gov.bd
- জরুরি সেবা: ৩৩৩ (সরকারি তথ্য), ৯৯৯ (জরুরি)

নিয়ম:
- সবসময় বাংলায় উত্তর দিন
- সংক্ষিপ্ত ও পরিষ্কার উত্তর দিন (৩-৬ বাক্য)
- যদি নিশ্চিত না হন, তবে ৩৩৩ নম্বরে যোগাযোগ করতে বলুন
- ভুল তথ্য দেবেন না — অনিশ্চিত হলে স্বীকার করুন`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] }: { message: string; history?: ChatMessage[] } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "বার্তা প্রয়োজন" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const zai = await ZAI.create();

    const messages: ChatMessage[] = [
      { role: "assistant", content: SYSTEM_PROMPT },
      ...history.slice(-6),
      { role: "user", content: message },
    ];

    const stream = await zai.chat.completions.create({
      messages,
      stream: true,
      thinking: { type: "disabled" },
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            // The SDK returns SSE text chunks (possibly as byte arrays or strings)
            let text = "";
            if (typeof chunk === "string") {
              text = chunk;
            } else if (chunk instanceof Uint8Array) {
              text = new TextDecoder().decode(chunk);
            } else if (chunk && typeof chunk === "object") {
              // Could be a structured object with choices
              const delta =
                chunk?.choices?.[0]?.delta?.content ||
                chunk?.choices?.[0]?.message?.content ||
                "";
              if (delta) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`));
                continue;
              }
              text = String(chunk);
            }

            // Parse SSE lines
            const lines = text.split("\n");
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const jsonStr = trimmed.slice(5).trim();
              if (jsonStr === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const parsed = JSON.parse(jsonStr);
                const delta = parsed?.choices?.[0]?.delta?.content || "";
                if (delta) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`)
                  );
                }
              } catch {
                // skip non-JSON lines
              }
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const errMsg =
            err instanceof Error ? err.message : "স্ট্রিমিং ত্রুটি";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                error: errMsg,
                content:
                  "দুঃখিত, সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা ৩৩৩ নম্বরে কল করুন।",
              })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat stream API error:", error);
    return new Response(
      JSON.stringify({
        error: "সার্ভার ত্রুটি",
        content:
          "দুঃখিত, সার্ভারে সাময়িক সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
