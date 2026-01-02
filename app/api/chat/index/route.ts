import { NextResponse } from "next/server";
import { fetchAndChunkContent } from "@/lib/contentChunker";
import { indexContent } from "@/lib/vectorService";

export async function POST(request: Request) {
    try {
        // Optional: Add authentication here to protect this endpoint
        // const { authorization } = request.headers;
        // if (authorization !== `Bearer ${process.env.INDEX_SECRET}`) {
        //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        console.log("Starting content indexing...");

        // Fetch and chunk all content from Sanity
        const chunks = await fetchAndChunkContent();
        console.log(`Fetched ${chunks.length} content chunks`);

        // Index content in Upstash Vector
        await indexContent(chunks);

        return NextResponse.json({
            success: true,
            message: `Successfully indexed ${chunks.length} content chunks`,
            chunks: chunks.length,
        });

    } catch (error: any) {
        console.error("Indexing error:", error);
        return NextResponse.json(
            { error: "Failed to index content", details: error.message },
            { status: 500 }
        );
    }
}
