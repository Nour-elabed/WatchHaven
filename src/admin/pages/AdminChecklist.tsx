import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { adminGetOrders, adminGetProducts, adminGetUsers } from "@/services/adminService";

type CheckStatus = "idle" | "running" | "passed" | "failed";

interface CheckItem {
    id: string;
    label: string;
    status: CheckStatus;
    details: string;
}

const initialChecks: CheckItem[] = [
    { id: "token", label: "JWT token exists", status: "idle", details: "Not tested yet" },
    { id: "role", label: "Logged-in user has ADMIN role", status: "idle", details: "Not tested yet" },
    { id: "products", label: "GET /admin/products", status: "idle", details: "Not tested yet" },
    { id: "users", label: "GET /admin/users", status: "idle", details: "Not tested yet" },
    { id: "orders", label: "GET /admin/orders", status: "idle", details: "Not tested yet" },
];

const statusClass: Record<CheckStatus, string> = {
    idle: "bg-gray-100 text-gray-700",
    running: "bg-yellow-100 text-yellow-700",
    passed: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
};

const AdminChecklist = () => {
    const { user } = useAuth();
    const [checks, setChecks] = useState<CheckItem[]>(initialChecks);
    const [isRunning, setIsRunning] = useState(false);

    const updateCheck = (id: string, patch: Partial<CheckItem>) => {
        setChecks((prev) => prev.map((check) => (check.id === id ? { ...check, ...patch } : check)));
    };

    const runChecks = async () => {
        setIsRunning(true);
        setChecks((prev) => prev.map((check) => ({ ...check, status: "running", details: "Running..." })));

        const token = localStorage.getItem("token");
        if (token) {
            updateCheck("token", { status: "passed", details: "Token found in localStorage." });
        } else {
            updateCheck("token", { status: "failed", details: "No token found. Login is required." });
        }

        if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
            updateCheck("role", { status: "passed", details: `Current user role: ${user.role}` });
        } else {
            updateCheck("role", { status: "failed", details: `Current user role: ${user?.role ?? "unknown"}` });
        }

        try {
            const response = await adminGetProducts();
            updateCheck("products", { status: "passed", details: `Fetched ${response.data.data.length} products.` });
        } catch (error) {
            updateCheck("products", { status: "failed", details: "Failed to fetch admin products endpoint." });
        }

        if (user?.role === "SUPER_ADMIN") {
            try {
                const response = await adminGetUsers();
                updateCheck("users", { status: "passed", details: `Fetched ${response.data.data.length} users.` });
            } catch (error) {
                updateCheck("users", { status: "failed", details: "Failed to fetch admin users endpoint." });
            }
        } else {
            updateCheck("users", {
                status: "passed",
                details: "Skipped: only SUPER_ADMIN can access /admin/users.",
            });
        }

        try {
            const response = await adminGetOrders();
            updateCheck("orders", { status: "passed", details: `Fetched ${response.data.data.length} orders.` });
        } catch (error) {
            updateCheck("orders", { status: "failed", details: "Failed to fetch admin orders endpoint." });
        }

        setIsRunning(false);
    };

    const passedCount = checks.filter((check) => check.status === "passed").length;

    return (
        <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Admin Integration Checklist</h1>
                    <p className="text-sm text-gray-500">Run one-click checks to validate auth, role, and admin endpoints.</p>
                </div>
                <button
                    type="button"
                    onClick={runChecks}
                    disabled={isRunning}
                    className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-60"
                >
                    {isRunning ? "Running checks..." : "Run checks"}
                </button>
            </div>

            <div className="rounded-lg border p-4">
                <p className="text-sm">
                    Passed <span className="font-semibold">{passedCount}</span> / {checks.length}
                </p>
            </div>

            <div className="space-y-3">
                {checks.map((check) => (
                    <article key={check.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between gap-3">
                            <h2 className="text-sm font-semibold">{check.label}</h2>
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass[check.status]}`}>
                                {check.status.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">{check.details}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default AdminChecklist;
