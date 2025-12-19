import { groq } from "next-sanity";

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc)`;
export const featuredProjectQuery = groq`*[_type == "project" && featured == true][0]`;
export const homeProjectsQuery = groq`*[_type == "project" && featured != true] | order(_createdAt desc) [0...3]`;
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc)`;
export const homePostsQuery = groq`*[_type == "post"] | order(publishedAt desc) [0...2]`;
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`;
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  ...,
  "reports": reports[]{
    title,
    "file": file.asset->{url, originalFilename}
  },
  "documentation": documentation[]{
    title,
    url,
    "file": file.asset->{url, originalFilename}
  }
}`;
export const fypUpdatesQuery = groq`*[_type == "fypUpdate"] | order(date desc)`;
