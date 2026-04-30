import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import api from "@/services/api"

interface SetupResponse {
    success: boolean
    message: string
    data?: {
        id: string
        username: string
        email: string
        role: string
        token: string
    }
}

interface ApiError {
    response?: { status?: number; data?: { message?: string } }
    message?: string
}

const Setup = () => {
    const [setupSecret, setSetupSecret] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [createdEmail, setCreatedEmail] = useState<string | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setErrorMessage(null)

        if (!setupSecret || !username || !email || !password) {
            setErrorMessage("All fields are required.")
            return
        }
        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters.")
            return
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.")
            return
        }

        setSubmitting(true)
        try {
            const { data } = await api.post<SetupResponse>("/setup/superadmin", {
                setupSecret,
                username: username.trim(),
                email: email.trim().toLowerCase(),
                password,
            })

            if (data.success && data.data) {
                setCreatedEmail(data.data.email)
            } else {
                setErrorMessage(data.message || "Unexpected response from server.")
            }
        } catch (err) {
            const e = err as ApiError
            const status = e.response?.status
            const serverMsg = e.response?.data?.message

            if (status === 403) {
                setErrorMessage(
                    "Setup already complete. A Super Admin already exists. Go to /login."
                )
            } else if (status === 401) {
                setErrorMessage(
                    "Wrong setup secret. Check your SETUP_SECRET environment variable."
                )
            } else if (status === 400) {
                setErrorMessage(serverMsg || "Validation error.")
            } else if (status === 429) {
                setErrorMessage("Too many setup attempts. Try again later.")
            } else if (status === 503) {
                setErrorMessage(
                    "Setup is not configured on this server. Set SETUP_SECRET in the backend environment."
                )
            } else {
                setErrorMessage(serverMsg || e.message || "Network error.")
            }
        } finally {
            setSubmitting(false)
        }
    }

    if (createdEmail) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-background">
                <div className="premium-card p-10 w-full max-w-md border border-border shadow-2xl space-y-4">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Super Admin created successfully.
                    </h1>
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900 space-y-2">
                        <p>
                            <strong>Email:</strong> {createdEmail}
                        </p>
                        <p>
                            You can now login at{" "}
                            <Link to="/login" className="underline font-medium">
                                /login
                            </Link>
                            .
                        </p>
                    </div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                        <p className="font-bold uppercase tracking-wider mb-1">Next step</p>
                        <p>
                            <strong>DELETE the SETUP_SECRET</strong> from your environment
                            variables now (both <code>.env</code> locally and your hosting
                            dashboard).
                        </p>
                        <p className="mt-2">
                            This endpoint is already permanently disabled at the database
                            level &mdash; removing the env var adds a second layer of
                            protection.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
            <form
                onSubmit={handleSubmit}
                className="premium-card p-10 w-full max-w-md border border-border shadow-2xl space-y-5"
            >
                <header className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                        First-Time Setup &mdash; Create Super Admin
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        This page works only once. After a SUPER_ADMIN exists, it is
                        permanently disabled.
                    </p>
                </header>

                <div className="space-y-1">
                    <label htmlFor="setupSecret" className="text-sm font-medium">
                        Setup Secret
                    </label>
                    <input
                        id="setupSecret"
                        type="password"
                        autoComplete="off"
                        required
                        value={setupSecret}
                        onChange={(e) => setSetupSecret(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="username" className="text-sm font-medium">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="password" className="text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                    <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
                </div>

                <div className="space-y-1">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>

                {errorMessage && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {errorMessage}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {submitting ? "Creating..." : "Create Super Admin"}
                </button>
            </form>
        </div>
    )
}

export default Setup
