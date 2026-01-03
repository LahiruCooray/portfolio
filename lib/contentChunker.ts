import { client } from "@/sanity/lib/client";
import { ContentChunk } from "./vectorService";

/**
 * Fetch and chunk all Sanity content for indexing
 */
export async function fetchAndChunkContent(): Promise<ContentChunk[]> {
  const chunks: ContentChunk[] = [];

  // Fetch all content from Sanity
  const [projects, experience, education, fypUpdates, posts] = await Promise.all([
    client.fetch(`*[_type == "project"]{_id, title, description, techStack, duration}`),
    client.fetch(`*[_type == "experience"]{_id, company, position, location, description, startDate, endDate, current}`),
    client.fetch(`*[_type == "education"]{_id, institution, degree, fieldOfStudy, grade, description, startDate, endDate}`),
    client.fetch(`*[_type == "fypUpdate"]{_id, title, month, date, teamProgress, "content": pt::text(content)}`),
    client.fetch(`*[_type == "post"]{_id, title, excerpt, "content": pt::text(body)}`),
  ]);

  // Chunk projects
  projects.forEach((project: any) => {
    const text = `
      Project: ${project.title}
      Description: ${project.description}
      Tech Stack: ${project.techStack?.join(", ") || "Not specified"}
      Duration: ${project.duration || "Not specified"}
    `.trim();

    chunks.push({
      id: `project-${project._id}`,
      text,
      metadata: {
        type: "project",
        title: project.title,
        sourceId: project._id,
      },
    });
  });

  // Chunk experience
  experience.forEach((exp: any) => {
    const descText = exp.description ?
      (typeof exp.description === 'string' ? exp.description : JSON.stringify(exp.description))
      : "Not specified";

    const text = `
      Experience at ${exp.company}
      Position: ${exp.position}
      Location: ${exp.location || "Not specified"}
      Duration: ${exp.startDate} to ${exp.current ? "Present" : exp.endDate}
      Description: ${descText}
    `.trim();

    chunks.push({
      id: `experience-${exp._id}`,
      text,
      metadata: {
        type: "experience",
        title: `${exp.position} at ${exp.company}`,
        company: exp.company,
        position: exp.position,
        sourceId: exp._id,
      },
    });
  });

  // Chunk education
  education.forEach((edu: any) => {
    const descText = edu.description ?
      (typeof edu.description === 'string' ? edu.description : JSON.stringify(edu.description))
      : "Not specified";

    const text = `
      Education: ${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
      Institution: ${edu.institution}
      Grade: ${edu.grade || "Not specified"}
      Duration: ${edu.startDate} to ${edu.endDate || "Present"}
      Description: ${descText}
    `.trim();

    chunks.push({
      id: `education-${edu._id}`,
      text,
      metadata: {
        type: "education",
        title: `${edu.degree} at ${edu.institution}`,
        institution: edu.institution,
        sourceId: edu._id,
      },
    });
  });

  // Chunk FYP updates
  fypUpdates.forEach((update: any) => {
    // Extract month name from title or month field for better searchability
    const monthName = update.month || update.title?.split(':')[0] || 'Unknown';

    const text = `
      FYP Update for ${monthName} - Final Year Project Monthly Update
      Title: ${update.title}
      Month: ${monthName}
      Date: ${update.date}
      
      This is Lahiru's ${monthName} FYP (Final Year Project) update about the Aerial Manipulator project.
      
      Progress: ${update.teamProgress || "Not specified"}
      Details: ${update.content?.substring(0, 500) || "Not specified"}
    `.trim();

    chunks.push({
      id: `fypUpdate-${update._id}`,
      text,
      metadata: {
        type: "fypUpdate",
        title: update.title,
        month: monthName,
        date: update.date,
        sourceId: update._id,
      },
    });
  });

  // Chunk blog posts
  posts.forEach((post: any) => {
    const text = `
      Blog Post: ${post.title}
      Summary: ${post.excerpt || "Not specified"}
      Content: ${post.content?.substring(0, 1000) || "Not specified"}
    `.trim();

    chunks.push({
      id: `post-${post._id}`,
      text,
      metadata: {
        type: "blog",
        title: post.title,
        sourceId: post._id,
      },
    });
  });

  // Add static resume information
  const { resumeChunks } = await import("./resumeContent");
  chunks.push(...resumeChunks);

  return chunks;
}
