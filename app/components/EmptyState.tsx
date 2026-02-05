"use client";

import React from "react";

const EmptyState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900 text-center p-8">
            <div className="mb-8 relative">
                <div className="w-64 h-64 bg-gradient-to-br from-whatsapp/20 to-whatsapp-dark/20 dark:from-whatsapp/10 dark:to-whatsapp-dark/10 rounded-full flex items-center justify-center">
                    <svg
                        className="w-32 h-32 text-whatsapp-dark dark:text-whatsapp"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                WhatsApp Clone
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
                Send and receive messages without keeping your phone online. Use
                WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-whatsapp/10 dark:bg-whatsapp/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                            className="w-5 h-5 text-whatsapp"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="text-left">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            End-to-end encrypted
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Your personal messages and calls are secured with
                            end-to-end encryption.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-whatsapp/10 dark:bg-whatsapp/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                            className="w-5 h-5 text-whatsapp"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="text-left">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            Local Storage
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            All your data is stored locally in your browser. No
                            server needed!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
