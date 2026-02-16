import React from "react";
import { X, ChevronRight } from "lucide-react";

interface SettingsDetailProps {
    type:
        | "account"
        | "privacy"
        | "chats"
        | "notifications"
        | "keyboard"
        | "help"
        | null;
    onClose: () => void;
}

export const SettingsDetail: React.FC<SettingsDetailProps> = ({
    type,
    onClose,
}) => {
    if (!type) return null;

    const renderContent = () => {
        switch (type) {
            case "account":
                return <AccountSettings />;
            case "privacy":
                return <PrivacySettings />;
            case "chats":
                return <ChatsSettings />;
            case "notifications":
                return <NotificationsSettings />;
            case "keyboard":
                return <KeyboardSettings />;
            case "help":
                return <HelpSettings />;
            default:
                return null;
        }
    };

    const titles = {
        account: "Account",
        privacy: "Privacy",
        chats: "Chats",
        notifications: "Notifications",
        keyboard: "Keyboard shortcuts",
        help: "Help and feedback",
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="bg-white dark:bg-gray-950 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-200 dark:border-gray-800">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                    >
                        <X
                            size={24}
                            className="text-gray-700 dark:text-gray-300"
                        />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {titles[type]}
                    </h2>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">{renderContent()}</div>
            </div>
        </div>
    );
};

// Account Settings Component
const AccountSettings = () => {
    const settingItems = [
        { label: "Privacy", description: "Manage your privacy settings" },
        {
            label: "Security",
            description: "Two-step verification, change number",
        },
        { label: "Change number", description: "Change your phone number" },
        {
            label: "Request account info",
            description: "Get a report of your account info",
        },
        {
            label: "Delete my account",
            description: "Delete your account and erase all data",
            danger: true,
        },
    ];

    return (
        <div className="p-4">
            {settingItems.map((item, index) => (
                <button
                    key={index}
                    className={`w-full flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800 ${
                        item.danger ? "text-red-600" : ""
                    }`}
                >
                    <div className="text-left">
                        <div
                            className={`text-base ${item.danger ? "text-red-600" : "text-gray-900 dark:text-white"}`}
                        >
                            {item.label}
                        </div>
                        {item.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                            </div>
                        )}
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </button>
            ))}
        </div>
    );
};

