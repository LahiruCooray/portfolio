import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight">
                    Lahiru Cooray<span className="text-blue-500">.</span>
                </Link>
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                            Home
                        </Link>
                        <Link href="/fyp" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                            FYP
                        </Link>
                        <Link href="/projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                            Projects
                        </Link>
                        <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                            Blog
                        </Link>
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
