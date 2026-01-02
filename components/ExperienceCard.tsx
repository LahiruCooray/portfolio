import { PortableText } from "@portabletext/react";

interface ExperienceCardProps {
    experience: {
        company: string;
        position: string;
        location?: string;
        startDate: string;
        endDate?: string;
        current: boolean;
        description?: any;
    };
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
    const startDateFormatted = formatDate(experience.startDate);
    const endDateFormatted = experience.current
        ? "Present"
        : experience.endDate
            ? formatDate(experience.endDate)
            : "Present";

    return (
        <div className="relative pl-8 pb-12 border-l-2 border-zinc-200 dark:border-zinc-800 last:pb-0">
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 ring-4 ring-white dark:ring-zinc-950" />

            <div className="space-y-2">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            {experience.position}
                        </h3>
                        <p className="text-base font-medium text-zinc-700 dark:text-zinc-300">
                            {experience.company}
                        </p>
                    </div>
                    <div className="flex flex-col sm:items-end text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="font-medium">
                            {startDateFormatted} - {endDateFormatted}
                        </span>
                        {experience.location && (
                            <span className="text-zinc-500 dark:text-zinc-500">
                                {experience.location}
                            </span>
                        )}
                    </div>
                </div>

                {/* Description */}
                {experience.description && (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 pt-2">
                        <PortableText value={experience.description} />
                    </div>
                )}
            </div>
        </div>
    );
}
