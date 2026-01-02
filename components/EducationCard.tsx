import { PortableText } from "@portabletext/react";

interface EducationCardProps {
    education: {
        institution: string;
        degree: string;
        fieldOfStudy?: string;
        startDate: string;
        endDate?: string;
        current: boolean;
        grade?: string;
        description?: any;
    };
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function EducationCard({ education }: EducationCardProps) {
    const startDateFormatted = formatDate(education.startDate);
    const endDateFormatted = education.current
        ? "Present"
        : education.endDate
            ? formatDate(education.endDate)
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
                            {education.degree}
                        </h3>
                        {education.fieldOfStudy && (
                            <p className="text-base text-zinc-600 dark:text-zinc-400">
                                {education.fieldOfStudy}
                            </p>
                        )}
                        <p className="text-base font-medium text-zinc-700 dark:text-zinc-300">
                            {education.institution}
                        </p>
                    </div>
                    <div className="flex flex-col sm:items-end text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="font-medium">
                            {startDateFormatted} - {endDateFormatted}
                        </span>
                        {education.grade && (
                            <span className="text-zinc-500 dark:text-zinc-500">
                                {education.grade}
                            </span>
                        )}
                    </div>
                </div>

                {/* Description */}
                {education.description && (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 pt-2">
                        <PortableText value={education.description} />
                    </div>
                )}
            </div>
        </div>
    );
}
