import { Chat, Message, User } from "../types";

const STORAGE_KEYS = {
    CURRENT_USER: "whatsapp_current_user",
    USERS: "whatsapp_users",
    CHATS: "whatsapp_chats",
};

// Helper to safely parse dates
const parseDate = (date: any): Date => {
    if (date instanceof Date) return date;
    return new Date(date);
};

// Initialize dummy data
const DUMMY_USERS: User[] = [
    {
        id: "1",
        name: "Alice Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        online: true,
    },
    {
        id: "2",
        name: "Bob Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
        online: false,
        lastSeen: new Date(Date.now() - 3600000),
    },
    {
        id: "3",
        name: "Charlie Davis",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
        online: true,
    },
    {
        id: "4",
        name: "Diana Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
        online: false,
        lastSeen: new Date(Date.now() - 86400000),
    },
    {
        id: "5",
        name: "Eve Martinez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
        online: true,
    },
];

const DUMMY_CHATS: Chat[] = [
    {
        id: "chat-1-2",
        participantIds: ["1", "2"],
        messages: [
            {
                id: "msg-1",
                senderId: "2",
                text: "Hey! How are you doing?",
                timestamp: new Date(Date.now() - 7200000),
                read: true,
            },
            {
                id: "msg-2",
                senderId: "1",
                text: "I'm great! Just finished a new project 🎉",
                timestamp: new Date(Date.now() - 7000000),
                read: true,
            },
            {
                id: "msg-3",
                senderId: "2",
                text: "That's awesome! Tell me more about it",
                timestamp: new Date(Date.now() - 3600000),
                read: false,
            },
        ],
        unreadCount: 1,
    },
    {
        id: "chat-1-3",
        participantIds: ["1", "3"],
        messages: [
            {
                id: "msg-4",
                senderId: "3",
                text: "Want to grab coffee later?",
                timestamp: new Date(Date.now() - 1800000),
                read: false,
            },
        ],
        unreadCount: 1,
    },
    {
        id: "chat-1-4",
        participantIds: ["1", "4"],
        messages: [
            {
                id: "msg-5",
                senderId: "1",
                text: "Thanks for the help yesterday!",
                timestamp: new Date(Date.now() - 172800000),
                read: true,
            },
            {
                id: "msg-6",
                senderId: "4",
                text: "No problem at all! Happy to help 😊",
                timestamp: new Date(Date.now() - 172700000),
                read: true,
            },
        ],
        unreadCount: 0,
    },
    {
        id: "chat-1-5",
        participantIds: ["1", "5"],
        messages: [
            {
                id: "msg-7",
                senderId: "5",
                text: "Did you see the news today?",
                timestamp: new Date(Date.now() - 900000),
                read: false,
            },
            {
                id: "msg-8",
                senderId: "5",
                text: "It's pretty wild!",
                timestamp: new Date(Date.now() - 890000),
                read: false,
            },
        ],
        unreadCount: 2,
    },
];

// Initialize storage with dummy data if empty
export const initializeStorage = (): void => {
    if (typeof window === "undefined") return;

    const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!existingUsers) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DUMMY_USERS));
    }

    const existingChats = localStorage.getItem(STORAGE_KEYS.CHATS);
    if (!existingChats) {
        localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(DUMMY_CHATS));
    }
};

// Current User
export const getCurrentUserId = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
};

export const setCurrentUserId = (userId: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId);
};

export const clearCurrentUser = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Users
export const getUsers = (): User[] => {
    if (typeof window === "undefined") return [];
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!users) return [];

    const parsed = JSON.parse(users);
    return parsed.map((user: any) => ({
        ...user,
        lastSeen: user.lastSeen ? parseDate(user.lastSeen) : undefined,
    }));
};

export const updateUserOnlineStatus = (
    userId: string,
    online: boolean,
): void => {
    if (typeof window === "undefined") return;
    const users = getUsers();
    const updatedUsers = users.map((user) =>
        user.id === userId
            ? { ...user, online, lastSeen: online ? undefined : new Date() }
            : user,
    );
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
};

// Chats
export const getChats = (): Chat[] => {
    if (typeof window === "undefined") return [];
    const chats = localStorage.getItem(STORAGE_KEYS.CHATS);
    if (!chats) return [];

    const parsed = JSON.parse(chats);
    return parsed.map((chat: any) => ({
        ...chat,
        messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: parseDate(msg.timestamp),
        })),
        lastMessage: chat.lastMessage
            ? {
                  ...chat.lastMessage,
                  timestamp: parseDate(chat.lastMessage.timestamp),
              }
            : undefined,
    }));
};

export const saveChats = (chats: Chat[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
};

export const getChatById = (chatId: string): Chat | undefined => {
    const chats = getChats();
    return chats.find((chat) => chat.id === chatId);
};

export const getChatByParticipants = (
    user1Id: string,
    user2Id: string,
): Chat | undefined => {
    const chats = getChats();
    return chats.find(
        (chat) =>
            (chat.participantIds[0] === user1Id &&
                chat.participantIds[1] === user2Id) ||
            (chat.participantIds[0] === user2Id &&
                chat.participantIds[1] === user1Id),
    );
};

export const addMessage = (
    chatId: string,
    message: Omit<Message, "id">,
): void => {
    const chats = getChats();
    const chatIndex = chats.findIndex((chat) => chat.id === chatId);

    if (chatIndex === -1) return;

    const newMessage: Message = {
        ...message,
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    chats[chatIndex].messages.push(newMessage);
    chats[chatIndex].lastMessage = newMessage;

    // Update unread count if message is from other user
    const currentUserId = getCurrentUserId();
    if (message.senderId !== currentUserId) {
        chats[chatIndex].unreadCount += 1;
    }

    saveChats(chats);
};

export const markChatAsRead = (chatId: string): void => {
    const chats = getChats();
    const chatIndex = chats.findIndex((chat) => chat.id === chatId);

    if (chatIndex === -1) return;

    chats[chatIndex].unreadCount = 0;
    chats[chatIndex].messages = chats[chatIndex].messages.map((msg) => ({
        ...msg,
        read: true,
    }));

    saveChats(chats);
};

export const createChat = (
    currentUserId: string,
    otherUserId: string,
): Chat => {
    const chats = getChats();
    const chatId = `chat-${currentUserId}-${otherUserId}`;

    const newChat: Chat = {
        id: chatId,
        participantIds: [currentUserId, otherUserId],
        messages: [],
        unreadCount: 0,
    };

    chats.push(newChat);
    saveChats(chats);

    return newChat;
};

// Get user's chats sorted by last message time
export const getUserChats = (userId: string): Chat[] => {
    const chats = getChats();
    const userChats = chats.filter((chat) =>
        chat.participantIds.includes(userId),
    );

    // Sort by last message timestamp (most recent first)
    return userChats.sort((a, b) => {
        const aTime =
            a.messages.length > 0
                ? a.messages[a.messages.length - 1].timestamp.getTime()
                : 0;
        const bTime =
            b.messages.length > 0
                ? b.messages[b.messages.length - 1].timestamp.getTime()
                : 0;
        return bTime - aTime;
    });
};
