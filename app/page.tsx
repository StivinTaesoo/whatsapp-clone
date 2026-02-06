"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "./contexts/AppContext";
import LoginPage from "./components/LoginPage";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import EmptyState from "./components/EmptyState";
import NewChatModal from "./components/NewChatModal";
import { getChatById } from "./lib/storage";
import { Chat } from "./types";

// Placeholder components — you'll implement these next
const UpdatesTab = () => (
    <div className="flex-1 flex items-center justify-center">
        Updates / Status / Channels coming soon...
    </div>
);
const CommunitiesTab = () => (
    <div className="flex-1 flex items-center justify-center">
        Communities feature coming soon...
    </div>
);
const CallsTab = () => (
    <div className="flex-1 flex items-center justify-center">
        Calls tab coming soon...
    </div>
);

export default function Home() {
    const { currentUserId, chats, refreshChats } = useApp();
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [activeTab, setActiveTab] = useState<
        "chats" | "updates" | "communities" | "calls"
    >("chats");
    const [showMobileChatList, setShowMobileChatList] = useState(true);

    // Your existing useEffects for selected chat + polling...

    useEffect(() => {
        if (selectedChatId) {
            const chat = getChatById(selectedChatId);
            setSelectedChat(chat || null);
        }
    }, [chats, selectedChatId]);

    useEffect(() => {
        if (!currentUserId) return;
        const interval = setInterval(refreshChats, 5000);
        return () => clearInterval(interval);
    }, [currentUserId, refreshChats]);

    const handleChatSelect = (chatId: string) => {
        setSelectedChatId(chatId);
        const chat = getChatById(chatId);
        setSelectedChat(chat || null);
        setShowMobileChatList(false);
    };

    const handleNewChat = () => {
        setShowNewChatModal(true);
    };

    const handleChatCreated = (chatId: string) => {
        refreshChats();
        handleChatSelect(chatId);
    };

    const handleBackToList = () => {
        setShowMobileChatList(true);
        setSelectedChatId(null);
        setSelectedChat(null);
    };

    if (!currentUserId) {
        return <LoginPage />;
    }

    const renderMainContent = () => {
        if (activeTab !== "chats") {
            // For other tabs → no split view, just full content
            switch (activeTab) {
                case "updates":
                    return <UpdatesTab />;
                case "communities":
                    return <CommunitiesTab />;
                case "calls":
                    return <CallsTab />;
            }
        }

        // Chats tab → your current layout (list + chat window)
        return (
            <div className="flex h-full overflow-hidden">
                {/* Chat list sidebar — hide on mobile when chat open */}
                <div
                    className={`${
                        showMobileChatList ? "block" : "hidden"
                    } lg:block w-full lg:w-96 flex-shrink-0 border-r border-gray-200 dark:border-gray-800`}
                >
                    <ChatList
                        selectedChatId={selectedChatId}
                        onChatSelect={handleChatSelect}
                        onNewChat={handleNewChat}
                    />
                </div>

                {/* Chat area */}
                <div
                    className={`${showMobileChatList ? "hidden" : "block"} lg:block flex-1`}
                >
                    {selectedChat ? (
                        <ChatWindow chat={selectedChat} />
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-white dark:bg-gray-900">
            {/* Header with three-dots menu (only on Chats tab for now) */}
            {activeTab === "chats" && (
                <div className="bg-whatsapp text-white px-4 py-3 flex items-center justify-between">
                    <h1 className="text-xl font-medium">WhatsApp</h1>
                    <div className="flex items-center gap-4">
                        {/* Search, new chat, etc. icons if you have them */}
                        <button className="p-1 rounded-full hover:bg-white/10">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                        <button className="p-1 rounded-full hover:bg-white/10">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                            </svg>
                        </button>
                        {/* Three dots menu */}
                        <div className="relative">
                            <button className="p-1 rounded-full hover:bg-white/10">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown menu — implement as modal or popover later */}
                            {/* For now just placeholder */}
                        </div>
                    </div>
                </div>
            )}

            {/* Main content area */}
            <div className="flex-1 overflow-hidden">{renderMainContent()}</div>

            {/* Bottom navigation bar */}
            <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center py-2">
                <button
                    onClick={() => setActiveTab("chats")}
                    className={`flex flex-col items-center p-2 ${activeTab === "chats" ? "text-whatsapp" : "text-gray-600 dark:text-gray-400"}`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 8v11c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zM8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2H8z" />
                    </svg>
                    <span className="text-xs mt-1">Chats</span>
                </button>

                <button
                    onClick={() => setActiveTab("updates")}
                    className={`flex flex-col items-center p-2 ${activeTab === "updates" ? "text-whatsapp" : "text-gray-600 dark:text-gray-400"}`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
                    </svg>
                    <span className="text-xs mt-1">Updates</span>
                </button>

                <button
                    onClick={() => setActiveTab("communities")}
                    className={`flex flex-col items-center p-2 ${activeTab === "communities" ? "text-whatsapp" : "text-gray-600 dark:text-gray-400"}`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                    <span className="text-xs mt-1">Communities</span>
                </button>

                <button
                    onClick={() => setActiveTab("calls")}
                    className={`flex flex-col items-center p-2 ${activeTab === "calls" ? "text-whatsapp" : "text-gray-600 dark:text-gray-400"}`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.2 2.2z" />
                    </svg>
                    <span className="text-xs mt-1">Calls</span>
                </button>
            </nav>

            <NewChatModal
                isOpen={showNewChatModal}
                onClose={() => setShowNewChatModal(false)}
                onChatCreated={handleChatCreated}
            />
        </div>
    );
}
