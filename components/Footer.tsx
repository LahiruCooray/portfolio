export default function Footer() {
    return (
        <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 py-8 mt-auto">
            <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
                <p>© {new Date().getFullYear()} Lahiru Cooray. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="https://www.linkedin.com/in/lahiru-cooray-18b406241/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        LinkedIn
                    </a>
                    <a href="https://github.com/LahiruCooray" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        GitHub
                    </a>
                    <a href="mailto:lahirukanishka2000@gmail.com" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
}
