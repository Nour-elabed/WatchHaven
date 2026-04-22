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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-5 py-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="rounded px-2 py-1 text-sm hover:bg-gray-100" type="button">
                        Close
                    </button>
                </div>
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
};

export default AdminModal;
