# Portfolio Website

A modern, full-stack portfolio website built with Next.js 15, featuring an AI-powered chatbot assistant, content management through Sanity CMS, and RAG-based question answering.

## Overview

This portfolio showcases my professional work, projects, and experience. It includes dynamic content management, an intelligent chatbot assistant named David, and a clean, responsive design.

**Live Site:** [lahirucooray.dev](https://lahirucooray.dev)

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **CMS:** Sanity Studio
- **AI/ML:** Groq (Llama 3.3), Upstash Vector (RAG), HuggingFace Embeddings
- **Deployment:** Vercel
- **Icons:** Lucide React, React Icons

## Key Features

### 🎨 Dynamic Content Management
- Sanity CMS integration for managing projects, blog posts, FYP updates, education, and experience
- Image galleries with lightbox modal for all content types
- Portable text support for rich content editing

### 🤖 AI Chatbot Assistant (David)
David is an intelligent chatbot powered by Groq's Llama models and Retrieval-Augmented Generation (RAG):

- **Context-Aware Responses:** Uses vector search to retrieve relevant information from resume, projects, and content
- **Smart Classification:** Two-stage LLM system to filter irrelevant queries
- **Conversational Memory:** Maintains chat history for follow-up questions
- **Anti-Hallucination:** Strict rules to only answer from available context
- **Automatic Fallback:** Switches to backup models on rate limits with 60-min recovery
- **Contextual Search:** Combines recent messages with current query for better retrieval

**How David Works:**
1. User query → Classifier filters off-topic questions
2. Vector search finds relevant chunks (similarity > 0.55)
3. Context + chat history sent to Llama 3.3
4. Natural language response without citations

### 📱 Responsive Design
- Mobile-first approach with clean, modern UI
- Dark mode support
- Smooth animations and transitions
- Hover effects on project cards with image slideshows

### 🔍 Smart Search & Filtering
- Vector database indexing of all content
- Semantic search for portfolio information
- Context-aware query expansion

## Project Structure

```
portfolio/
├── app/                      # Next.js app directory
│   ├── api/
│   │   └── chat/            # Chatbot API routes
│   ├── projects/            # Projects page
│   ├── experience/          # Experience timeline
│   ├── education/           # Education page
│   └── fyp/                 # FYP updates
├── components/              # React components
│   ├── ChatBot.tsx          # Chatbot UI
│   ├── ProjectCard.tsx      # Project cards with hover slideshow
│   ├── ImageLightbox.tsx    # Gallery modal
│   └── ...
├── lib/
│   ├── vectorService.ts     # Upstash vector operations
│   ├── resumeContent.ts     # Static resume data
│   └── contentChunker.ts    # Content chunking for RAG
├── sanity/                  # Sanity CMS
│   ├── schemaTypes/         # Content schemas
│   └── lib/                 # Sanity client & queries
└── public/                  # Static assets
```

## Environment Variables

Create a `.env.local` file with the following:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Groq AI
GROQ_API_KEY=your_groq_api_key

# Upstash Vector Database
UPSTASH_VECTOR_REST_URL=your_upstash_url
UPSTASH_VECTOR_REST_TOKEN=your_upstash_token

# Optional
HUGGINGFACE_API_KEY=your_hf_key
INDEX_SECRET=your_secret
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LahiruCooray/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see above)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Sanity Studio

To run Sanity Studio locally:
```bash
cd sanity
npx sanity dev
```

Access at [http://localhost:3333](http://localhost:3333)

## Chatbot Setup

### Index Content

Before the chatbot can answer questions, index your content:

```bash
curl -X POST http://localhost:3000/api/chat/index
```

This creates vector embeddings for:
- Resume content
- Projects
- FYP updates
- Blog posts

### Model Configuration

The chatbot uses two models with automatic fallback:

- **Classifier:** `llama-3.1-8b-instant` → `llama-4-scout-17b`
- **Main LLM:** `llama-3.3-70b-versatile` → `llama-4-maverick-17b`

Fallback triggers on 429 rate limits and auto-recovers after 60 minutes.

## Deployment

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

The project is configured for automatic deployments on push to main.

## License

MIT License 