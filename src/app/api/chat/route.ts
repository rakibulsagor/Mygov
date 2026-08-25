import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const maxDuration = 30;

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
- নিয়োগ: www.jobscircularbd.com / bangladesh.gov.bd
- জরুরি সেবা: ৩৩৩ (সরকারি তথ্য), ৯৯৯ (জরুরি)

নিয়ম:
- সবসময় বাংলায় উত্তর দিন
- সংক্ষিপ্ত ও পরিষ্কার উত্তর দিন (৩-৫ বাক্য)
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
      return NextResponse.json(
        { error: "বার্তা প্রয়োজন", reply: "দুঃখিত, আমি আপনার বার্তা বুঝতে পারিনি। আবার চেষ্টা করুন।" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const messages: ChatMessage[] = [
      { role: "assistant", content: SYSTEM_PROMPT },
      ...history.slice(-6),
      { role: "user", content: message },
    ];

    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: "disabled" },
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "দুঃখিত, এই মুহূর্তে উত্তর দেওয়া সম্ভব হচ্ছে না। পরে আবার চেষ্টা করুন অথবা ৩৩৩ নম্বরে কল করুন।";

    return NextResponse.json({
      reply,
      ok: true,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "সার্ভার ত্রুটি",
        reply:
          "দুঃখিত, সার্ভারে সাময়িক সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন অথবা ৩৩৩ নম্বরে কল করুন।",
        ok: false,
      },
      { status: 500 }
    );
  }
}
