import React from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import EmptyState from "./EmptyState";
import { Chat } from "../types";
import { UpdatesTab } from "./tabs/UpdatesTab";
import { CommunitiesTab } from "./tabs/CommunitiesTab";
import { CallsTab } from "./tabs/CallsTab";
import { SettingsTab } from "./tabs/SettingsTab";

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
}

const MainContent: React.FC<MainContentProps> = ({
    activeTab,
    showMobileChatList,
    selectedChatId,
    selectedChat,
    onChatSelect,
    onNewChat,
}) => {
    if (activeTab !== "chats") {
        switch (activeTab) {
            case "updates":
                return <UpdatesTab />;
            case "communities":
                return <CommunitiesTab />;
            case "calls":
                return <CallsTab />;
            case "settings":
                return <SettingsTab />;
        }
    }

    return (
        <div className="flex flex-1 overflow-hidden">
            {/* Chat List */}
            <div
                className={`${
                    showMobileChatList ? "block" : "hidden"
                } md:block w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-y-auto`}
            >
                <ChatList
                    selectedChatId={selectedChatId}
                    onChatSelect={onChatSelect}
                    onNewChat={onNewChat}
                />
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
