"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../contexts/AppContext";
import { Chat, Message } from "../types";
import {
    formatMessageTimestamp,
    formatLastSeen,
    COMMON_EMOJIS,
} from "../lib/utils";
import { addMessage, markChatAsRead } from "../lib/storage";

interface ChatWindowProps {
    chat: Chat;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
    const { currentUserId, users, refreshChats } = useApp();
    const [messageText, setMessageText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const otherUserId = chat.participantIds.find((id) => id !== currentUserId);
    const otherUser = users.find((u) => u.id === otherUserId);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat.messages]);

    // Mark chat as read when opened
    useEffect(() => {
        if (chat.unreadCount > 0) {
            markChatAsRead(chat.id);
            refreshChats();
        }
    }, [chat.id]);

    const handleSendMessage = () => {
        if (!messageText.trim() || !currentUserId) return;

        const newMessage: Omit<Message, "id"> = {
            senderId: currentUserId,
            text: messageText.trim(),
            timestamp: new Date(),
            read: false,
        };

        addMessage(chat.id, newMessage);
        setMessageText("");
        setShowEmojiPicker(false);
        refreshChats();

        // Focus back on input
        inputRef.current?.focus();
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleEmojiSelect = (emoji: string) => {
        setMessageText((prev) => prev + emoji);
        inputRef.current?.focus();
    };

    if (!otherUser) return null;

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <img
                    src={otherUser.avatar}
                    alt={otherUser.name}
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                        {otherUser.name}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {otherUser.online
                            ? "online"
                            : otherUser.lastSeen
                              ? formatLastSeen(otherUser.lastSeen)
                              : "offline"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <svg
                            className="w-5 h-5 text-gray-600 dark:text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <svg
                            className="w-5 h-5 text-gray-600 dark:text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 chat-background">
                {chat.messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-10 h-10 text-gray-400 dark:text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            No messages yet
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                            Send a message to start the conversation
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {chat.messages.map((message, index) => {
                            const isOwnMessage =
                                message.senderId === currentUserId;
                            const showTimestamp =
                                index === 0 ||
                                message.timestamp.getTime() -
                                    chat.messages[
                                        index - 1
                                    ].timestamp.getTime() >
                                    300000; // 5 minutes

                            return (
                                <div key={message.id}>
                                    {showTimestamp && (
                                        <div className="flex justify-center mb-4">
                                            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg text-xs text-gray-500 dark:text-gray-400 shadow-sm">
                                                {formatMessageTimestamp(
                                                    message.timestamp,
                                                )}
                                            </span>
                                        </div>
                                    )}
                                    <div
                                        className={`flex ${
                                            isOwnMessage
                                                ? "justify-end"
                                                : "justify-start"
                                        } message-enter`}
                                    >
                                        <div
                                            className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm ${
                                                isOwnMessage
                                                    ? "bg-whatsapp text-white rounded-br-none"
                                                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                                            }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap break-words">
                                                {message.text}
                                            </p>
                                            <div className="flex items-center justify-end gap-1 mt-1">
                                                <span
                                                    className={`text-xs ${
                                                        isOwnMessage
                                                            ? "text-green-100"
                                                            : "text-gray-500 dark:text-gray-400"
                                                    }`}
                                                >
                                                    {message.timestamp.toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        },
                                                    )}
                                                </span>
                                                {isOwnMessage && (
                                                    <svg
                                                        className={`w-4 h-4 ${
                                                            message.read
                                                                ? "text-blue-300"
                                                                : "text-green-100"
                                                        }`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input area */}
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-end gap-2">
                    <div className="relative">
                        <button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <svg
                                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>

                        {/* Emoji picker */}
                        {showEmojiPicker && (
                            <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 w-80 z-10">
                                <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Emojis
                                    </span>
                                    <button
                                        onClick={() =>
                                            setShowEmojiPicker(false)
                                        }
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="emoji-grid">
                                    {COMMON_EMOJIS.map((emoji, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleEmojiSelect(emoji)
                                            }
                                            className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 relative">
                        <textarea
                            ref={inputRef}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message"
                            rows={1}
                            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-whatsapp max-h-32"
                            style={{ minHeight: "40px" }}
                        />
                    </div>

                    <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            messageText.trim()
                                ? "bg-whatsapp hover:bg-whatsapp-dark text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
