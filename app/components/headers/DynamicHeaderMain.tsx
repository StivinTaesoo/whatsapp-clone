import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { HeaderConfig } from "@/app/types/headerTypes";
import { TabType } from "../MainContent";

interface DynamicHeaderProps {
    config: HeaderConfig;
    activeTab: TabType;
}

const DynamicHeaderMain: React.FC<DynamicHeaderProps> = ({
    config,
    activeTab,
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    const handleMenuItemClick = (onClick: () => void) => {
        onClick();
        setShowMenu(false);
    };

    return (
        <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
            {/* Title */}
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {config.title}
            </h1>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {/* Dynamic Action Buttons */}
                {config.actions?.map((action, index) => {
                    const Icon = action.icon;
                    const showOnMobile = action.showOnMobile ?? true;
                    const showOnDesktop = action.showOnDesktop ?? true;

                    return (
                        <button
                            key={index}
                            onClick={action.onClick}
                            className={`${
                                !showOnMobile ? "hidden md:flex" : ""
                            } ${!showOnDesktop ? "md:hidden" : ""} ${
                                showOnMobile && showOnDesktop ? "flex" : ""
                            } p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                            title={action.label}
                        >
                            <Icon
                                size={24}
                                className="text-gray-700 dark:text-gray-300"
                            />
                        </button>
                    );
                })}

                {/* Menu Button (only if menu items exist) */}
                {config.menuItems && config.menuItems.length > 0 && (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title="More options"
                        >
                            <MoreVertical
                                size={24}
                                className="text-gray-700 dark:text-gray-300"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                                {config.menuItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <button
                                            onClick={() =>
                                                handleMenuItemClick(
                                                    item.onClick,
                                                )
                                            }
                                            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors text-sm"
                                        >
                                            {item.label}
                                        </button>
                                        {item.divider && (
                                            <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default DynamicHeaderMain;
