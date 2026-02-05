"use client";

import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { createChat, getChatByParticipants } from "../lib/storage";

interface NewChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onChatCreated: (chatId: string) => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({
    isOpen,
    onClose,
    onChatCreated,
}) => {
    const { users, currentUserId, refreshChats } = useApp();
    const [searchQuery, setSearchQuery] = useState("");

    if (!isOpen) return null;

    const availableUsers = users
        .filter((user) => user.id !== currentUserId)
        .filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

    const handleUserSelect = (userId: string) => {
        if (!currentUserId) return;

        // Check if chat already exists
        let chat = getChatByParticipants(currentUserId, userId);

        // If not, create new chat
        if (!chat) {
            chat = createChat(currentUserId, userId);
            refreshChats();
        }

        onChatCreated(chat.id);
        onClose();
        setSearchQuery("");
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-bounce-in">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            New Chat
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <svg
                                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Search */}
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-whatsapp"
                                autoFocus
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

                    {/* User list */}
                    <div className="max-h-96 overflow-y-auto">
                        {availableUsers.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <svg
                                    className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {searchQuery
                                        ? "No users found"
                                        : "No users available"}
                                </p>
                            </div>
                        ) : (
                            availableUsers.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => handleUserSelect(user.id)}
                                    className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="relative">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        {user.online && (
                                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                        )}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {user.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {user.online ? "Online" : "Offline"}
                                        </p>
                                    </div>
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewChatModal;
