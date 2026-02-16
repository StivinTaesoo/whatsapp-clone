"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { Chat, User } from "../types";
import {
    getCurrentUserId,
    getUserChats,
    getUsers,
    initializeStorage,
} from "../lib/storage";

interface AppContextType {
    currentUserId: string | null;
    setCurrentUserId: (userId: string | null) => void;
    users: User[];
    chats: Chat[];
    refreshChats: () => void;
    refreshUsers: () => void;
    darkMode: boolean;
    toggleDarkMode: () => void;
    logout: () => void; // Add this
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [currentUserId, setCurrentUserIdState] = useState<string | null>(
        null,
    );
    const [users, setUsers] = useState<User[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);
    const [darkMode, setDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Initialize on mount
    useEffect(() => {
        setMounted(true);
        initializeStorage();
        const userId = getCurrentUserId();
        setCurrentUserIdState(userId);
        setUsers(getUsers());

        if (userId) {
            setChats(getUserChats(userId));
        }

        // Check for dark mode preference
        const darkModePreference = localStorage.getItem("darkMode");
        if (darkModePreference === "true") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const setCurrentUserId = (userId: string | null) => {
        setCurrentUserIdState(userId);
        if (userId) {
            refreshChats();
            refreshUsers();
        }
    };

    const refreshChats = () => {
        if (currentUserId) {
            setChats(getUserChats(currentUserId));
        }
    };

    const refreshUsers = () => {
        setUsers(getUsers());
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("darkMode", String(newDarkMode));

        if (newDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    // Add logout function
    const logout = () => {
        // Clear current user
        setCurrentUserIdState(null);

        // Clear chats
        setChats([]);

        // Remove from localStorage
        localStorage.removeItem("currentUserId");

        // Optional: You might want to clear other user-specific data
        // localStorage.removeItem("userPreferences");
        // etc.

        console.log("User logged out successfully");
    };

    if (!mounted) {
        return null;
    }

    return (
        <AppContext.Provider
            value={{
                currentUserId,
                setCurrentUserId,
                users,
                chats,
                refreshChats,
                refreshUsers,
                darkMode,
                toggleDarkMode,
                logout, // Add this to the provider value
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
