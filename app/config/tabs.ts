import { MessageCircle, Circle, Users, Phone, Settings } from "lucide-react";
import { TabType } from "../components/MainContent";

export interface TabConfig {
    id: TabType;
    label: string;
    icon: typeof MessageCircle;
    title: string;
}

export const navigationTabs: TabConfig[] = [
    {
        id: "chats",
        label: "Chats",
        icon: MessageCircle,
        title: "Chats",
    },
    {
        id: "updates",
        label: "Updates",
        icon: Circle,
        title: "Updates",
    },
    {
        id: "communities",
        label: "Communities",
        icon: Users,
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
