import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Test endpoint to verify Groq is working
export async function GET() {
    try {
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY!,
        });

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // Current model
            messages: [
                {
                    role: "user",
                    content: "Say 'Groq is working!' if you can read this."
                }
            ],
            max_tokens: 50,
        });

        return NextResponse.json({
            success: true,
            response: completion.choices[0].message.content,
            model: "llama-3.1-70b-versatile",
        });

    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
                statusCode: error.statusCode || 500
            },
            { status: error.statusCode || 500 }
        );
    }
}
