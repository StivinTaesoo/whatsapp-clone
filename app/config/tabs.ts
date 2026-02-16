import { Phone, Settings } from "lucide-react";
import { TabType } from "../components/MainContent";
import {
    ChatIcon,
    CommunityIcon,
    StatusIcon,
} from "../components/icons/CustomIcons";

export interface TabConfig {
    id: TabType;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
}

export const navigationTabs: TabConfig[] = [
    {
        id: "chats",
        label: "Chats",
        icon: ChatIcon,
        title: "Chats",
    },
    {
        id: "updates",
        label: "Updates",
        icon: StatusIcon,
        title: "Updates",
    },
    {
        id: "communities",
        label: "Communities",
        icon: CommunityIcon,
        title: "Communities",
    },
    {
        id: "calls",
        label: "Calls",
        icon: Phone,
        title: "Calls",
    },
];

export const settingsTab: TabConfig = {
    id: "settings",
    label: "Settings",
    icon: Settings,
    title: "Settings",
};
