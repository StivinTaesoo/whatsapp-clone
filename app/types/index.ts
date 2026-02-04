export interface User {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
    lastSeen?: Date;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
    read: boolean;
}

export interface Chat {
    id: string;
    participantIds: [string, string];
    messages: Message[];
    lastMessage?: Message;
    unreadCount: number;
}

export interface AppState {
    currentUserId: string | null;
    users: User[];
    chats: Chat[];
}
