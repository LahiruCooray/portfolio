import { client } from "@/sanity/lib/client";
import { featuredProjectQuery, homeProjectsQuery, homePostsQuery, latestFypUpdateQuery } from "@/sanity/lib/queries";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import LatestUpdateBanner from "@/components/LatestUpdateBanner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const featuredProject = await client.fetch(featuredProjectQuery);
  const projects = await client.fetch(homeProjectsQuery);
  const posts = await client.fetch(homePostsQuery);
  const latestUpdate = await client.fetch(latestFypUpdateQuery);

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-24 pb-20">
      <Hero />

      {/* Skills Section */}
      <Skills />

      {/* Featured Project Section */}
      {featuredProject && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Project</h2>
            <Link href="/fyp" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              View details <ArrowRight size={14} />
            </Link>
          </div>
          <ProjectCard project={featuredProject} />

          {/* Latest FYP Update Banner */}
          {latestUpdate && (
            <div className="mt-6">
              <LatestUpdateBanner update={latestUpdate} />
            </div>
          )}
        </section>
      )}

      {/* Recent Projects */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Recent Projects</h2>
          <Link href="/projects" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Latest Writing</h2>
          <Link href="/blog" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            Read all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post: any) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
