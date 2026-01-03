import { groq } from "next-sanity";

export const projectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt desc)`;
export const featuredProjectQuery = groq`*[_type == "project" && featured == true][0]{
  ...,
  "gallery": gallery[]{
    ...,
    asset->{
      ...,
      originalFilename
    }
  },
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
export const homeProjectsQuery = groq`*[_type == "project" && featured != true] | order(order asc, _createdAt desc) [0...3]{
  ...,
  "gallery": gallery[0..4]{
    asset->{url}
  },
  "videos": videos[0..2]{
    title,
    url
  }
}`;
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc)`;
export const homePostsQuery = groq`*[_type == "post"] | order(publishedAt desc) [0...2]`;
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  "reports": reports[]{
    title,
    "file": file.asset->{url, originalFilename}
  }
}`;
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  ...,
  "gallery": gallery[]{
    ...,
    asset->{
      ...,
      originalFilename
    }
  },
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
export const fypUpdatesQuery = groq`*[_type == "fypUpdate"] | order(date desc){
  ...,
  "gallery": gallery[]{
    ...,
    asset->{
      ...,
      originalFilename
    }
  },
  "videos": videos[]{
    title,
    url
  },
  "reports": reports[]{
    title,
    "file": file.asset->{url, originalFilename}
  }
}`;
export const experienceQuery = groq`*[_type == "experience"] | order(order asc, startDate desc){
  ...,
  "gallery": gallery[]{
    asset->{url},
    caption
  }
}`;
export const educationQuery = groq`*[_type == "education"] | order(order asc, startDate desc)`;
export const latestFypUpdateQuery = groq`*[_type == "fypUpdate"] | order(date desc) [0]{
  _id,
  title,
  date,
  "excerpt": array::join(string::split(pt::text(overallUpdate), "")[0..150], "") + "...",
  "gallery": gallery[0..4]{
    ...,
    asset->{
      ...,
      url
    }
  },
  "videos": videos[0..2]{
    title,
    url
  }
}`;
