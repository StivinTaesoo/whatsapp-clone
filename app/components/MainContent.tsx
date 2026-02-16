import React from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import EmptyState from "./EmptyState";
import { Chat } from "../types";
import { UpdatesTab } from "./tabs/UpdatesTab";
import { CommunitiesTab } from "./tabs/CommunitiesTab";
import { CallsTab } from "./tabs/CallsTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { createHeaderConfig } from "../config/headerConfig";
import DynamicHeaderMain from "./headers/DynamicHeaderMain";

export type TabType =
    | "chats"
    | "updates"
    | "communities"
    | "calls"
    | "settings";

interface MainContentProps {
    activeTab: TabType;
    showMobileChatList: boolean;
    selectedChatId: string | null;
    selectedChat: Chat | null;
    onChatSelect: (chatId: string) => void;
    onNewChat: () => void;
    setActiveTab: (tab: TabType) => void;
}

const MainContent: React.FC<MainContentProps> = ({
    activeTab,
    showMobileChatList,
    selectedChatId,
    selectedChat,
    onChatSelect,
    onNewChat,
    setActiveTab,
}) => {
    // Header action handlers
    const handleNewGroup = () => {
        console.log("Create new group");
        // Implement new group logic
    };

    const handleNewBroadcast = () => {
        console.log("Create new broadcast");
        // Implement new broadcast logic
    };

    const handleLinkedDevices = () => {
        console.log("Open linked devices");
        // Implement linked devices logic
    };

    const handleStarred = () => {
        console.log("Open starred messages");
        // Implement starred messages logic
    };

    const handleReadAll = () => {
        console.log("Mark all as read");
        // Implement mark all as read logic
    };

    const handleSettings = () => {
        setActiveTab("settings");
    };

    const handleNewCommunity = () => {
        console.log("Create new community");
        // Implement new community logic
    };

    const handleSearch = () => {
        console.log("Open search");
        // Implement search logic
    };

    const handleCamera = () => {
        console.log("Open camera");
        // Implement camera logic
    };

    // Create header configuration
    const headerConfig = createHeaderConfig(
        onNewChat,
        handleNewGroup,
        handleNewBroadcast,
        handleLinkedDevices,
        handleStarred,
        handleReadAll,
        handleSettings,
        handleNewCommunity,
        handleSearch,
        handleCamera,
    );

    // Get current tab's header config
    const currentHeaderConfig = headerConfig[activeTab];

    // Render non-chat tabs
    if (activeTab !== "chats") {
        return (
            <div className="flex flex-col h-full">
                <DynamicHeaderMain
                    config={currentHeaderConfig}
                    activeTab={activeTab}
                />
                <div className="flex-1 overflow-y-auto">
                    {activeTab === "updates" && <UpdatesTab />}
                    {activeTab === "communities" && <CommunitiesTab />}
                    {activeTab === "calls" && <CallsTab />}
                    {activeTab === "settings" && <SettingsTab />}
                </div>
            </div>
        );
    }

    // Render chats tab
    return (
        <div className="flex flex-1 overflow-hidden">
            {/* Chat List */}
            <div
                className={`${
                    showMobileChatList ? "block" : "hidden"
                } md:block w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col`}
            >
                <DynamicHeaderMain
                    config={currentHeaderConfig}
                    activeTab={activeTab}
                />
                <div className="flex-1 overflow-y-auto">
                    <ChatList
                        selectedChatId={selectedChatId}
                        onChatSelect={onChatSelect}
                        onNewChat={onNewChat}
                    />
                </div>
            </div>

            {/* Chat Window / Empty */}
            <div
                className={`${
                    showMobileChatList ? "hidden" : "block"
                } md:block flex-1 bg-gray-50 dark:bg-gray-900`}
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

export default MainContent;
