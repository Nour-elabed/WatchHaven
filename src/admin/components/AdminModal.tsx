import type { ReactNode } from "react";

interface AdminModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const AdminModal = ({ title, isOpen, onClose, children }: AdminModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 p-4">
            <div className="w-full max-w-xl rounded-xl bg-white dark:bg-card shadow-xl dark:shadow-gray-900/20">
                <div className="flex items-center justify-between border-b dark:border-gray-800 px-5 py-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                    <button onClick={onClose} className="rounded px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors" type="button">
                        Close
                    </button>
                </div>
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
};

export default AdminModal;
