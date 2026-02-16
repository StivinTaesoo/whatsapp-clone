"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "./contexts/AppContext";
import LoginPage from "./components/LoginPage";
import NewChatModal from "./components/NewChatModal";
import { getChatById } from "./lib/storage";
import { Chat } from "./types";
import { ChevronLeft } from "lucide-react";
import MainContent, { TabType } from "./components/MainContent";
import { navigationTabs, settingsTab } from "./config/tabs";

export default function Home() {
    const { currentUserId, chats, refreshChats } = useApp();
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>("chats");
    const [showMobileChatList, setShowMobileChatList] = useState(true);

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
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-950">
            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Desktop Left Sidebar */}
                <aside className="hidden md:flex md:flex-col md:justify-between md:w-20 lg:w-24 bg-gray-900 text-white flex-shrink-0 items-center py-8 space-y-10 border-r border-gray-800">
                    {/* Logo */}

                    {/* Navigation */}
                    <nav className="flex flex-col gap- space-y-8">
                        {navigationTabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`p-3 rounded-2xl transition-all ${
                                        activeTab === tab.id
                                            ? "bg-green-600/50 text-white"
                                            : "hover:bg-gray-800"
                                    }`}
                                    title={tab.title}
                                >
                                    <Icon size={28} />
                                </button>
                            );
                        })}
                    </nav>

                    {/* Settings */}
                    <button
                        onClick={() => setActiveTab(settingsTab.id)}
                        className="mt-auto p-3 rounded-2xl hover:bg-gray-800 transition-all"
                        title={settingsTab.title}
                    >
                        <settingsTab.icon size={28} />
                    </button>
                </aside>

                {/* Main content */}
                <div className="flex flex-col flex-1">
                    <MainContent
                        activeTab={activeTab}
                        showMobileChatList={showMobileChatList}
                        selectedChatId={selectedChatId}
                        selectedChat={selectedChat}
                        onChatSelect={handleChatSelect}
                        onNewChat={() => setShowNewChatModal(true)}
                    />
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center py-1.5 shadow-lg">
                {navigationTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center py-1 px-3 flex-1 ${
                                activeTab === tab.id
                                    ? "text-whatsapp"
                                    : "text-gray-600 dark:text-gray-400"
                            }`}
                        >
                            <Icon size={24} />
                            <span className="text-xs mt-0.5">{tab.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Mobile back button */}
            {!showMobileChatList && activeTab === "chats" && (
                <button
                    onClick={handleBackToList}
                    className="md:hidden fixed top-4 left-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-xl border border-gray-200 dark:border-gray-700"
                >
                    <ChevronLeft
                        size={24}
                        className="text-gray-700 dark:text-gray-300"
                    />
                </button>
            )}

            <NewChatModal
                isOpen={showNewChatModal}
                onClose={() => setShowNewChatModal(false)}
                onChatCreated={handleChatCreated}
            />
        </div>
    );
}
