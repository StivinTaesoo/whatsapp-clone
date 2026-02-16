import { LucideIcon } from "lucide-react";
import { TabType } from "../components/MainContent";
// import { TabType } from "./components/MainContent";

export interface HeaderAction {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    showOnMobile?: boolean;
    showOnDesktop?: boolean;
}

export interface MenuDropdownItem {
    label: string;
    onClick: () => void;
    divider?: boolean; // Add a divider after this item
}

export interface HeaderConfig {
    title: string;
    actions?: HeaderAction[];
    menuItems?: MenuDropdownItem[];
    showSearch?: boolean;
}

export type HeaderConfigMap = {
    [key in TabType]: HeaderConfig;
};
