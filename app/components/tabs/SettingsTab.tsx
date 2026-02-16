import React, { useState } from "react";
import {
    Key,
    Lock,
    MessageSquare,
    Bell,
    Keyboard,
    HelpCircle,
    LogOut,
    ChevronRight,
    Search,
} from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import { SettingsDetail } from "./SettingsDetail";
// import { SettingsDetail } from "./SettingsDetail";

interface SettingItem {
    icon: React.ElementType;
    title: string;
    description: string;
    type:
        | "account"
        | "privacy"
        | "chats"
        | "notifications"
        | "keyboard"
        | "help";
}

export const SettingsTab = () => {
    const { currentUserId, logout } = useApp();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSetting, setSelectedSetting] = useState<
        | "account"
        | "privacy"
        | "chats"
        | "notifications"
        | "keyboard"
        | "help"
        | null
    >(null);

    // Get current user info - you'll need to implement this based on your user storage
    const currentUser = {
        name: "StivinTaesoo", // Replace with actual user data
        status: "Dare to Dream Big and Never Give Up o...",
        avatar: "/api/placeholder/60/60", // Replace with actual avatar
    };

    const settingsItems: SettingItem[] = [
        {
            icon: Key,
            title: "Account",
            description: "Security notifications, account info",
            type: "account",
        },
        {
            icon: Lock,
            title: "Privacy",
            description: "Blocked contacts, disappearing messages",
            type: "privacy",
        },
        {
            icon: MessageSquare,
            title: "Chats",
            description: "Theme, wallpaper, chat settings",
            type: "chats",
        },
        {
            icon: Bell,
            title: "Notifications",
            description: "Messages, groups, sounds",
            type: "notifications",
        },
        {
            icon: Keyboard,
            title: "Keyboard shortcuts",
            description: "Quick actions",
            type: "keyboard",
        },
        {
            icon: HelpCircle,
            title: "Help and feedback",
            description: "Help centre, contact us, privacy policy",
            type: "help",
        },
    ];

    const handleSettingClick = (
        type:
            | "account"
            | "privacy"
            | "chats"
            | "notifications"
            | "keyboard"
            | "help",
    ) => {
        setSelectedSetting(type);
    };

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to log out?");
        if (confirmed && logout) {
            logout();
        }
    };

    const filteredSettings = settingsItems.filter(
        (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <>
            <div className="flex h-full">
                {/* Left Panel - Settings List */}
                <div className="w-full md:w-96 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                    {/* Header */}
                    <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Search settings"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* User Profile Section */}
                    <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 p-2 rounded-lg transition-colors">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xl font-semibold">
                                    {currentUser.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                    {currentUser.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {currentUser.status}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Settings Items */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredSettings.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={() =>
                                        handleSettingClick(item.type)
                                    }
                                    className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border-b border-gray-100 dark:border-gray-800"
                                >
                                    <div className="flex-shrink-0">
                                        <Icon
                                            size={24}
                                            className="text-gray-600 dark:text-gray-400"
                                        />
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <h3 className="text-base text-gray-900 dark:text-white font-normal">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {item.description}
                                        </p>
                                    </div>
                                    <ChevronRight
                                        size={20}
                                        className="text-gray-400 flex-shrink-0"
                                    />
                                </button>
                            );
                        })}

                        {/* Log Out Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-4 flex items-center gap-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                        >
                            <div className="flex-shrink-0">
                                <LogOut
                                    size={24}
                                    className="text-red-600 dark:text-red-500"
                                />
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="text-base text-red-600 dark:text-red-500 font-normal">
                                    Log out
                                </h3>
                            </div>
                        </button>

                        {/* Empty State for Search */}
                        {searchQuery && filteredSettings.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                <Search
                                    size={48}
                                    className="text-gray-300 dark:text-gray-700 mb-3"
                                />
                                <p className="text-gray-500 dark:text-gray-400 text-center">
                                    No settings found for "{searchQuery}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Empty State (Desktop) */}
                <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <Key
                                size={48}
                                className="text-gray-400 dark:text-gray-600"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Settings
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                            Select a setting from the list to view and manage
                            your preferences
                        </p>
                    </div>
                </div>
            </div>

            {/* Settings Detail Modal (Mobile) */}
            <SettingsDetail
                type={selectedSetting}
                onClose={() => setSelectedSetting(null)}
            />
        </>
    );
};
