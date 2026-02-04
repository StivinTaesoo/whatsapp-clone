// Format timestamp for chat list (e.g., "2:30 PM", "Yesterday", "12/25/24")
export const formatChatTimestamp = (date: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );

    if (messageDate.getTime() === today.getTime()) {
        return formatTime(date);
    } else if (messageDate.getTime() === yesterday.getTime()) {
        return "Yesterday";
    } else if (
        now.getTime() - messageDate.getTime() <
        7 * 24 * 60 * 60 * 1000
    ) {
        return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
        return date.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "2-digit",
        });
    }
};

// Format time (e.g., "2:30 PM")
export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

// Format message timestamp (e.g., "2:30 PM")
export const formatMessageTimestamp = (date: Date): string => {
    return formatTime(date);
};

// Format last seen (e.g., "last seen today at 2:30 PM", "last seen yesterday at 3:45 PM")
export const formatLastSeen = (date: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastSeenDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );

    if (lastSeenDate.getTime() === today.getTime()) {
        return `last seen today at ${formatTime(date)}`;
    } else if (lastSeenDate.getTime() === yesterday.getTime()) {
        return `last seen yesterday at ${formatTime(date)}`;
    } else {
        return `last seen ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at ${formatTime(date)}`;
    }
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

// Generate a random ID
export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Common emojis for emoji picker
export const COMMON_EMOJIS = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🥸",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "👇",
    "☝️",
    "✋",
    "🤚",
    "🖐️",
    "🖖",
    "👋",
    "🤝",
    "💪",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❤️‍🔥",
    "❤️‍🩹",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "🎉",
    "🎊",
    "🎈",
    "🎁",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "⚽",
    "🏀",
];