// Privacy Settings Component
const PrivacySettings = () => {
    const settingItems = [
        { label: "Last seen and online", value: "Everyone" },
        { label: "Profile photo", value: "Everyone" },
        { label: "About", value: "Everyone" },
        { label: "Status", value: "My contacts" },
        { label: "Read receipts", toggle: true, enabled: true },
        { label: "Groups", value: "Everyone" },
        { label: "Live location", value: "None" },
        { label: "Blocked contacts", value: "0" },
        {
            label: "Disappearing messages",
            description: "Default message timer",
        },
    ];

    return (
        <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Who can see my personal info
            </p>
            {settingItems.map((item, index) => (
                <button
                    key={index}
                    className="w-full flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800"
                >
                    <div className="text-left flex-1">
                        <div className="text-base text-gray-900 dark:text-white">
                            {item.label}
                        </div>
                        {item.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                            </div>
                        )}
                    </div>
                    {item.value && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            {item.value}
                            <ChevronRight size={20} className="text-gray-400" />
                        </div>
                    )}
                    {item.toggle && (
                        <div
                            className={`w-12 h-6 rounded-full ${
                                item.enabled ? "bg-green-500" : "bg-gray-300"
                            } relative transition-colors`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${
                                    item.enabled ? "right-0.5" : "left-0.5"
                                } transition-all`}
                            />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

// Chats Settings Component
const ChatsSettings = () => {
    const settingItems = [
        { label: "Theme", value: "System default" },
        { label: "Wallpaper", description: "Choose wallpaper for your chats" },
        {
            label: "Chat backup",
            description: "Back up your chats to Google Drive",
        },
        {
            label: "Chat history",
            description: "Export, clear, or archive chats",
        },
        { label: "Enter is send", toggle: true, enabled: false },
        { label: "Media auto-download", value: "Wi-Fi" },
        { label: "Archived chats", value: "0 chats" },
    ];

    return (
        <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Customize your chat experience
            </p>
            {settingItems.map((item, index) => (
                <button
                    key={index}
                    className="w-full flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800"
                >
                    <div className="text-left flex-1">
                        <div className="text-base text-gray-900 dark:text-white">
                            {item.label}
                        </div>
                        {item.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                            </div>
                        )}
                    </div>
                    {item.value && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            {item.value}
                            <ChevronRight size={20} className="text-gray-400" />
                        </div>
                    )}
                    {item.toggle && (
                        <div
                            className={`w-12 h-6 rounded-full ${
                                item.enabled ? "bg-green-500" : "bg-gray-300"
                            } relative transition-colors`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${
                                    item.enabled ? "right-0.5" : "left-0.5"
                                } transition-all`}
                            />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

// Notifications Settings Component
const NotificationsSettings = () => {
    const settingItems = [
        { label: "Show notifications", toggle: true, enabled: true },
        { label: "Show preview", toggle: true, enabled: true },
        { label: "Sounds", toggle: true, enabled: true },
        { label: "Message notifications", description: "Sound, popup, light" },
        { label: "Group notifications", description: "Sound, popup, light" },
        { label: "Reaction notifications", toggle: true, enabled: true },
    ];

    return (
        <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Manage your notification preferences
            </p>
            {settingItems.map((item, index) => (
                <button
                    key={index}
                    className="w-full flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800"
                >
                    <div className="text-left flex-1">
                        <div className="text-base text-gray-900 dark:text-white">
                            {item.label}
                        </div>
                        {item.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                            </div>
                        )}
                    </div>
                    {item.toggle && (
                        <div
                            className={`w-12 h-6 rounded-full ${
                                item.enabled ? "bg-green-500" : "bg-gray-300"
                            } relative transition-colors`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${
                                    item.enabled ? "right-0.5" : "left-0.5"
                                } transition-all`}
                            />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

// Keyboard Settings Component
const KeyboardSettings = () => {
    const shortcuts = [
        { keys: ["Ctrl", "N"], action: "Start a new chat" },
        { keys: ["Ctrl", "Shift", "N"], action: "Start a new group" },
        { keys: ["Ctrl", "K"], action: "Search or start a new chat" },
        { keys: ["Ctrl", "Shift", "F"], action: "Search messages" },
        { keys: ["Ctrl", "E"], action: "Archive chat" },
        { keys: ["Ctrl", "Shift", "M"], action: "Mute chat" },
        { keys: ["Ctrl", "Backspace"], action: "Delete chat" },
        { keys: ["Ctrl", "Shift", "U"], action: "Mark as unread" },
        { keys: ["Esc"], action: "Close current window" },
    ];

    return (
        <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Keyboard shortcuts to navigate faster
            </p>
            {shortcuts.map((shortcut, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800"
                >
                    <div className="text-sm text-gray-900 dark:text-white">
                        {shortcut.action}
                    </div>
                    <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, i) => (
                            <React.Fragment key={i}>
                                <kbd className="px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">
                                    {key}
                                </kbd>
                                {i < shortcut.keys.length - 1 && (
                                    <span className="text-gray-500">+</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Help Settings Component
const HelpSettings = () => {
    const helpItems = [
        { label: "Help centre", description: "Get help with WhatsApp" },
        { label: "Contact us", description: "Questions? We're here to help" },
        { label: "Terms and Privacy Policy", description: "View our policies" },
        { label: "App info", description: "Version 2.2024.1" },
    ];

    return (
        <div className="p-4">
            {helpItems.map((item, index) => (
                <button
                    key={index}
                    className="w-full flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800"
                >
                    <div className="text-left flex-1">
                        <div className="text-base text-gray-900 dark:text-white">
                            {item.label}
                        </div>
                        {item.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                            </div>
                        )}
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </button>
            ))}
        </div>
    );
};
