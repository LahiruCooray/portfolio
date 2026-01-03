"use client";

import { useState, useRef, useEffect } from "react";
import { X, MessageCircle, Send, Loader2 } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import ChatMessage from "./ChatMessage";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, isLoading, error, sendMessage } = useChat();

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Popup greeting - shows on load and every 5 minutes
    useEffect(() => {
        if (isOpen) {
            setShowPopup(false);
            return;
        }

        // Show popup after 1 second on initial load
        const initialTimeout = setTimeout(() => {
            setShowPopup(true);
        }, 1000);

        // Hide popup after 5 seconds
        const hideTimeout = setTimeout(() => {
            setShowPopup(false);
        }, 6000);

        // Show popup every 5 minutes (300000ms)
        const interval = setInterval(() => {
            if (!isOpen) {
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 5000);
            }
        }, 300000);

        return () => {
            clearTimeout(initialTimeout);
            clearTimeout(hideTimeout);
            clearInterval(interval);
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        await sendMessage(input);
        setInput("");
    };

    return (
        <>
            {/* Chat Button with Popup */}
            {!isOpen && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
                    {/* Popup Tooltip */}
                    {showPopup && (
                        <div className="animate-fade-in bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2.5 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium whitespace-nowrap">
                            Hey! I'm David 👋
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white dark:bg-zinc-800 border-r border-t border-zinc-200 dark:border-zinc-700 rotate-45" />
                        </div>
                    )}

                    {/* Chat Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                        aria-label="Open chat"
                    >
                        <MessageCircle size={24} />
                    </button>
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">David</h3>
                            <p className="text-xs text-blue-100">Ask me about Lahiru's work</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-blue-700 p-1 rounded transition-colors"
                            aria-label="Close chat"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center text-zinc-500 dark:text-zinc-400 py-8">
                                <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                                <p className="text-sm font-medium mb-1">
                                    Hi! I'm David, Lahiru's portfolio assistant.
                                </p>
                                <p className="text-xs mb-4">
                                    Ask me anything about his projects, experience, or skills!
                                </p>
                                <div className="mt-4 space-y-2">
                                    <button
                                        onClick={() => sendMessage("What are Lahiru's main technical skills?")}
                                        className="w-full text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        What are his main technical skills?
                                    </button>
                                    <button
                                        onClick={() => sendMessage("Tell me about the FYP project")}
                                        className="w-full text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        Tell me about the FYP project
                                    </button>
                                    <button
                                        onClick={() => sendMessage("What's his internship experience?")}
                                        className="w-full text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        What's his internship experience?
                                    </button>
                                </div>
                            </div>
                        )}
                        {messages.map((message, index) => (
                            <ChatMessage key={index} message={message} />
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin" />
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Thinking...</span>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="border-t border-zinc-200 dark:border-zinc-800 p-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white p-2 rounded-lg transition-colors"
                                aria-label="Send message"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
