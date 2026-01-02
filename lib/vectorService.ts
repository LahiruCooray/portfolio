import { Index } from "@upstash/vector";
import { HfInference } from "@huggingface/inference";

// Initialize Upstash Vector client
const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

// Initialize Hugging Face Inference API (free, no API key needed!)
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || "");

export interface ContentChunk {
  id: string;
  text: string;
  metadata: {
    type: "project" | "experience" | "education" | "fypUpdate" | "blog" | "resume";
    title: string;
    [key: string]: any;
  };
}

/**
 * Generate embedding for text using Hugging Face
 * Uses sentence-transformers/all-MiniLM-L6-v2 (384 dimensions)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: text,
  });

  // Response is already an array of numbers
  return response as number[];
}

/**
 * Generate query embedding (same as document for this model)
 */
export async function generateQueryEmbedding(query: string): Promise<number[]> {
  return generateEmbedding(query);
}

/**
 * Store content chunks in vector database
 */
export async function indexContent(chunks: ContentChunk[]): Promise<void> {
  const vectors = await Promise.all(
    chunks.map(async (chunk) => {
      const embedding = await generateEmbedding(chunk.text);
      return {
        id: chunk.id,
        vector: embedding,
        metadata: {
          ...chunk.metadata,
          text: chunk.text, // Store text in metadata for retrieval
        },
      };
    })
  );

  // Upsert vectors to Upstash (batch operation)
  await vectorIndex.upsert(vectors);
  console.log(`Indexed ${vectors.length} content chunks`);
}

/**
 * Search for similar content based on query
 */
export async function searchSimilarContent(
  query: string,
  topK: number = 3
): Promise<Array<{ id: string; score: number; metadata: any }>> {
  const queryEmbedding = await generateQueryEmbedding(query);

  const results = await vectorIndex.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });

  return results.map((result) => ({
    id: String(result.id), // Convert to string to ensure type consistency
    score: result.score,
    metadata: result.metadata,
  }));
}

/**
 * Delete all vectors (useful for re-indexing)
 */
export async function clearIndex(): Promise<void> {
  console.log("Note: Upstash Vector doesn't support clearing all. Re-indexing will overwrite existing vectors.");
}
