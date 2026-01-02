import { Message } from "@/hooks/useChat";

interface ChatMessageProps {
    message: Message;
}

function formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
                <div
                    className={`rounded-2xl px-4 py-2.5 ${isUser
                            ? "bg-blue-600 text-white"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        }`}
                >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className={`text-xs text-zinc-400 mt-1 px-2 ${isUser ? "text-right" : "text-left"}`}>
                    {formatTime(message.timestamp)}
                </p>
            </div>
        </div>
    );
}
