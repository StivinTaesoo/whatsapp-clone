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

export default function Home() {
    const { currentUserId, chats, refreshChats } = useApp();
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [showMobileChatList, setShowMobileChatList] = useState(true);

    // Update selected chat when chats change
    useEffect(() => {
        if (selectedChatId) {
            const chat = getChatById(selectedChatId);
            setSelectedChat(chat || null);
        }
    }, [chats, selectedChatId]);

    // Refresh chats periodically to simulate real-time updates
    useEffect(() => {
        if (!currentUserId) return;

        const interval = setInterval(() => {
            refreshChats();
        }, 5000);

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

    return (
        <div className="h-screen flex overflow-hidden bg-white dark:bg-gray-900">
            {/* Mobile back button (shows when chat is open) */}
            {!showMobileChatList && (
                <button
                    onClick={handleBackToList}
                    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
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
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
            )}

            {/* Chat list sidebar */}
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

            {/* Chat window / Empty state */}
            <div
                className={`${
                    showMobileChatList ? "hidden" : "block"
                } lg:block flex-1`}
            >
                {selectedChat ? (
                    <ChatWindow chat={selectedChat} />
                ) : (
                    <EmptyState />
                )}
            </div>

            {/* New chat modal */}
            <NewChatModal
                isOpen={showNewChatModal}
                onClose={() => setShowNewChatModal(false)}
                onChatCreated={handleChatCreated}
            />
        </div>
    );
}
