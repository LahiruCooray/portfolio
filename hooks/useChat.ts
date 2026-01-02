import { useState, useCallback, useRef, useEffect } from "react";

export interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const sessionIdRef = useRef<string | null>(null);

    // Load session ID from localStorage
    useEffect(() => {
        const storedSessionId = localStorage.getItem("chatSessionId");
        if (storedSessionId) {
            sessionIdRef.current = storedSessionId;
        }
    }, []);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        setIsLoading(true);
        setError(null);

        // Add user message immediately
        const userMessage: Message = {
            role: "user",
            content,
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: content,
                    sessionId: sessionIdRef.current,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle rate limit specifically
                if (response.status === 429) {
                    throw new Error(data.error || "Rate limit exceeded. Please try again later.");
                }
                throw new Error(data.error || "Failed to get response");
            }

            // Store session ID
            if (data.sessionId) {
                sessionIdRef.current = data.sessionId;
                localStorage.setItem("chatSessionId", data.sessionId);
            }

            // Add assistant message
            const assistantMessage: Message = {
                role: "assistant",
                content: data.message,
                timestamp: data.timestamp,
            };
            setMessages((prev) => [...prev, assistantMessage]);

        } catch (err: any) {
            setError(err.message || "Failed to send message");
            console.error("Chat error:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
        sessionIdRef.current = null;
        localStorage.removeItem("chatSessionId");
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages,
    };
}
