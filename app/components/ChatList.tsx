"use client";

import React, { useState, useMemo } from "react";

import { formatChatTimestamp, truncateText } from "../lib/utils";
import { Chat, User } from "../types";
import { useApp } from "../contexts/AppContext";
import { MoreVertical, Plus } from "lucide-react";

interface ChatListProps {
    selectedChatId: string | null;
    onChatSelect: (chatId: string) => void;
    onNewChat: () => void;
}

const ChatList: React.FC<ChatListProps> = ({
    selectedChatId,
    onChatSelect,
    onNewChat,
}) => {
    const { chats, users, currentUserId, darkMode, toggleDarkMode } = useApp();
    const [searchQuery, setSearchQuery] = useState("");
    const [showNewChatModal, setShowNewChatModal] = useState(false);

    const currentUser = users.find((u) => u.id === currentUserId);

    // Filter chats based on search query
    const filteredChats = useMemo(() => {
        if (!searchQuery.trim()) return chats;

        return chats.filter((chat) => {
            const otherUserId = chat.participantIds.find(
                (id) => id !== currentUserId,
            );
            const otherUser = users.find((u) => u.id === otherUserId);
            return otherUser?.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        });
    }, [chats, searchQuery, currentUserId, users]);

    const getOtherUser = (chat: Chat): User | undefined => {
        const otherUserId = chat.participantIds.find(
            (id) => id !== currentUserId,
        );
        return users.find((u) => u.id === otherUserId);
    };

    const getLastMessagePreview = (chat: Chat): string => {
        if (chat.messages.length === 0) return "No messages yet";
        const lastMessage = chat.messages[chat.messages.length - 1];
        const isOwnMessage = lastMessage.senderId === currentUserId;
        const prefix = isOwnMessage ? "You: " : "";
        return prefix + truncateText(lastMessage.text, 40);
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        {/* <img
                            src={currentUser?.avatar}
                            alt="Profile"
                            className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-600"
                        />
                        <span className="font-semibold text-gray-800 dark:text-white">
                            Chats
                        </span> */}
                        <header className="bg-whatsapp text-white px-4 py-3 flex items-center justify-between border-b border-green-700/40 md:border-b md:border-gray-800">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-medium">
                                    WhatsApp
                                </h1>
                            </div>
                            <div className="flex items-center gap-5">
                                {/* <button
                            className="p-4 hover:bg-white/10 rounded-full transition-colors"
                            title="Search"
                        >
                            <Search size={20} />
                        </button> */}
                                <button
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    title="New chat"
                                    onClick={() => setShowNewChatModal(true)}
                                >
                                    <Plus size={20} />
                                </button>
                                <button
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    title="Menu"
                                >
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </header>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                            title={darkMode ? "Light mode" : "Dark mode"}
                        >
                            {darkMode ? (
                                <svg
                                    className="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5 text-gray-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={onNewChat}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                            title="New chat"
                        >
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
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Search bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search or start new chat"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-whatsapp"
                    />
                    <svg
                        className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
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
                </div>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto">
                {filteredChats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <svg
                            className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4"
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
                        <p className="text-gray-500 dark:text-gray-400">
                            {searchQuery ? "No chats found" : "No chats yet"}
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                            {searchQuery
                                ? "Try a different search"
                                : "Start a new conversation"}
                        </p>
                    </div>
                ) : (
                    filteredChats.map((chat) => {
                        const otherUser = getOtherUser(chat);
                        if (!otherUser) return null;

                        const lastMessageTime =
                            chat.messages.length > 0
                                ? formatChatTimestamp(
                                      chat.messages[chat.messages.length - 1]
                                          .timestamp,
                                  )
                                : "";

                        return (
                            <button
                                key={chat.id}
                                onClick={() => onChatSelect(chat.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 ${
                                    selectedChatId === chat.id
                                        ? "bg-gray-100 dark:bg-gray-800"
                                        : ""
                                }`}
                            >
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={otherUser.avatar}
                                        alt={otherUser.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    {otherUser.online && (
                                        <>
                                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full pulse-ring"></span>
                                        </>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                            {otherUser.name}
                                        </h3>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                                            {lastMessageTime}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                            {getLastMessagePreview(chat)}
                                        </p>
                                        {chat.unreadCount > 0 && (
                                            <span className="ml-2 flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-whatsapp text-white text-xs rounded-full flex items-center justify-center font-medium">
                                                {chat.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ChatList;
