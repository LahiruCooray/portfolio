import Image from "next/image";

export default function Hero() {
    return (
        <section className="py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                {/* Text Content - spans 7 columns */}
                <div className="lg:col-span-7 flex flex-col items-start space-y-8">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Available for Opportunities
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                        Lahiru Cooray
                    </h1>

                    <h2 className="text-xl lg:text-2xl font-light text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                        Electronic & Telecommunication Engineering Undergraduate <br className="hidden lg:block" />
                        <span className="text-zinc-800 dark:text-zinc-200 font-normal">University of Moratuwa, Sri Lanka</span>
                    </h2>

                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
                        Focusing on <span className="text-zinc-900 dark:text-zinc-100 font-medium">Robotics</span>, <span className="text-zinc-900 dark:text-zinc-100 font-medium">Autonomous Systems</span>, and <span className="text-zinc-900 dark:text-zinc-100 font-medium">Machine Learning</span>.
                        Building precise, scalable, and intelligent solutions for complex engineering challenges.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a
                            href="https://github.com/LahiruCooray"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-md bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                        >
                            GitHub Profile
                        </a>
                        <a
                            href="https://www.linkedin.com/in/lahiru-cooray-18b406241/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="mailto:lahirukanishka2000@gmail.com"
                            className="px-6 py-3 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                        >
                            Email Contact
                        </a>
                    </div>
                </div>

                {/* Image - spans 5 columns */}
                <div className="lg:col-span-5 relative">
                    <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none">
                        {/* Structural frame element */}
                        <div className="absolute inset-0 border border-zinc-800/10 dark:border-white/10 translate-x-4 translate-y-4 rounded-sm"></div>

                        <div className="relative h-full w-full rounded-sm overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                            <Image
                                src="/LahiruCooray.jpg"
                                alt="Lahiru Cooray"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                                priority
                            />
                            {/* Overlay gradient for better text contrast if needed, mostly style */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent opacity-60"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
