import {
    Plus,
    Camera,
    Search,
    MoreVertical,
    Users,
    Radio,
    Star,
    CheckCheck,
} from "lucide-react";
import { HeaderConfigMap } from "../types/headerTypes";
// import { HeaderConfigMap } from "../headerTypes";

export const createHeaderConfig = (
    onNewChat: () => void,
    onNewGroup: () => void,
    onNewBroadcast: () => void,
    onLinkedDevices: () => void,
    onStarred: () => void,
    onReadAll: () => void,
    onSettings: () => void,
    onNewCommunity: () => void,
    onSearch: () => void,
    onCamera: () => void,
): HeaderConfigMap => ({
    chats: {
        title: "WhatsApp",
        actions: [
            {
                icon: Camera,
                label: "Camera",
                onClick: onCamera,
                showOnMobile: true,
                showOnDesktop: false,
            },
            {
                icon: Plus,
                label: "New Chat",
                onClick: onNewChat,
                showOnMobile: false,
                showOnDesktop: true,
            },
        ],
        menuItems: [
            {
                label: "New group",
                onClick: onNewGroup,
            },
            {
                label: "New broadcast",
                onClick: onNewBroadcast,
            },
            {
                label: "Linked devices",
                onClick: onLinkedDevices,
            },
            {
                label: "Starred messages",
                onClick: onStarred,
            },
            {
                label: "Mark all as read",
                onClick: onReadAll,
                divider: true,
            },
            {
                label: "Settings",
                onClick: onSettings,
            },
        ],
    },
    updates: {
        title: "Updates",
        actions: [
            {
                icon: Search,
                label: "Search",
                onClick: onSearch,
                showOnMobile: true,
                showOnDesktop: true,
            },
        ],
        menuItems: [
            {
                label: "Status privacy",
                onClick: () => console.log("Status privacy"),
            },
            {
                label: "Settings",
                onClick: onSettings,
            },
        ],
    },
    communities: {
        title: "Communities",
        actions: [
            {
                icon: Plus,
                label: "New Community",
                onClick: onNewCommunity,
                showOnMobile: false,
                showOnDesktop: true,
            },
            {
                icon: Search,
                label: "Search",
                onClick: onSearch,
                showOnMobile: true,
                showOnDesktop: false,
            },
        ],
        menuItems: [
            {
                label: "Settings",
                onClick: onSettings,
            },
        ],
    },
    calls: {
        title: "Calls",
        actions: [
            {
                icon: Plus,
                label: "New Call",
                onClick: () => console.log("New call"),
                showOnMobile: false,
                showOnDesktop: true,
            },
            {
                icon: Search,
                label: "Search",
                onClick: onSearch,
                showOnMobile: true,
                showOnDesktop: true,
            },
        ],
        menuItems: [
            {
                label: "Clear call log",
                onClick: () => console.log("Clear call log"),
            },
            {
                label: "Settings",
                onClick: onSettings,
            },
        ],
    },
    settings: {
        title: "Settings",
        actions: [
            {
                icon: Search,
                label: "Search",
                onClick: onSearch,
                showOnMobile: false,
                showOnDesktop: false,
            },
        ],
        menuItems: [],
    },
});
